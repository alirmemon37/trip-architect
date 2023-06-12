import React from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import TripBoardColumn from "./TripBoardColumn";
import { useTripStore } from "@/store/TripStore";
import AddNewPlaceModal from "./AddNewPlaceModal";
import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import clsx from "clsx";

interface TripBoardProps {
  tripBoardColumns: TripBoardColumn[];
  setTripColumns: React.Dispatch<React.SetStateAction<TripBoardColumn[]>>;
}

const TripBoard = () => {
  const [trip, updateTrip, tripBoardColumns, setTripBoardColumns] =
    useTripStore((state) => [
      state.trip,
      state.updateTrip,
      state.tripBoardColumns,
      state.setTripBoardColumns,
    ]);
  const isAddNewPlaceWithMapOpen = useAddNewPlaceWithMapStore(
    (state) => state.isAddNewPlaceWithMapOpen
  );

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // Check if the user dragged the card outside of the board
    if (!destination) {
      return;
    }

    // DroppableId is the heading of the column
    const sourceColIndex = tripBoardColumns.findIndex(
      (column) => column.heading === source.droppableId
    );
    const destColIndex = tripBoardColumns.findIndex(
      (column) => column.heading === destination.droppableId
    );

    // Index is the order inside the column
    const sourceItemIndex = source.index;
    const destItemIndex = destination.index;

    if (sourceColIndex === -1 || destColIndex === -1) {
      return;
    }

    if (sourceColIndex === destColIndex) {
      sameColumnReorder(sourceColIndex, sourceItemIndex, destItemIndex);
    } else {
      differentColumnReorder(
        sourceColIndex,
        destColIndex,
        sourceItemIndex,
        destItemIndex
      );
    }
  };

  const sameColumnReorder = (
    sourceColIndex: number,
    sourceItemIndex: number,
    destItemIndex: number
  ) => {
    // Get the column
    const column = tripBoardColumns[sourceColIndex];

    // Create a copy of the cards array in the column
    const updatedCards = Array.from(column.cards);

    // Remove the card from the column
    const [removedCard] = updatedCards.splice(sourceItemIndex, 1);

    // Add the card to the destination position within the same column
    updatedCards.splice(destItemIndex, 0, removedCard);

    // Create a copy of the column with the updated cards array
    const updatedColumn = { ...column, cards: updatedCards };

    // Create a copy of the tripBoardColumns array with the updated column
    const updatedColumns = [...tripBoardColumns];
    updatedColumns[sourceColIndex] = updatedColumn;

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

  const differentColumnReorder = (
    sourceColIndex: number,
    destColIndex: number,
    sourceItemIndex: number,
    destItemIndex: number
  ) => {
    // Get the source column and destination column
    const sourceColumn = tripBoardColumns[sourceColIndex];
    const destColumn = tripBoardColumns[destColIndex];

    // Create copies of the cards arrays in the source and destination columns
    const updatedSourceCards = Array.from(sourceColumn.cards);
    const updatedDestCards = Array.from(destColumn.cards);

    // Remove the card from the source column
    const [removedCard] = updatedSourceCards.splice(sourceItemIndex, 1);

    // Add the card to the destination column
    updatedDestCards.splice(destItemIndex, 0, removedCard);

    // Create updated source and destination columns with the updated cards arrays
    const updatedSourceColumn = { ...sourceColumn, cards: updatedSourceCards };
    const updatedDestColumn = { ...destColumn, cards: updatedDestCards };

    // Create a copy of the tripBoardColumns array with the updated source and destination columns
    const updatedColumns = [...tripBoardColumns];
    updatedColumns[sourceColIndex] = updatedSourceColumn;
    updatedColumns[destColIndex] = updatedDestColumn;

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
    <div className="mt-8 mb-16 md:mb-8 py-2 md:px-6 md:py-4">
      <DragDropContext onDragEnd={handleDragEnd}>
        <div
          className={clsx(
            "grid grid-cols-1 gap-8",
            !isAddNewPlaceWithMapOpen &&
              "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}
        >
          {/* map through all the dates */}
          {tripBoardColumns.map((column, index) => (
            <TripBoardColumn
              key={index}
              column={column}
              id={column.heading}
            />
          ))}
        </div>
      </DragDropContext>
      <AddNewPlaceModal />
    </div>
  );
};

export default TripBoard;
