import { create } from "zustand"

interface AddNewPlaceWithMapStore {
  
  // add new place with map state
  isAddNewPlaceWithMapOpen: boolean
  setIsAddNewPlaceWithMapOpen: (isAddNewPlaceWithMapOpen: boolean) => void

  // column heading (to determine which column to add the place in)
  columnHeading: string
  setColumnHeading: (columnHeading: string) => void

  // picked place state
  pickedPlace: Place | null
  setPickedPlace: (pickedPlace: Place | null) => void

  // show map on mobile state
  isMobileMapOpen: boolean
  setIsMobileMapOpen: (isMobileMapOpen: boolean) => void

}

export const useAddNewPlaceWithMapStore = create<AddNewPlaceWithMapStore>((set) => ({
  isAddNewPlaceWithMapOpen: false,
  setIsAddNewPlaceWithMapOpen: (isAddNewPlaceWithMapOpen: boolean) =>
    set({ isAddNewPlaceWithMapOpen }),

  columnHeading: "",
  setColumnHeading: (columnHeading: string) => set({ columnHeading }),

  pickedPlace: null,
  setPickedPlace: (pickedPlace: Place | null) => set({ pickedPlace }),

  isMobileMapOpen: false,
  setIsMobileMapOpen: (isMobileMapOpen: boolean) => set({ isMobileMapOpen }),
}))