import React from "react";
import Map from "../Map/Map";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { useTripStore } from "@/store/TripStore";
import { useMapStore } from "@/store/MapStore";

const AddNewPlaceMap = () => {
  const [
    columnHeading,
    setIsAddNewPlaceWithMapOpen,
    pickedPlace,
    setPickedPlace,
  ] = useAddNewPlaceWithMapStore((state) => [
    state.columnHeading,
    state.setIsAddNewPlaceWithMapOpen,
    state.pickedPlace,
    state.setPickedPlace,
  ]);

  const [trip, tripBoardColumns, setTripBoardColumns, updateTrip] =
    useTripStore((state) => [
      state.trip,
      state.tripBoardColumns,
      state.setTripBoardColumns,
      state.updateTrip,
    ]);

  const geocodingControl = useMapStore(
    (state) => state.geocodingControl
  );

  // add place to trip (when user wants to add the place to the trip)
  const handleAddPlace = async () => {
    if (!pickedPlace) return;

    // Find the index of the column in the tripBoardColumns array that matches the columnHeading (the column to add the place to)
    const colIndex = tripBoardColumns.findIndex(
      (column) => column.heading === columnHeading
    );

    // Create a new card object
    const card = {
      name: pickedPlace.name,
      lng: pickedPlace.lng,
      lat: pickedPlace.lat,
      countryName: pickedPlace.countryName,
    };

    // Create a new array of columns with the new card added to the correct column
    const updatedColumns = [...tripBoardColumns];
    updatedColumns[colIndex].cards.push(card);

    // Update the trip in DB
    updateTrip({
      ...trip!,
      places: updatedColumns.map((column) => {
        return JSON.stringify({ cards: column.cards });
      }),
    });

    // Update the state with the updated tripBoardColumns array
    // local state update
    setTripBoardColumns(updatedColumns);
    setPickedPlace(null);
    geocodingControl?.setQuery("");
  };

  return (
    <>
      <div className="z-40 absolute top-4 left-4 flex flex-col items-center lg:flex-row gap-2">
        <button
          onClick={() => {
            setIsAddNewPlaceWithMapOpen(false);
            setPickedPlace(null);
          }}
          className="p-1 rounded-full hover:bg-black/10"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        {columnHeading && (
          <div className="bg-white px-2 py-1">
            <h3 className="font-medium">
              Add a place in{" "}
              <span className="font-bold bg-red-400 p-1 rounded-md px-3 py-1 text-white">
                {columnHeading}
              </span>
            </h3>
          </div>
        )}
      </div>
      {pickedPlace && (
        <div className="z-40 absolute bottom-4 left-4">
          <button
            onClick={handleAddPlace}
            className="bg-blue-500 rounded-lg px-6 py-2.5 font-bold text-white"
          >
            Add place
          </button>
        </div>
      )}
      <Map />
    </>
  );
};

export default AddNewPlaceMap;
