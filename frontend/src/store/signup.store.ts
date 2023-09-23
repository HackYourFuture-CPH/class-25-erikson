import { create } from "zustand";
import { SignupState } from "../types/component";

const useSignupState = create<SignupState>((set) => ({
  error: null,
  setError: (error) => set({ error }),
}));

export default useSignupState;