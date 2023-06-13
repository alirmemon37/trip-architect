export default function getNumberOfPlacesOfTrip(trip: Trip): number {
  const numPlaces = trip?.places?.reduce((acc: number, place: string) => {
    const placeObj = JSON.parse(place);
    const cards = placeObj.cards;
    return acc + cards.length;
  }, 0)
  return numPlaces;
}