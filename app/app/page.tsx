"use client";

import HomePage from "@/components/App/Home/HomePage";
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
        <HomePage />
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
