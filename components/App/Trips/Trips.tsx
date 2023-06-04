"use client"

import { useTripStore } from "@/store/TripStore";
import { useUserStore } from "@/store/UserStore";
import React, { useEffect } from "react";
import CreateTrip from "./CreateTrip";
import Trip from "./Trip";

const Trips = () => {

  const userId = useUserStore((state) => state.user?.$id);
  const [trips, getTrips] = useTripStore((state) => [state.trips, state.getTrips]);

  useEffect(() => {
    const fetchTrips = async () => {
      await getTrips(userId!)
    }

    fetchTrips()
  }, [getTrips, userId]);

  return (
    <div>
      <h1 className="text-5xl md:text-7xl font-extrabold">Your Trips</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
        <CreateTrip />
        {
          trips.map((trip) => (
            <Trip key={trip.$id} trip={trip} />
          ))
        }
      </div>
    </div>
  );
};

export default Trips;
