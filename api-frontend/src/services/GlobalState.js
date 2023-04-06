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
  deleteToken: () => set((state) => ({ token: (state.token = "") })),
  //
  isLoggedIn: false,
  logIn: () => set((state) => ({ isLoggedIn: (state.isLoggedIn = true) })),
  logout: () => set((state) => ({ isLoggedIn: (state.isLoggedIn = false) })),
  //
  registered: false,
  dontWantToRegister: () =>
    set((state) => ({ registered: (state.registered = false) })),
  onRegister: () => set((state) => ({ registered: (state.registered = true) })),
  //
  allProducts: {},
  setProducts: (data) =>
    set((state) => ({ allProducts: (state.allProducts = data) })),
  //
  allStores: {},
  setAllStores: (data) =>
    set((state) => ({ allStores: (state.allStores = data) })),
  //
  allSections: {},
  setAllSections: (data) =>
    set((state) => ({ allSections: (state.allSections = data) })),
  //
  searchData: "",
  setSearchData: (data) =>
    set((state) => ({ searchData: (state.searchData = data) })),
  //
  searchedData: {},
  setSearchedData: (data) =>
    set((state) => ({ searchedData: (state.searchedData = data) })),
  //
  productDetails: {},
  setProductDetails: (data) =>
    set((state) => ({ productDetails: (state.productDetails = data) })),
  //
  toggledProductDetailsPanel: false,
  onDetailsPanel: () =>
    set((state) => ({
      toggledProductDetailsPanel: (state.toggledProductDetailsPanel = true),
    })),
  offDetailsPanel: () =>
    set((state) => ({
      toggledProductDetailsPanel: (state.toggledProductDetailsPanel = false),
    })),
  //
  toggledProductCreatePanel: false,
  onCreatePanel: () =>
    set((state) => ({
      toggledProductCreatePanel: (state.toggledProductCreatePanel = true),
    })),
  offCreatePanel: () =>
    set((state) => ({
      toggledProductCreatePanel: (state.toggledProductCreatePanel = false),
    })),
  //
  toggledProductEditPanel: false,
  onEditPanel: () =>
    set((state) => ({
      toggledProductEditPanel: (state.toggledProductEditPanel = true),
    })),
  offEditPanel: () =>
    set((state) => ({
      toggledProductEditPanel: (state.toggledProductEditPanel = false),
    })),
}));
