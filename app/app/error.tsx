"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col text-center gap-8 mt-8">
      <h1 className="text-4xl md:text-5xl font-bold">{error.message}</h1>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button onClick={reset} className="px-6 py-2 bg-white text-black border-[2px] border-black rounded-full">
          Try again
        </button>
        <button onClick={() => router.push("/app")} className="px-6 py-2 bg-black text-white border-[2px] border-black rounded-full">
          Go Back Home
        </button>
      </div>
    </div>
  );
};

export default Error;
