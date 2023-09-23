import { create } from "zustand";
import { LoginStore } from "../types/component";

const useLoginStore = create<LoginStore>((set) => ({
    email: localStorage.getItem('rememberedEmail') || '',
    password: '',
    rememberMe: false,
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setRememberMe: (rememberMe) => {
      set((state) => {
        if (rememberMe === true) {
          localStorage.setItem('rememberedEmail', state.email);
        }
        else {
          localStorage.removeItem('rememberedEmail');
        }
        return { ...state, rememberMe };
      });
    },
    resetForm: () => set({ email: '', password: '', rememberMe: false })
  }));
  
  export default useLoginStore;