"use client";

import AddNewPlaceWithMap from "@/components/App/Trips/AddNewPlaceWithMap";
import TripBoard from "@/components/App/Trips/TripBoard";
import TripPageHeader from "@/components/App/Trips/TripPageHeader";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { useAppViewStore } from "@/store/AppViewStore";
import { useTripStore } from "@/store/TripStore";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { eachDayOfInterval, format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import React, { FC, useEffect } from "react";

interface TripPageProps {
  params: {
    id: string;
  };
}

const TripPage: FC<TripPageProps> = ({ params }) => {
  const { id: tripId } = params;
  const [
    trip,
    tripLoading,
    getTripById,
    tripBoardColumns,
    setTripBoardColumns,
  ] = useTripStore((state) => [
    state.trip,
    state.tripLoading,
    state.getTripById,
    state.tripBoardColumns,
    state.setTripBoardColumns,
  ]);
  const setView = useAppViewStore((state) => state.setView);
  const isAddNewPlaceWithMapOpen = useAddNewPlaceWithMapStore(
    (state) => state.isAddNewPlaceWithMapOpen
  );

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchTrip = async () => {
      await getTripById(tripId);
    };

    fetchTrip();
  }, [tripId, getTripById]);

  useEffect(() => {
    getTripColumns(trip!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trip]);

  function getValidDates(startDate: Date, endDate: Date) {
    const validDates = eachDayOfInterval({ start: startDate, end: endDate });
    const formattedDates = validDates.map((date) => format(date, "dd-MM-yyyy"));
    return formattedDates;
  }

  function getTripColumns(trip: Trip) {
    if (!trip) return;

    const validDates = getValidDates(trip.startDate, trip?.endDate);
    let tripColumns: TripBoardColumn[] = [];

    if (trip?.places.length === 0) {
      validDates.forEach((date) => {
        tripColumns.push({
          heading: date,
          cards: [],
        });
      });
    } else {
      tripColumns = trip?.places?.map((column: any, index: number) => {
        return {
          heading: validDates[index],
          cards: JSON.parse(column).cards,
        };
      });
    }

    setTripBoardColumns(tripColumns);
  }

  return (
    <>
      {tripLoading ? (
        // Trip Loading
        <div className="col-span-full hidden md:flex justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
        </div>
      ) : trip ? (
        <div className="overflow-hidden">
          {isAddNewPlaceWithMapOpen ? (
            // Add New Place With Map
            <AddNewPlaceWithMap />
          ) : (
            // Trip
            <>
              <TripPageHeader />
              <TripBoard />
            </>
          )}
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
