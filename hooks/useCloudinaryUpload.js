import { useState } from 'react';

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const uploadToCloudinary = async (file) => {
    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();
      if (!uploadData.success) {
        throw new Error(uploadData.message || "Upload failed");
      }

      return uploadData.result;
    } catch (error) {
      setUploadError(error.message);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFromCloudinary = async (publicId) => {
    try {
      const deleteResponse = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ public_id: publicId }),
      });

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete file");
      }
    } catch (error) {
      setUploadError(error.message);
      throw error;
    }
  };

  return {
    uploadToCloudinary,
    deleteFromCloudinary,
    isUploading,
    uploadError,
  };
}