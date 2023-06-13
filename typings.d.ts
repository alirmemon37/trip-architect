interface Image {
  bucketId: string;
  fileId: string;
}

interface Trip {
  $id: string;
  creator: string;
  name: string;
  startDate: Date;
  endDate: Date;
  $createdAt: string;
  $updatedAt: string;
  image: string;
  places: string[];
}

interface TripBoard {
  columns: TripBoardColumn[];
}

interface TripBoardColumn {
  heading: string;
  cards: TripBoardCard[];
}

interface TripBoardCard {
  name: string;
  lng?: number;
  lat?: number;
  countryName?: string;
}

interface Place {
  name: string;
  lng: number;
  lat: number;
  countryName: string;
}

// type for views in the app
type AppView = "home" | "map" | "trips" | "profile";
