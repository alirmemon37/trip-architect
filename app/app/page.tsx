"use client"

import MapPage from "@/components/App/Map/MapPage";
import Profile from "@/components/App/Profile/Profile";
import Trips from "@/components/App/Trips/Trips";
import { useAppViewStore } from "@/store/AppViewStore";
import React from "react";

const App = () => {
  const view = useAppViewStore((state) => state.view);

  return (
    <div className="p-4 md:py-6 md:px-10">
      {view === "home" ? (
        <h1 className="text-5xl md:text-7xl font-extrabold">Trip Architect</h1>
      ) : view === "map" ? (
        <MapPage />
      ) : view === "trips" ? (
        <Trips />
      ) : view === "profile" ? (
        <Profile />
      ) : null}
    </div>
  );
};

export default App;
