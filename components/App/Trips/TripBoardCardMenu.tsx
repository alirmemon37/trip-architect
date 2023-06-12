import React, { Fragment } from "react";
import { EllipsisHorizontalIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { useTripStore } from "@/store/TripStore";

const TripBoardCardMenu = ({
  card,
  columnHeading,
}: {
  card: TripBoardCard;
  columnHeading: string;
}) => {
  const [trip, tripBoardColumns, setTripBoardColumns, updateTrip] =
    useTripStore((state) => [
      state.trip,
      state.tripBoardColumns,
      state.setTripBoardColumns,
      state.updateTrip,
    ]);

  const handlePlaceDelete = () => {
    // Find the index of the column in the tripBoardColumns array that matches the columnHeading (the column to delete the place from)
    const colIndex = tripBoardColumns.findIndex(
      (column) => column.heading === columnHeading
    );

    // Create a new array of columns
    const updatedColumns = [...tripBoardColumns];

    // Remove the place from the correct column
    // TODO: Filtering by name, lng, and lat is not enough to remove the correct place, instead, we need to filter by id
    updatedColumns[colIndex].cards = updatedColumns[colIndex].cards.filter(
      (c) => c.name !== card.name && c.lng !== card.lng && c.lat !== card.lat
    );

    // Update the trip in DB
    updateTrip({
      ...trip!,
      places: updatedColumns.map((column) => {
        return JSON.stringify({ cards: column.cards });
      }),
    });

    // Update the state with the updated tripBoardColumns array
    setTripBoardColumns(updatedColumns);
  };

  return (
    <Menu as="div" className="absolute right-4 top-4">
      <Menu.Button className="hidden group-hover/card:block py-1 px-1.5 bg-gray-100 hover:bg-gray-200 rounded-md hover:cursor-pointer">
        <EllipsisHorizontalIcon className="w-5 h-5" />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute z-10 top-0 right-0 w-44 font-medium origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handlePlaceDelete}
                  className={`${
                    active ? "bg-blue-500 text-white" : "text-gray-900"
                  } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                >
                  <TrashIcon className="w-5 h-5 mr-2" />
                  Delete
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default TripBoardCardMenu;
