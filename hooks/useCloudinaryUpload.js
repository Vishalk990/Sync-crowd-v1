import { useState } from 'react';
import { useAuth } from '@clerk/nextjs';

export function useCloudinaryUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { isLoaded, isSignedIn, getToken } = useAuth();

  const uploadToCloudinary = async (file) => {
    if (!isLoaded || !isSignedIn) {
      setUploadError('User not authenticated');
      throw new Error('User not authenticated');
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/cloudinary/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    if (!isLoaded || !isSignedIn) {
      setUploadError('User not authenticated');
      throw new Error('User not authenticated');
    }

    try {
      const token = await getToken();
      const deleteResponse = await fetch("/api/cloudinary/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    isAuthenticated: isLoaded && isSignedIn,
  };
}