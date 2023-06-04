"use client"

import React from "react";
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
import { useAppViewStore } from "@/store/AppViewStore";

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
  const [view, setView] = useAppViewStore((state) => [
    state.view,
    state.setView,
  ]);

  return (
    <>
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-76px)] fixed top-[76px] bottom-0 left-0 p-1 w-[72px] shadow-lg z-40`}
      >
        <AppSidebarItem
          name="Home"
          Icon={() =>
            view === "home" ? (
              <HomeIconSolid className="w-6 h-6" />
            ) : (
              <HomeIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("home");
          }}
        />
        <AppSidebarItem
          name="Map"
          Icon={() =>
            view === "map" ? (
              <MapIconSolid className="w-6 h-6" />
            ) : (
              <MapIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("map");
          }}
        />
        <AppSidebarItem
          name="Trips"
          Icon={() =>
            view === "trips" ? (
              <GlobeAltIconSolid className="w-6 h-6" />
            ) : (
              <GlobeAltIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("trips");
          }}
        />
        <AppSidebarItem
          name="Profile"
          Icon={() =>
            view === "profile" ? (
              <UserIconSolid className="w-6 h-6" />
            ) : (
              <UserIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("profile");
          }}
        />
      </aside>

      <aside className="fixed left-0 right-0 bottom-0 w-full flex md:hidden flex-row justify-evenly items-center shadow-xl border-t-2 border-gray-100 z-40 bg-white">
        <AppSidebarItem
          name="Home"
          Icon={() =>
            view === "home" ? (
              <HomeIconSolid className="w-6 h-6" />
            ) : (
              <HomeIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("home");
          }}
        />
        <AppSidebarItem
          name="Map"
          Icon={() =>
            view === "map" ? (
              <MapIconSolid className="w-6 h-6" />
            ) : (
              <MapIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("map");
          }}
        />
        <AppSidebarItem
          name="Trips"
          Icon={() =>
            view === "trips" ? (
              <GlobeAltIconSolid className="w-6 h-6" />
            ) : (
              <GlobeAltIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("trips");
          }}
        />
        <AppSidebarItem
          name="Profile"
          Icon={() =>
            view === "profile" ? (
              <UserIconSolid className="w-6 h-6" />
            ) : (
              <UserIcon className="w-6 h-6" />
            )
          }
          onClick={() => {
            setView("profile");
          }}
        />
      </aside>
    </>
  );
};

export default AppSidebar;