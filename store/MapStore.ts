import { create } from 'zustand';
import maplibregl from 'maplibre-gl';
import { GeocodingControl } from '@maptiler/geocoding-control/maplibregl';

interface MapStore {
  map: maplibregl.Map | null;
  setMap: (map: maplibregl.Map) => void;

  geocodingControl: GeocodingControl | null;
  setGeocodingControl: (geocodingControl: GeocodingControl) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  map: null,
  setMap: (map: maplibregl.Map) => set({ map }),

  geocodingControl: null,
  setGeocodingControl: (geocodingControl: GeocodingControl) => set({ geocodingControl }),
}));