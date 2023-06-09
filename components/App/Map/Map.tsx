import React, { useRef, useEffect, useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
// import { GeocodingControl as GeocodingControlReact } from "@maptiler/geocoding-control/react";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";
// import { createMapLibreGlMapController } from "@maptiler/geocoding-control/maplibregl-controller";
// import type { MapController } from "@maptiler/geocoding-control/types";
import "@maptiler/geocoding-control/style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { countryNameFromCode } from "@/utils/countryNameFromCode";

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [pickedPlace, setPickedPlace] = useAddNewPlaceWithMapStore((state) => [
    state.pickedPlace,
    state.setPickedPlace,
  ]);

  // const [mapController, setMapController] = useState<MapController>();
  // console.log(mapController);

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
    if (!mapContainerRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      style: "https://api.maptiler.com/maps/streets/style.json?key=" + apiKey,
      container: mapContainerRef.current,
    });

    // setMapController(createMapLibreGlMapController(map, maplibregl));

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

    gc.addEventListener("pick", handlePickEvent);

    map.addControl(gc);

    // map controls
    map.addControl(new maplibregl.NavigationControl(), "bottom-right");

    // Return a cleanup function to remove the event listener
    return () => {
      gc.removeEventListener("pick", handlePickEvent);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* <GeocodingControlReact
        apiKey={apiKey!}
        minLength={3}
        fuzzyMatch={false}
        mapController={mapController}
        types={["place"]}
      /> */}
      <div ref={mapContainerRef} className="w-full h-[calc(100vh-76px)]" />
    </div>
  );
}
