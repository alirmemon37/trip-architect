"use client";

import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useAddNewPlaceStore } from "@/store/AddNewPlaceStore";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTripStore } from "@/store/TripStore";

const AddNewPlaceModal = () => {
  const [
    isOpen,
    closeModal,
    placeName,
    setPlaceName,
    columnHeading,
    setColumnHeading,
  ] = useAddNewPlaceStore((state) => [
    state.isOpen,
    state.closeModal,
    state.placeName,
    state.setPlaceName,
    state.columnHeading,
    state.setColumnHeading,
  ]);

  const [trip, tripBoardColumns, setTripBoardColumns, updateTrip] =
    useTripStore((state) => [
      state.trip,
      state.tripBoardColumns,
      state.setTripBoardColumns,
      state.updateTrip,
    ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Find the index of the column in the tripBoardColumns array that matches the columnHeading (the column to add the place to)
    const colIndex = tripBoardColumns.findIndex(
      (column) => column.heading === columnHeading
    );

    // Create a new card object
    const card = { name: placeName };

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

    setPlaceName("");
    setColumnHeading("");
    closeModal();
  };

  return (
    // Use the `Transition` component at the root level
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="form"
        onSubmit={handleSubmit}
        onClose={closeModal}
        className="relative z-50"
      >
        {/* One Transition.Child to apply one transition to the backdrop... */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            {/* Another Transition.Child to apply a separate transition to the contents. */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transformm overflow-hidden rounded-sm bg-white text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between items-center text-lg font-bold leading-6 bg-gray-200 px-6 py-3"
                >
                  Add new Place
                  <div
                    onClick={closeModal}
                    className="p-1 cursor-pointer rounded-full hover:bg-black/10 transition-all duration-300"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </div>
                </Dialog.Title>
                <div className="flex flex-col gap-4 mt-2 px-6 py-4">
                  <div>
                    Travel Date:{" "}
                    <span className="font-semibold">{columnHeading}</span>
                  </div>
                  <div>
                    <label
                      htmlFor="place-name"
                      className="font-semibold text-base"
                    >
                      Place Name
                    </label>
                    <input
                      id="place-name"
                      name="name"
                      type="text"
                      value={placeName}
                      onChange={(e) => setPlaceName(e.target.value)}
                      placeholder="'London"
                      className="w-full rounded-md text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent px-4 py-2.5 mt-2"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      disabled={!placeName}
                      className="inline-flex items-center px-4 py-2 font-medium text-white bg-blue-500 border border-transparent rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Add Place
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddNewPlaceModal;
