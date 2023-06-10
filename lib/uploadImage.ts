import { ID, storage } from "@/appwrite";

export default async function uploadImage(file: File, bucketId: string) {
  if (!file) return;

  const fileUploaded = await storage.createFile(
    bucketId,
    ID.unique(),
    file
  );

  return fileUploaded;
}
