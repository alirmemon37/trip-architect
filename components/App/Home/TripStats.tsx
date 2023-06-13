import React from "react";

const TripStats = ({
  numTrips,
  numPlaces,
}: {
  numTrips: number;
  numPlaces: number;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Stats</h2>
      <div className="flex gap-6 flex-wrap">
        <div className="min-w-[160px] min-h-[120px] p-4 bg-gray-100 rounded-lg flex flex-col items-center">
          <span className="text-lg font-bold">Trips</span>
          <span className="text-6xl font-bold">{numTrips}</span>
        </div>
        <div className="min-w-[160px] min-h-[120px] p-4 bg-gray-100 rounded-lg flex flex-col items-center">
          <span className="text-lg font-bold">Places</span>
          <span className="text-6xl font-bold">{numPlaces}</span>
        </div>
      </div>
    </div>
  );
};

export default TripStats;
