import { ID, storage } from "@/appwrite";

export default async function uploadImage(file: File) {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    process.env.NEXT_PUBLIC_TRIP_BANNER_IMAGE_BUCKET_ID!,
    ID.unique(),
    file
  );

  return fileUploaded;
}
