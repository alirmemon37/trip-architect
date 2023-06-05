"use client";

import getUrl from "@/lib/getUrl";
import { useAppViewStore } from "@/store/AppViewStore";
import { useTripStore } from "@/store/TripStore";
import { useUserStore } from "@/store/UserStore";
import {
  ArrowLeftIcon,
  CalendarIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { eachDayOfInterval, format } from "date-fns";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface TripPageProps {
  params: {
    id: string;
  };
}

const TripPage: FC<TripPageProps> = ({ params }) => {
  const { id: tripId } = params;
  const [trip, tripLoading, getTripById] = useTripStore((state) => [
    state.trip,
    state.tripLoading,
    state.getTripById,
  ]);
  const setView = useAppViewStore((state) => state.setView);
  const user = useUserStore((state) => state.user);

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchTrip = async () => {
      await getTripById(tripId);
    };

    fetchTrip();
  }, [tripId, getTripById]);

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

  function getValidDates(startDate: Date, endDate: Date) {
    const validDates = eachDayOfInterval({ start: startDate, end: endDate });
    const formattedDates = validDates.map((date) => format(date, "dd-MM-yyyy"));
    return formattedDates;
  }

  return (
    <>
      {tripLoading ? (
        // Trip Loading
        <div className="col-span-full hidden md:flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      ) : trip ? (
        // Trip
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
          <div className="flex flex-col py-2 md:px-6 md:py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-2">
                {trip.name}
              </h1>

              <div className="flex flex-row text-white font-medium items-center text-sm md:text-base">
                <div className="flex gap-1 items-center px-1.5 py-0 md:px-2.5 lg:px-4 md:py-1 bg-blue-500 rounded-xl">
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

            <div>
              <div className="text-lg md:text-xl mb-2">
                <span className="font-light">By </span>
                <span className="font-medium">{user?.name}</span>
              </div>
            </div>

            {/* TODO: add Trip Board */}
          </div>
        </div>
      ) : (
        // Trip Not Found
        <div className="flex flex-col items-center justify-center mt-10 gap-8">
          <div className="text-5xl font-bold">Trip not found</div>
          <button
            onClick={() => {
              setView("trips");
              if (pathname !== "/app") {
                router.push("/app");
              }
            }}
            className="flex items-center justify-center px-6 py-2.5 rounded-full bg-black text-white"
          >
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            Back to all Trips
          </button>
        </div>
      )}
    </>
  );
};

export default TripPage;
