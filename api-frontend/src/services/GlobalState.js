import { create } from "zustand";

export const useAuthStore = create((set) => ({
  counter: 0,
  counterAdd: () => set((state) => ({ counter: state.counter + 1 })),
  counterDelete: () => set({ counter: 0 }),
  //
  username: "",
  setUsername: (newUsername) =>
    set((state) => ({ username: (state.username = newUsername) })),
  //
  token: "",
  setToken: (tokenString) =>
    set((state) => ({ token: (state.token = tokenString) })),
  //
  isLoggedIn: false,
  logIn: () => set((state) => ({ isLoggedIn: (state.isLoggedIn = true) })),
  logout: () => set((state) => ({ isLoggedIn: (state.isLoggedIn = false) })),
  //
  registered: false,
  dontWantToRegister: () =>
    set((state) => ({ registered: (state.registered = false) })),
  wantToRegister: () =>
    set((state) => ({ registered: (state.registered = true) })),
  //
  ALL_PRODUCTS: {},
  setProducts: (data) =>
    set((state) => ({ ALL_PRODUCTS: (state.ALL_PRODUCTS = data) })),
}));
