"use client"

import WordPullUp from "@/components/magicui/word-pull-up";
import React from "react";
import { useUser } from "@clerk/nextjs";

const PageContent = () => {
  const { user } = useUser(); // Destructure the user object

  // Extract the username from the user object
  const username = user ? user.firstName || user.username : "Guest";

  return (
    <>
      <WordPullUp
        className="flex m-3 p-3 text-3xl font-semibold tracking-[-0.02em] text-black dark:text-white md:leading-[5rem]"
        words={`🎉 Welcome, ${username}`}
      />
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
