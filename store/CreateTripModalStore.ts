import { ID, databases } from "@/appwrite";
import uploadImage from "@/lib/uploadImage";
import { Models } from "appwrite";
import { create } from "zustand";

interface CreateTripModalStore {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;

  imageFile: File | null;
  setImageFile: (imageFile: File | null) => void;

  tripName: string;
  setTripName: (tripName: string) => void;

  // string is converted to Date when added to DB
  tripStartDate: string;
  setTripStartDate: (tripStartDate: string) => void;

  tripEndDate: string;
  setTripEndDate: (tripEndDate: string) => void;

  createTrip: ({
    image,
    name,
    startDate,
    endDate,
    creator,
  }: {
    name: string;
    startDate: Date;
    endDate: Date;
    image: File;
    creator: string;
  }) => Promise<Models.Document | undefined>;
}

export const useCreateTripModalStore = create<CreateTripModalStore>((set) => {
  return {
    isOpen: false,
    openModal: () => set(() => ({ isOpen: true })),
    closeModal: () => set(() => ({ isOpen: false, imageFile: null })),

    imageFile: null,
    setImageFile: (imageFile) => set(() => ({ imageFile })),

    tripName: "",
    setTripName: (tripName) => set(() => ({ tripName })),

    tripStartDate: "",
    setTripStartDate: (tripStartDate) => set(() => ({ tripStartDate })),

    tripEndDate: "",
    setTripEndDate: (tripEndDate) => set(() => ({ tripEndDate })),

    // create a new trip in appwrite
    createTrip: async (trip) => {
      try {
        let file: Image | undefined;

        if (trip.image) {
          const fileUploaded = await uploadImage(trip.image);
          if (fileUploaded) {
            file = {
              bucketId: fileUploaded.bucketId,
              fileId: fileUploaded.$id,
            };
          }
        }

        const response = await databases.createDocument(
          process.env.NEXT_PUBLIC_TRIPARCHITECT_DATABASE_ID!,
          process.env.NEXT_PUBLIC_TRIPS_COLLECTION_ID!,
          ID.unique(),
          {
            name: trip.name,
            startDate: trip.startDate,
            endDate: trip.endDate,
            creator: trip.creator,
            ...(file && { image: JSON.stringify(file) }),
          }
        );
        
        return response as Models.Document;

      } catch (error) {
        console.log(error);
      } finally {
        set(() => ({
          isOpen: false,
          imageFile: null,
          tripName: "",
          tripStartDate: "",
          tripEndDate: "",
        }));
      }
    },
  };
});
