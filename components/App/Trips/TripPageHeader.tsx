"use client";

import getUrl from "@/lib/getUrl";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { useTripStore } from "@/store/TripStore";
import { useUserStore } from "@/store/UserStore";
import {
  CalendarIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const TripPageHeader = () => {
  const [trip, tripBoardColumns] = useTripStore((state) => [
    state.trip,
    state.tripBoardColumns,
  ]);
  const user = useUserStore((state) => state.user);
  const isAddNewPlaceWithMapOpen = useAddNewPlaceWithMapStore(
    (state) => state.isAddNewPlaceWithMapOpen
  );

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchImage = async () => {
      setImageLoading(true);
      if (trip?.image) {
        const url = await getUrl(JSON.parse(trip.image));
        if (url) {
          setImageUrl(url.toString());
        }
      }
      setImageLoading(false);
    };

    fetchImage();
  }, [trip?.image]);

  return (
    <>
      {trip && (
        <div className="flex flex-col">
          <div className="relative w-full h-[150px] md:h-[250px]">
            {!imageLoading && imageUrl ? (
              <Image
                src={imageUrl}
                fill={true}
                alt={trip.name || "Trip image"}
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 animate-pulse">
                <PhotoIcon className="w-10 h-10 text-gray-400" />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2 py-2 md:px-6 md:py-4">
            <div
              className={clsx(
                "flex flex-col items-start justify-between gap-2",
                !isAddNewPlaceWithMapOpen &&
                  "lg:flex-row lg:items-center lg:gap-0"
              )}
            >
              <h1
                className={clsx(
                  "text-4xl font-extrabold mb-2",
                  !isAddNewPlaceWithMapOpen && "md:text-6xl lg:text-7xl"
                )}
              >
                {trip.name}
              </h1>

              <div className="flex flex-row text-white font-medium items-center text-sm lg:text-base">
                <div className="flex gap-1 items-center px-2 py-0.5 lg:px-4 md:py-1 bg-blue-500 rounded-xl">
                  <CalendarIcon className="w-4 h-4" />
                  {trip.startDate.toISOString().split("T")[0]}
                </div>
                <div className="h-[2px] w-[8px] bg-gray-400" />
                <div className="flex gap-1 items-center px-1.5 py-0 md:px-2.5 lg:px-4 md:py-1 bg-blue-500 rounded-xl">
                  <CalendarIcon className="w-4 h-4" />
                  {trip.endDate.toISOString().split("T")[0]}
                </div>
              </div>
            </div>

            <div
              className={clsx(
                "flex flex-col justify-between items-start",
                !isAddNewPlaceWithMapOpen && "md:flex-row md:items-center"
              )}
            >
              <div className="text-lg md:text-xl mb-2">
                <span className="font-light">By </span>
                <span className="font-medium">{user?.name}</span>
              </div>
              <div className="flex gap-1 items-center px-3 py-1 bg-blue-500 rounded-xl text-white">
                <MapPinIcon className="w-4 h-4" />
                <span className="text-sm md:text-base font-medium">
                  {tripBoardColumns.reduce(
                    (total, column) => total + column.cards.length,
                    0
                  )}{" "}
                  places
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TripPageHeader;
