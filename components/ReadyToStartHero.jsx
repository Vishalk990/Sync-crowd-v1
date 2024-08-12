import React from "react";
import { Button } from "@/components/ui/button";

const ReadyToStartHero = () => {
  return (
    <div className="w-full py-20 bg-gradient-to-bl from-cyan-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-4">
      <div className="relative mb-8">
        <div className="w-28 h-28 bg-gradient-to-br from-yellow-300 to-green-300 rounded-2xl flex items-center justify-center text-4xl font-bold text-gray-700 shadow-lg">
          M
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-purple-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 2a1 1 0 011-1h8a1 1 0 011 1v10a1 1 0 01-1 1H6a1 1 0 01-1-1V2zm2 0v10h6V2H7z"
              clipRule="evenodd"
            />
            <path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-2a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
          </svg>
        </div>
      </div>

      <h2 className="text-6xl font-bold text-white mb-4 text-center">Ready to start?</h2>
      <p className="text-white text-center mb-8 font-semibold">
        Sign up for free or contact our team to schedule a demo.
      </p>

      <div className="flex space-x-4">
        <Button className="bg-gradient-to-r from-green-400 to-yellow-300 text-gray-800 font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity">
          Get started free
        </Button>
        <Button
          variant="outline"
          className="bg-white text-gray-800 font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-opacity"
        >
          Request a demo
        </Button>
      </div>
    </div>
  );
};

export default ReadyToStartHero;
