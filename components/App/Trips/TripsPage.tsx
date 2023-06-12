import React from "react";
import CreateTrip from "./CreateTrip";
import Trips from "./Trips";

const TripsPage = () => {
  return (
    <div className="mb-24 md:mb-16 p-4 md:py-6 md:px-10">
      <h1 className="text-5xl md:text-7xl font-extrabold">Your Trips</h1>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-8">
        <CreateTrip />
        <Trips />
      </div>
    </div>
  );
};

export default TripsPage;
