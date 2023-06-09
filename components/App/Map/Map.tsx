import React, { useRef, useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import "@maptiler/geocoding-control/style.css";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useMapStore } from "@/store/MapStore";

export default function Map() {
  const apiKey = process.env.NEXT_PUBLIC_MAPTILER_API_KEY!;
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const setMap = useMapStore((state) => state.setMap);

  useEffect(() => {
    if (!mapContainerRef.current) {
      return;
    }

    const map = new maplibregl.Map({
      style: "https://api.maptiler.com/maps/streets/style.json?key=" + apiKey,
      container: mapContainerRef.current,
    });

    setMap(map);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainerRef} className="w-full h-[calc(100vh-76px)]" />
    </div>
  );
}
