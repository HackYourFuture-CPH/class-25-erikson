import { create } from "zustand";
import { SignupStore } from "../types/component";

const useSignupStore = create<SignupStore>((set) => ({
  userType: 'Student',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  rememberMe: false,
  setUserType: (type) => set({ userType: type }),
  setFirstName: (name) => set({ firstName: name }),
  setLastName: (name) => set({ lastName: name }),
  setEmail: (email) => set({ email: email }),
  setPassword: (password) => set({ password: password }),
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
}));

export default useSignupStore;