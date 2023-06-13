"use client";

import React, { useEffect, useState } from "react";
import { useTripStore } from "@/store/TripStore";
import CreateTrip from "../Trips/CreateTrip";
import Trip from "../Trips/Trip";
import Map from "./Map";
import getValidDates from "@/utils/getValidDates";
import { useUserStore } from "@/store/UserStore";
import maplibregl from "maplibre-gl";
import { useMapStore } from "@/store/MapStore";

const MapPage = () => {
  const userId = useUserStore((state) => state.user?.$id);
  const [trips, tripsLoading, getTrips] = useTripStore((state) => [
    state.trips,
    state.tripsLoading,
    state.getTrips,
  ]);
  const map = useMapStore((state) => state.map);

  const [markers, setMarkers] = useState<maplibregl.Marker[]>([]);

  useEffect(() => {
    const fetchTrips = async () => {
      await getTrips(userId!);
    };

    fetchTrips();
  }, [getTrips, userId]);

  const handleTripClick = (trip: Trip) => {
    if (!trip) return;

    // remove existing markers
    markers.forEach((marker) => {
      marker.remove();
    });
    setMarkers([]);

    // get valid dates
    const validDates = getValidDates(trip.startDate, trip?.endDate);

    // create trip columns
    const tripColumns: TripBoardColumn[] = trip?.places?.map(
      (column: any, index: number) => {
        return {
          heading: validDates[index],
          cards: JSON.parse(column).cards,
        };
      }
    );

    // create markers
    const newMarkers2D = tripColumns.map((column) => {
      return column.cards.map((card) => {
        const marker = createMarker(column, card);
        return marker;
      });
    });

    // convert new markers from Markers[][] to Markers[]
    const newMarkers = newMarkers2D.reduce(
      (acc: maplibregl.Marker[], curr: maplibregl.Marker[]) => {
        return [...acc, ...curr];
      },
      []
    );

    if (newMarkers.length === 0) {
      alert("No places added to this trip yet!");
    }

    setMarkers(newMarkers);
  };

  const createMarker = (column: TripBoardColumn, card: TripBoardCard) => {
    const popupContent = document.createElement("div");
    popupContent.innerHTML = `
          <div class="flex flex-col gap-2">
            <div class="flex gap-1 items-center px-2 py-0.5 lg:px-4 md:py-1 bg-blue-500 rounded-xl text-white">
              <h1 class="text-lg font-bold">${column.heading}</h1>
            </div>
            <p class="text-sm md:text-base font-bold">${card.name}</p>
          </div>
        `;

    // create the popup
    const popup = new maplibregl.Popup({ offset: 25 }).setDOMContent(
      popupContent
    );

    const marker = new maplibregl.Marker({
      color: "#3B82F6",
      draggable: false,
    })
      .setLngLat([card.lng!, card.lat!])
      .setPopup(popup)
      .addTo(map!);

    return marker;
  };

  return (
    <div className="relative overflow-hidden">
      <div className="grid grid-cols-3">
        <div className="flex flex-col gap-4 w-full h-[calc(100vh-76px)] overflow-scroll shadow-lg z-10">
          <h1 className="text-4xl font-extrabold mb-4 px-4 pt-6">Your Trips</h1>
          <div className="px-4 py-2">
            {!tripsLoading && trips.length === 0 ? (
              <CreateTrip />
            ) : (
              <div className="flex flex-col gap-4">
                {trips.map((trip) => (
                  <Trip
                    key={trip.$id}
                    trip={trip}
                    onTripClick={() => handleTripClick(trip)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="relative col-span-2">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default MapPage;
