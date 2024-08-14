"use client"

import WordPullUp from "@/components/magicui/word-pull-up";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import GlobalLoader from "@/components/GlobalLoader";
import { Download } from "lucide-react";

const PageContent = () => {
  const { user } = useUser();
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = user ? user.firstName || user.username : "Guest";

  useEffect(() => {
    if (user) {
      fetchCloudinaryUrls();
    }
  }, [user]);

  const fetchCloudinaryUrls = async () => {
    try {
      const response = await fetch('/api/user/cloudinaryUrl', {
        headers: {
          'x-clerk-user-id': user.id
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch cloudinary URLs');
      }

      const data = await response.json();
      console.log(data); // Debugging line to check the response
      setDatasets(data.datasets || []);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <WordPullUp
        className="flex m-3 p-3 text-3xl font-semibold tracking-[-0.02em] text-black dark:text-white md:leading-[5rem]"
        words={`🎉 Welcome, ${username}`}
      />
      <div className="m-3 p-3">
        <h2 className="text-2xl font-semibold m-3 p-3">History</h2>
        {loading ? (
          <GlobalLoader/>
        ) : error ? (
          <p>Error: {error}</p>
        ) : datasets.length > 0 ? (
          <Table className="m-3 w-[90%]">
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Download</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {datasets.map((dataset, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{dataset.filename || `Dataset ${index + 1}`}</TableCell>
                  <TableCell>{new Date(dataset.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => window.open(dataset.cloudinaryUrl, '_blank')}
                      variant="outline"
                      size="sm"
                    >
                      <Download/>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="m-3 p-3">No datasets generated.</p>
        )}
      </div>
    </>
  );
};

const page = () => {
  return (
    <>
      <PageContent/>
    </>
  );
};

export default page;
