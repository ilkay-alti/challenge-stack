import Link from "next/link";
import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>HomePage</h1>
      <Link
        href={"/login"}
        className="rounded-xl w-32 h-12 bg-red-300 flex items-center justify-center"
      >
        Got to login
      </Link>
    </div>
  );
};

export default HomePage;
