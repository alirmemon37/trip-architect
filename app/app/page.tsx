"use client";

import MapPage from "@/components/App/Map/MapPage";
import Profile from "@/components/App/Profile/Profile";
import TripsPage from "@/components/App/Trips/TripsPage";
import { useAppViewStore } from "@/store/AppViewStore";
import React from "react";

const App = () => {
  const view = useAppViewStore((state) => state.view);

  return (
    <>
      {view === "home" ? (
        <h1 className="text-5xl md:text-7xl font-extrabold">Trip Architect</h1>
      ) : view === "map" ? (
        <MapPage />
      ) : view === "trips" ? (
        <TripsPage />
      ) : view === "profile" ? (
        <Profile />
      ) : null}
    </>
  );
};

export default App;
