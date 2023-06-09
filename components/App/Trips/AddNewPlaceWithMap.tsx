"use client";

import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import TripPageHeader from "./TripPageHeader";
import TripBoard from "./TripBoard";
import Map from "../Map/Map";
import { useTripStore } from "@/store/TripStore";
import { useMapStore } from "@/store/MapStore";
import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import { countryNameFromCode } from "@/utils/countryNameFromCode";

const AddNewPlaceWithMap = () => {
  const [
    columnHeading,
    setIsAddNewPlaceWithMapOpen,
    pickedPlace,
    setPickedPlace,
  ] = useAddNewPlaceWithMapStore((state) => [
    state.columnHeading,
    state.setIsAddNewPlaceWithMapOpen,
    state.pickedPlace,
    state.setPickedPlace,
  ]);

  const [trip, tripBoardColumns, setTripBoardColumns, updateTrip] =
    useTripStore((state) => [
      state.trip,
      state.tripBoardColumns,
      state.setTripBoardColumns,
      state.updateTrip,
    ]);

  const handleAddPlace = async () => {
    if (!pickedPlace) return;

    // Find the index of the column in the tripBoardColumns array that matches the columnHeading (the column to add the place to)
    const colIndex = tripBoardColumns.findIndex(
      (column) => column.heading === columnHeading
    );

    // Create a new card object
    const card = {
      name: pickedPlace.name,
      lng: pickedPlace.lng,
      lat: pickedPlace.lat,
      countryName: pickedPlace.countryName,
    };

    // Create a new array of columns with the new card added to the correct column
    const updatedColumns = [...tripBoardColumns];
    updatedColumns[colIndex].cards.push(card);

    // Update the trip in DB
    updateTrip({
      ...trip!,
      places: updatedColumns.map((column) => {
        return JSON.stringify({ cards: column.cards });
      }),
    });

    // Update the state with the updated tripBoardColumns array
    // local state update
    setTripBoardColumns(updatedColumns);
    setPickedPlace(null);
    geocodingControl?.setQuery("");
  };

  const [map, geocodingControl, setGeocodingControl] = useMapStore((state) => [state.map, state.geocodingControl, state.setGeocodingControl]);
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;

  const handlePickEvent = (event: Event) => {
    // @ts-ignore
    const eventDetails = event.detail;
    console.log(eventDetails);

    if (!eventDetails) return;

    const placeName = eventDetails.place_name;
    const countryCode = eventDetails.properties.country_code;
    if (eventDetails.geometry.type === "Point") {
      const [longitude, latitude] = eventDetails.geometry.coordinates;
      setPickedPlace({
        name: placeName,
        lng: longitude as number,
        lat: latitude as number,
        countryName: countryNameFromCode[countryCode.toUpperCase()],
      });
    } else {
      const [longitude, latitude] = eventDetails.center;
      setPickedPlace({
        name: placeName,
        lng: longitude as number,
        lat: latitude as number,
        countryName: countryNameFromCode[countryCode.toUpperCase()],
      });
    }
  };

  useEffect(() => {
    if (!map) return;
    const gc = new GeocodingControl({
      apiKey,
      // @ts-ignore
      maplibregl,
      types: [
        "county",
        "municipality",
        "municipal_district",
        "locality",
        "neighbourhood",
        "place",
      ],
      minLength: 3,
      fuzzyMatch: true,
      limit: 5,
      autoComplete: false,
    });

    setGeocodingControl(gc);
    gc.addEventListener("pick", handlePickEvent);


    map.addControl(gc);

    // map controls
    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    // Return a cleanup function to remove the event listener
    return () => {
      gc.removeEventListener("pick", handlePickEvent);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <div className="grid grid-cols-3">
      <div className="flex flex-col gap-4 w-full h-[calc(100vh-76px)] overflow-scroll shadow-lg z-10">
        <TripPageHeader />
        <TripBoard />
      </div>
      <div className="relative col-span-2">
        <div className="z-40 absolute top-4 left-4 flex flex-col items-center lg:flex-row gap-2">
          <button
            onClick={() => {
              setIsAddNewPlaceWithMapOpen(false);
              setPickedPlace(null);
            }}
            className="p-1 rounded-full hover:bg-black/10"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          <div className="bg-white px-2 py-1">
            <h3 className="font-medium">
              Add a place in{" "}
              <span className="font-bold bg-red-400 p-1 rounded-md px-3 py-1 text-white">
                {columnHeading}
              </span>
            </h3>
          </div>
        </div>
        {pickedPlace && (
          <div className="z-40 absolute bottom-4 left-4">
            <button
              onClick={handleAddPlace}
              className="bg-blue-500 rounded-lg px-6 py-2.5 font-bold text-white"
            >
              Add place
            </button>
          </div>
        )}
        <Map />
      </div>
    </div>
  );
};

export default AddNewPlaceWithMap;
