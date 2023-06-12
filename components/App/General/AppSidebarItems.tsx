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
import AppSidebarItem from "./AppSidebarItem";

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
      setView("trips");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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
};

export default AppSidebarItems;
