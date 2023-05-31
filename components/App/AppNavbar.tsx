"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useUserStore } from "@/store/UserStore";
import Avvvatars from "avvvatars-react";

const AppNavbar = () => {
  const user = useUserStore((state) => state.user);

  return (
    <nav className="w-full flex flex-row items-center px-4 py-4 gap-4 fixed top-0 left-0 right-0 z-50 bg-gray-100">
      <div className="hidden md:flex">
        <span className="text-xl font-bold tracking-tighter">
          🛠️ TripArchitect
        </span>
      </div>
      <div className="flex items-center flex-1 space-x-5 justify-end w-full">
        <form className="flex items-center space-x-5 bg-white p-2 flex-1 md:flex-initial border-2 border-gray-300 rounded-full ">
          <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
          <input
            type="text"
            placeholder="Where to?"
            className="outline-none flex-1"
          />
          <button type="submit" hidden>
            Search
          </button>
        </form>
        <Avvvatars
          value={user?.name || ""}
          style="character"
          size={38}
          shadow={true}
          border={true}
          borderSize={2}
          borderColor="#fff"
        />
      </div>
    </nav>
  );
};

export default AppNavbar;
