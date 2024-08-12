"use client";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useState } from "react";
import Papa from "papaparse";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Upload, Download, Loader2 } from "lucide-react";

export default function CSVUpload() {

  const {user} = useUser();
  const [file, setFile] = useState(null);
  const [publicUrl, setPublicUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sampleCount, setSampleCount] = useState(1000);
  const { uploadToCloudinary, deleteFromCloudinary, isUploading, uploadError } = useCloudinaryUpload();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSampleCountChange = (e) => {
    setSampleCount(parseInt(e.target.value));
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setError("");

    try {
      // Upload file to Cloudinary
      const uploadData = await uploadToCloudinary(file);
      console.log("1st Upload Done", uploadData);

      // Make POST request to generate data
      const generateResponse = await fetch(
        "https://suryanshbachchan.us-east-1.modelbit.com/v1/generateData/latest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ data: [uploadData.secure_url, sampleCount] }),
          // body: JSON.stringify({ data: uploadData.secure_url}),
        }
      );

      if (!generateResponse.ok) {
        throw new Error("Data generation failed");
      }

      const generatedData = await generateResponse.json();
      console.log("Got the synthetic data");

      // Delete the old csv from cloudinary
      await deleteFromCloudinary(uploadData.public_id);
      console.log("Deleted the old file");

      // Convert json data back to csv
      const csv = Papa.unparse(generatedData);
      console.log("Converted Json to Csv");

      // Upload the new file to cloudinary
      const blob = new Blob([csv], { type: "text/csv" });
      const newFile = new File([blob], "generated_data.csv", { type: "text/csv" });
      const newUploadData = await uploadToCloudinary(newFile);
      setPublicUrl(newUploadData.secure_url);

      console.log("2nd upload done");


       // Add the new URL to the user's cloudinaryUrls array
      if (user) {
        const response = await fetch('/api/user/addcloudinaryurl', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cloudinaryUrl: newUploadData.secure_url }),
        });

        if (!response.ok) {
          throw new Error('Failed to add Cloudinary URL to user profile');
        }

        console.log('Cloudinary URL added to user profile');
      }

    } catch (error) {
      console.error("Error:", error);
      setError(error.message || uploadError || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="min-h-[90vh] bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Sparkles className="h-10 w-6 text-blue-500" />
              Generate Synthetic Data
            </span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto mt-8 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Upload CSV and Generate Synthetic Data</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="csv-file">Upload CSV File</Label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={isLoading || isUploading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sample-count">Number of Samples</Label>
                <Input
                  id="sample-count"
                  type="number"
                  value={sampleCount}
                  onChange={handleSampleCountChange}
                  min="1"
                  placeholder="Enter number of samples"
                />
              </div>

              <Button
                onClick={handleUpload}
                disabled={!file || isLoading || isUploading}
                className="flex-1"
              >
                {isLoading || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload and Generate
                  </>
                )}
              </Button>

              {publicUrl && (
                <Button asChild className="flex-1 m-4">
                  <Link href={publicUrl} download="generated_data.csv">
                    <Download className="mr-2 h-4 w-4" />
                    Download Result
                  </Link>
                </Button>
              )}

              {(error || uploadError) && (
                <div className="text-red-500 text-sm mt-2">{error || uploadError}</div>
              )}
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}