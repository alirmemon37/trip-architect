"use client"

import React, { useEffect } from "react";
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
import { usePathname, useRouter } from "next/navigation";

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

const AppSidebarItems = () => {

  const [view, setView] = useAppViewStore((state) => [
    state.view,
    state.setView,
  ]);

  const pathname = usePathname();
  const router = useRouter();

  // function to set view of app
  const setViewOfApp = (view: AppView) => {
    setView(view);
    if (pathname !== "/app") {
      router.push("/app");
    }
  };

  useEffect(() => {
    if (pathname.includes("trip")) {
      setView("trips")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  return (
    <>
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
            if (pathname !== "/app") {
              router.push("/app");
            }
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
            if (pathname !== "/app") {
              router.push("/app");
            }
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
          onClick={() => setViewOfApp("trips")}
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
          onClick={() => setViewOfApp("profile")}
        />
    </>
  );
}
 
const AppSidebar = () => {
  return (
    <>
      <aside
        className={`hidden md:flex flex-col h-[calc(100vh-76px)] fixed top-[76px] bottom-0 left-0 p-1 w-[72px] shadow-lg z-40`}
      >
        <AppSidebarItems />
      </aside>

      <aside className="fixed left-0 right-0 bottom-0 w-full flex md:hidden flex-row justify-evenly items-center shadow-xl border-t-2 border-gray-100 z-40 bg-white">
        <AppSidebarItems />
      </aside>
    </>
  );
};

export default AppSidebar;
