import { account } from "@/appwrite";
import uploadImage from "@/lib/uploadImage";
import { Models } from "appwrite";
import { create } from "zustand";

interface ProfileStore {
  // avatar file state
  avatarFile: File | null;
  setAvatarFile: (avatarFile: File | null) => void;

  // profile name state
  name: string;
  setName: (name: string) => void;

  // profile update functions
  updateProfileName: (name: string) => Promise<Models.User<Models.Preferences> | undefined>;

  updateProfileAvatar: (avatar: File | null) => Promise<Models.User<Models.Preferences> | undefined>;

  // profile loading state
  profileLoading: boolean;
  setProfileLoading: (loading: boolean) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  avatarFile: null,
  setAvatarFile: (avatarFile) => set(() => ({ avatarFile })),

  name: "",
  setName: (name) => set(() => ({ name })),

  updateProfileName: async (name) => {
    try {
      const response = await account.updateName(name);
      return response as Models.User<Models.Preferences>;
    } catch (err) {
      console.error(err);
    }
  },

  updateProfileAvatar: async (avatar) => {
    try {
      let file: Image | undefined;

      if (avatar) {
        const fileUploaded = await uploadImage(
          avatar,
          process.env.NEXT_PUBLIC_PROFILE_IMAGE_BUCKET_ID!
        );
        if (fileUploaded) {
          file = {
            bucketId: fileUploaded.bucketId,
            fileId: fileUploaded.$id,
          };
        }
        const response = await account.updatePrefs({
          avatar: JSON.stringify(file),
        });
        return response as Models.User<Models.Preferences>;
      }
    } catch (err) {
      console.error(err);
    }
  },

  profileLoading: false,
  setProfileLoading: (loading) => set(() => ({ profileLoading: loading })),
}));
