"use client";

import { useTripStore } from "@/store/TripStore";
import { useUserStore } from "@/store/UserStore";
import React, { useEffect } from "react";
import Trip from "./Trip";
import { useRouter } from "next/navigation";

const Trips = () => {
  const userId = useUserStore((state) => state.user?.$id);
  const [trips, getTrips, tripsLoading] = useTripStore((state) => [
    state.trips,
    state.getTrips,
    state.tripsLoading,
  ]);

  const router = useRouter();

  useEffect(() => {
    const fetchTrips = async () => {
      await getTrips(userId!);
    };

    fetchTrips();
  }, [getTrips, userId]);

  return (
    <>
      {tripsLoading ? (
        <>
          {/* mobile loader */}
          <div className="flex md:hidden justify-center">
            <div
              className="inline-block h-8 w-8 mb-16 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            />
          </div>

          {/* desktop loader */}
          <div className="col-span-full hidden md:flex justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
          </div>
        </>
      ) : (
        <>
          {trips.length === 0 && (
            <span className="flex md:hidden text-lg font-medium">
              No trips found. Create a trip by clicking the &quot;+&quot; button
            </span>
          )}
          {trips.map((trip) => (
            <Trip
              key={trip.$id}
              trip={trip}
              onTripClick={() => {
                router.push(`/app/trip/${trip.$id}`);
              }}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Trips;
