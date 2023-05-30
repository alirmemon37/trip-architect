import { account } from "@/appwrite"
import { create } from "zustand"

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  logout: () => void
  getUser: () => void
}

interface User {
  $id: string
  $createdAt: string
  $updatedAt: string
  name: string
  email: string
}

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,
    setUser: (user: User) => set({ user: user }),
    logout: async () => {
      await account.deleteSession('current');
      set({ user: null });
    },
    getUser: async () => {
      const user = await account.get();
      set({ user: user });
    }
  }
})