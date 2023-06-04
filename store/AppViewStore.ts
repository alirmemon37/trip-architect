import { create } from "zustand";

interface AppViewStore {
  view: AppView;
  setView: (view: AppView) => void;
}

type AppView = "home" | "map" | "trips" | "profile";

export const useAppViewStore = create<AppViewStore>((set) => {
  return {
    view: "home",
    setView: (view) => set(() => ({ view })),
  };
});
