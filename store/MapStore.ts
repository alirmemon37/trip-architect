import { create } from "zustand";
import maplibregl from "maplibre-gl";
import { GeocodingControl } from "@maptiler/geocoding-control/maplibregl";

interface MapStore {
  map: maplibregl.Map | null;
  setMap: (map: maplibregl.Map) => void;

  geocodingControl: GeocodingControl | null;
  setGeocodingControl: (geocodingControl: GeocodingControl | null) => void;

  navigationControl: maplibregl.NavigationControl | null;
  setNavigationControl: (
    navigationControl: maplibregl.NavigationControl | null
  ) => void;

  mapMarker: maplibregl.Marker | null;
  setMapMarker: (mapMarker: maplibregl.Marker) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map: maplibregl.Map) => set({ map }),

  geocodingControl: null,
  setGeocodingControl: (geocodingControl: GeocodingControl | null) =>
    set({ geocodingControl }),

  navigationControl: null,
  setNavigationControl: (navigationControl: maplibregl.NavigationControl | null) =>
    set({ navigationControl }),

  mapMarker: null,
  setMapMarker: (mapMarker: maplibregl.Marker) => set({ mapMarker }),
}));
