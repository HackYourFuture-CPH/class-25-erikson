import { create } from "zustand";
import { ErrorState } from "../types";

const useErrorState = create<ErrorState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default useErrorState;
