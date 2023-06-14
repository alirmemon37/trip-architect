"use client";

import React from "react";
import TripPageHeader from "./TripPageHeader";
import TripBoard from "./TripBoard";
import AddNewPlaceMap from "./AddNewPlaceMap";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";

const AddNewPlaceWithMap = () => {
  const isMobileMapOpen = useAddNewPlaceWithMapStore(
    (state) => state.isMobileMapOpen
  );

  return (
    <>
      <div className="flex md:grid grid-cols-3">
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-76px)] overflow-scroll shadow-lg z-10">
          <TripPageHeader />
          <TripBoard />
        </div>
        <div
          className={`md:relative md:col-span-2 ${
            isMobileMapOpen ? "flex md:hiden" : "hidden md:flex"
          }`}
        >
          <AddNewPlaceMap />
        </div>
      </div>
    </>
  );
};

export default AddNewPlaceWithMap;
