"use client";

import React, { useState } from "react";
import {
  MapIcon,
  GlobeAltIcon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  MapIcon as MapIconSolid,
  GlobeAltIcon as GlobeAltIconSolid,
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";

const AppSidebarItem = ({
  name,
  Icon,
  onClick,
}: {
  name: string;
  Icon: React.FC;
  onClick: () => void;
}) => {
  return (
    <div
      className="text-xs flex flex-col py-2 px-4 md:py-4 md:px-0 items-center hover:bg-gray-100 rounded-lg gap-1 cursor-pointer"
      onClick={onClick}
    >
      <Icon />
      {name}
    </div>
  );
};

const AppSidebar = () => {
  const [isActive, setIsActive] = useState<string>("home");

  return (
    <>
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-76px)] fixed top-[76px] bottom-0 left-0 p-1 w-[72px] shadow-lg`}
      >
        <AppSidebarItem
          name="Home"
          Icon={() =>
            isActive === "home" ? (
              <HomeIconSolid className="w-6 h-6" />
            ) : (
              <HomeIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("home")}
        />
        <AppSidebarItem
          name="Map"
          Icon={() =>
            isActive === "map" ? (
              <MapIconSolid className="w-6 h-6" />
            ) : (
              <MapIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("map")}
        />
        <AppSidebarItem
          name="Places"
          Icon={() =>
            isActive === "places" ? (
              <GlobeAltIconSolid className="w-6 h-6" />
            ) : (
              <GlobeAltIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("places")}
        />
        <AppSidebarItem
          name="Profile"
          Icon={() =>
            isActive === "profile" ? (
              <UserIconSolid className="w-6 h-6" />
            ) : (
              <UserIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("profile")}
        />
      </aside>

      <aside className="fixed bottom-0 w-full flex md:hidden flex-row justify-evenly items-center shadow-xl border-t-2 border-gray-100">
        <AppSidebarItem
          name="Home"
          Icon={() =>
            isActive === "home" ? (
              <HomeIconSolid className="w-6 h-6" />
            ) : (
              <HomeIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("home")}
        />
        <AppSidebarItem
          name="Map"
          Icon={() =>
            isActive === "map" ? (
              <MapIconSolid className="w-6 h-6" />
            ) : (
              <MapIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("map")}
        />
        <AppSidebarItem
          name="Places"
          Icon={() =>
            isActive === "places" ? (
              <GlobeAltIconSolid className="w-6 h-6" />
            ) : (
              <GlobeAltIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("places")}
        />
        <AppSidebarItem
          name="Profile"
          Icon={() =>
            isActive === "profile" ? (
              <UserIconSolid className="w-6 h-6" />
            ) : (
              <UserIcon className="w-6 h-6" />
            )
          }
          onClick={() => setIsActive("profile")}
        />
      </aside>
    </>
  );
};

export default AppSidebar;
