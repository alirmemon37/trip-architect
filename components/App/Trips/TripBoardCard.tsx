import { useAddNewPlaceWithMapStore } from "@/store/AddNewPlaceWithMapStore";
import { useMapStore } from "@/store/MapStore";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import maplibregl from "maplibre-gl";

const TripBoardCard = ({
  card,
  index,
  id,
}: {
  card: TripBoardCard;
  index: number;
  id: string;
}) => {
  const setIsAddNewPlaceWithMapOpen = useAddNewPlaceWithMapStore(
    (state) => state.setIsAddNewPlaceWithMapOpen
  );

  const [map, mapMarker, setMapMarker] = useMapStore((state) => [
    state.map,
    state.mapMarker,
    state.setMapMarker,
  ]);

  const handlePlaceClick = () => {
    setIsAddNewPlaceWithMapOpen(true);

    // remove existing marker
    if (mapMarker) {
      mapMarker.remove();
    }

    // jump to the place on the map
    map?.flyTo({ center: [card.lng!, card.lat!], zoom: 9 });

    // add marker
    const marker = new maplibregl.Marker({
      color: "#3B82F6",
      draggable: false,
    })
      .setLngLat([card.lng!, card.lat!])
      .addTo(map!);

    setMapMarker(marker);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div
            onClick={handlePlaceClick}
            className="flex flex-col gap-1 bg-white py-3 px-4 font-semibold shadow-sm rounded-sm"
          >
            <span>{card.name}</span>
            <span className="text-sm text-gray-400">{card?.countryName}</span>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TripBoardCard;
