"use client"

import WordPullUp from "@/components/magicui/word-pull-up";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const PageContent = () => {
  const { user } = useUser();
  const [cloudinaryUrls, setCloudinaryUrls] = useState([]);
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
      setCloudinaryUrls(data.cloudinaryUrls);
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
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : cloudinaryUrls.length > 0 ? (
          <ul className="list-disc pl-5">
            {cloudinaryUrls.map((url, index) => (
              <li key={index} className="mb-2">
                <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {url}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="m-3 p-3">No datasets generated yet.</p>
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