import { databases } from "@/appwrite";
import { Query } from "appwrite";
import { create } from "zustand";
import { useUserStore } from "./UserStore";

interface TripStore {
  // all trips of the user
  trips: Trip[];

  // loading state of trips
  tripsLoading: boolean;
  setTripsLoading: (loading: boolean) => void;

  // image of the trip
  imageFile: File | null;
  setImageFile: (imageFile: File) => void;

  // optimistic update of trips (show new trip immediately)
  addTrip: (trip: Trip) => void;

  // optimistic update of trips (removes trip immediately)
  removeTrip: (trip: Trip) => void;

  // add trip to DB
  addTripToDB: (trip: Trip) => void;

  // remove trip from DB
  removeTripFromDB: (trip: Trip) => void;

  // get all trips of the user from DB
  getTrips: (userId: string) => void;
}

export const useTripStore = create<TripStore>((set, get) => {
  return {
    trips: [],

    tripsLoading: false,
    setTripsLoading: (loading) => set(() => ({ tripsLoading: loading })),

    imageFile: null,
    setImageFile: (imageFile) => set(() => ({ imageFile })),

    addTrip: (trip) => set(() => ({ trips: [trip, ...get().trips] })),
    removeTrip: (trip) =>
      set((state) => ({ trips: state.trips.filter((t) => t !== trip) })),

    addTripToDB: (trip) => {},
    removeTripFromDB: (trip) => {},

    getTrips: async (userId: string) => {
      set({ tripsLoading: true });
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_TRIPARCHITECT_DATABASE_ID!,
          process.env.NEXT_PUBLIC_TRIPS_COLLECTION_ID!,
          [Query.equal("creator", userId)]
        );
        const trips = response.documents;

        const tripsFormatted = trips.map((trip) => {
          return {
            $id: trip.$id,
            creator: trip.creator,
            name: trip.name,
            startDate: new Date(trip.startDate),
            endDate: new Date(trip.endDate),
            $createdAt: trip.$createdAt,
            $updatedAt: trip.$updatedAt,
            image: trip.image,
          }
        })
        set({ trips: tripsFormatted })
      } catch (error) {
        set({ trips: [] });
        console.log(error);
      } finally {
        set({ tripsLoading: false });
      }
    },
  };
});
