import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TripBoardCard from "./TripBoardCard";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { useMapStore } from "@/store/MapStore";

const TripBoardColumn = ({
  column,
  id,
}: {
  column: TripBoardColumn;
  id: string;
}) => {
  const [setIsAddNewPlaceWithMapOpen, setColumnHeading] = useAddNewPlaceWithMapStore(
    (state) => [state.setIsAddNewPlaceWithMapOpen, state.setColumnHeading]
  );
  const mapMarker = useMapStore((state) => state.mapMarker);

  const handleAddPlace = (columnHeading: string) => {
    setColumnHeading(columnHeading);
    setIsAddNewPlaceWithMapOpen(true);

    // remove any existing marker
    if (mapMarker) {
      mapMarker.remove();
    }
  };

  return (
    <>
      <div className="min-h-[50px]">
        <div className="flex items-center mb-2">
          <div className="font-semibold text-white bg-red-400 rounded-lg px-2 py-0.5">
            {column.heading} ({column.cards.length})
          </div>
        </div>
        <div className="px-2 py-2 bg-gray-100/50 rounded-sm">
          {/* render droppable places in the column */}
          {/* droppable id is the index of the column */}
          <Droppable droppableId={id} type="card">
            {(provided, snapshot) => (
              <div
                className={`mt-2 flex flex-col gap-3 ${
                  snapshot.isDraggingOver ? "bg-green-400" : ""
                } `}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {/* render all the places */}
                {column.cards.map((card, index) => (
                  <TripBoardCard
                    key={index}
                    card={card}
                    index={index}
                    id={card.name}
                    columnHeading={column.heading}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="flex items-end justify-end p-2 text-sm bg-gray-200/50 rounded-md mt-2">
            <button
              onClick={() => handleAddPlace(id)}
              className="flex gap-1 text-gray-500 hover:text-gray-600 hover:bg-gray-200 px-3 py-1 rounded-full transition-colors duration-150"
            >
              Add a Place
              <PlusIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TripBoardColumn;
