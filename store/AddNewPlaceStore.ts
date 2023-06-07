import { create } from "zustand"

interface AddNewPlaceStore {

  // add new place modal state
  isOpen: boolean
  openModal: () => void
  closeModal: () => void

  // place name state
  placeName: string
  setPlaceName: (placeName: string) => void

  // column heading (to determine which column to add the place in)
  columnHeading: string
  setColumnHeading: (columnHeading: string) => void
}

export const useAddNewPlaceStore = create<AddNewPlaceStore>((set) => ({

  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false, placeName: "", columnHeading: "" }),

  placeName: "",
  setPlaceName: (placeName: string) => set({ placeName }),

  columnHeading: "",
  setColumnHeading: (columnHeading: string) => set({ columnHeading }),
  
}))
