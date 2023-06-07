import React from "react";
import { Draggable } from "react-beautiful-dnd";

const TripBoardCard = ({
  card,
  index,
  id,
}: {
  card: TripBoardCard;
  index: number;
  id: string;
}) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="bg-white py-3 px-4 font-semibold shadow-sm rounded-sm">
            {card.name}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TripBoardCard;