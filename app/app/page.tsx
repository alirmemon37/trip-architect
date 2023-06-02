"use client"

import Map from "@/components/App/Map/Map";
import { useAppViewStore } from "@/store/AppViewStore";
import React from "react";

const App = () => {
  const view = useAppViewStore((state) => state.view);

  return (
    <div className="py-6 px-10">
      {view === "home" ? (
        <h1 className="text-5xl md:text-7xl font-extrabold">Trip Architect</h1>
      ) : view === "map" ? (
        <Map />
      ) : view === "places" ? (
        <h1 className="text-5xl md:text-7xl font-extrabold">Places</h1>
      ) : view === "profile" ? (
        <h1 className="text-5xl md:text-7xl font-extrabold">Profile</h1>
      ) : null}
    </div>
  );
};

export default App;
