"use client"

import Map from "@/components/App/Map/Map";
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
        <Map />
      ) : view === "trips" ? (
        <Trips />
      ) : view === "profile" ? (
        <h1 className="text-5xl md:text-7xl font-extrabold">Profile</h1>
      ) : null}
    </div>
  );
};

export default App;
