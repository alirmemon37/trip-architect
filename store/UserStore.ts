import { account } from "@/appwrite";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  getUser: () => void;
  userLoading: boolean;
  setUserLoading: (loading: boolean) => void;
}

interface User {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  name: string;
  email: string;
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,
    setUser: (user: User) => set(() => ({ user: user })),
    logout: async () => {
      set({ userLoading: true });
      await account.deleteSession("current");
      set({ user: null });
      set({ userLoading: false });
    },
    getUser: async () => {
      set({ userLoading: true });
      try {
        const userData = await account.get(); // get user from appwrite
        set({
          user: {
            name: userData.name,
            email: userData.email,
            $createdAt: userData.$createdAt,
            $id: userData.$id,
            $updatedAt: userData.$updatedAt,
          },
        });
      } catch (error) {
        set({ user: null });
        console.log(error);
      }
      set({ userLoading: false });
    },
    userLoading: false,
    setUserLoading: (loading: boolean) => set(() => ({ userLoading: loading })),
  };
});
