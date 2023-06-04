"use client";

import { useTripStore } from "@/store/TripStore";
import { useUserStore } from "@/store/UserStore";
import React, { useEffect } from "react";
import CreateTrip from "./CreateTrip";
import Trip from "./Trip";

const Trips = () => {
  const userId = useUserStore((state) => state.user?.$id);
  const [trips, getTrips, tripsLoading] = useTripStore((state) => [
    state.trips,
    state.getTrips,
    state.tripsLoading,
  ]);

  useEffect(() => {
    const fetchTrips = async () => {
      await getTrips(userId!);
    };

    fetchTrips();
  }, [getTrips, userId]);

  return (
    <div className="mb-24 md:mb-16">
      <h1 className="text-5xl md:text-7xl font-extrabold">Your Trips</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
        <CreateTrip />
        {tripsLoading ? (
          <>
            {/* mobile loader */}
            <div className="flex md:hidden justify-center">
              <div
                className="inline-bloc h-8 w-8 mb-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              />
            </div>

            {/* desktop loader */}
            <div className="col-span-full hidden md:flex justify-center">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
            </div>
          </>
        ) : (
          trips.map((trip) => <Trip key={trip.$id} trip={trip} />)
        )}
      </div>
    </div>
  );
};

export default Trips;
