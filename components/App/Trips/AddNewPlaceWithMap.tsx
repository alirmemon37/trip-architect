"use client";

import React, { useEffect, useState } from "react";
import TripPageHeader from "./TripPageHeader";
import TripBoard from "./TripBoard";
import { useMapStore } from "@/store/MapStore";
import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
import { countryNameFromCode } from "@/utils/countryNameFromCode";
import AddNewPlaceMap from "./AddNewPlaceMap";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";

const AddNewPlaceWithMap = () => {
  const [setPickedPlace, isMobileMapOpen] =
    useAddNewPlaceWithMapStore((state) => [
      state.setPickedPlace,
      state.isMobileMapOpen,
    ]);

  const [
    map,
    geocodingControl,
    setGeocodingControl,
    navigationControl,
    setNavigationControl,
  ] = useMapStore((state) => [
    state.map,
    state.geocodingControl,
    state.setGeocodingControl,
    state.navigationControl,
    state.setNavigationControl,
  ]);

  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;

  useEffect(() => {
    if (!map) return;

    // map geocoding control
    if (!geocodingControl) {
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
      map.addControl(gc);
      setGeocodingControl(gc);
    }

    // map navigation control
    if (!navigationControl) {
      const navControl = new maplibregl.NavigationControl();
      map.addControl(navControl, "bottom-right");
      setNavigationControl(navControl);
    }

    // add event listener for when user clicks a place from the search results
    geocodingControl?.addEventListener("pick", handlePickEvent);

    // Return a cleanup function to remove the event listener
    return () => {
      geocodingControl?.removeEventListener("pick", handlePickEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map, geocodingControl, navigationControl]);

  // pick event handler (when user clicks a place from the search results)
  const handlePickEvent = (event: Event) => {
    // @ts-ignore
    const eventDetails = event.detail;
    if (!eventDetails) return;

    console.log(eventDetails);

    const placeName = eventDetails.place_name;
    const countryCode = eventDetails.properties.country_code;
    if (eventDetails.geometry.type === "Point") {
      // if the event is a point, use the coordinates from the event
      const [longitude, latitude] = eventDetails.geometry.coordinates;
      setPickedPlace({
        name: placeName,
        lng: longitude as number,
        lat: latitude as number,
        countryName: countryNameFromCode[countryCode.toUpperCase()],
      });
    } else {
      // if the event is a polygon, use the center coordinates from the event
      const [longitude, latitude] = eventDetails.center;
      setPickedPlace({
        name: placeName,
        lng: longitude as number,
        lat: latitude as number,
        countryName: countryNameFromCode[countryCode.toUpperCase()],
      });
    }
  };

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
