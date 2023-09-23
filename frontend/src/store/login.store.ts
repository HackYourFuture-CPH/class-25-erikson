import { create } from "zustand";
import { LoginSignupState } from "../types";

const useLoginState = create<LoginSignupState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default useLoginState;
