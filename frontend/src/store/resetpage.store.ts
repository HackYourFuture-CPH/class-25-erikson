import { create } from "zustand";
import { PasswordStore } from "../types/component";

const usePasswordStore = create<PasswordStore>((set) => ({
  email: '',
  setEmail: (email) => set({ email }),
}));

export default usePasswordStore;
