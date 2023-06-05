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
}

interface Place {
  name: string;
  lat: number;
  lng: number;
  date: Date;
}

// type for views in the app
type AppView = "home" | "map" | "trips" | "profile";
