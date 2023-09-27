import { create } from "zustand";
import { FilterStore } from "../types/component";

const useFilterStore = create<FilterStore>((set) => ({
  selectedFilter: 'All',
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
}));

export default useFilterStore;