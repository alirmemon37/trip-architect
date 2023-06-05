import { create } from "zustand";

interface AppViewStore {
  view: AppView;
  setView: (view: AppView) => void;
}

export const useAppViewStore = create<AppViewStore>((set) => {
  return {
    view: "home",
    setView: (view) => set(() => ({ view })),
  };
});
