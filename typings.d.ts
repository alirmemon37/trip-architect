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
  // places: Place[];
  $createdAt: string;
  $updatedAt: string;
  image: string;
  places?: any;
}

interface TripBoard {
  // $id: string;
  // name: string;
  columns: TripBoardColumn[];
  // $createdAt: string;
  // $updatedAt: string;
}

interface TripBoardColumn {
  // $id: string;
  heading: string;
  cards: TripBoardCard[];
  // $createdAt: string;
  // $updatedAt: string;
}

interface TripBoardCard {
  // $id: string;
  name: string;
  lng?: number;
  lat?: number;
  countryName?: string;
  // description: string;
  // $createdAt: string;
  // $updatedAt: string;
}

interface Place {
  name: string;
  lng: number;
  lat: number;
  countryName: string;
}

// type for views in the app
type AppView = "home" | "map" | "trips" | "profile";
