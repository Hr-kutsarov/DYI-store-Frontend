import "./App.css";
import { Header } from "./components/Header";
import { LoginForm } from "./components/Auth/LoginForm";
import { Search } from "./components/Search";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { ProductList } from "./components/ProductList";
import { RegisterForm } from "./components/Auth/RegisterForm";
import { CreateProduct } from "./components/CreateProduct";
import { EditProduct } from "./components/EditProduct";
import { CompanyInfo } from "./components/CompanyInfo";
import api from "./Api/utils.js";
import { useAuthStore } from "./services/GlobalState";
import { ProductDetails } from "./components/ProductDetails";

function App() {
  const setAllStores = useAuthStore((state) => state.setAllStores);
  const setAllSections = useAuthStore((state) => state.setAllSections);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const toggledProductDetailsPanel = useAuthStore(
    (state) => state.toggledProductDetailsPanel
  );
  const toggledProductCreatePanel = useAuthStore(
    (state) => state.toggledProductCreatePanel
  );
  const toggledProductEditPanel = useAuthStore(
    (state) => state.toggledProductEditPanel
  );
  //
  const setProductsGlobally = useAuthStore((state) => state.setProducts);

  // make a call to the API to get all data before the user is logged in. Allows hashing and smoother UX
  const getAllProducts = async () => {
    let response = await api.get("api/");
    setProductsGlobally(response.data);
  };

  const getAllStores = async () => {
    let response = await api.get("api/store/");
    // console.log(response.data);
    setAllStores(response.data);
  };

  const getAllSections = async () => {
    let response = await api.get("api/section/");
    // console.log(response.data);
    setAllSections(response.data);
  };

  useEffect(() => {
    getAllProducts();
    getAllStores();
    getAllSections();
  }, []);

  return (
    <>
      <Header />
      {!isLoggedIn && <CompanyInfo />}

      <RegisterForm />

      {!isLoggedIn && <LoginForm />}

      {isLoggedIn && (
        <>
          {toggledProductCreatePanel && <CreateProduct />}
          <Search />
          <ProductList />

          {toggledProductEditPanel && <EditProduct />}
          {toggledProductDetailsPanel && <ProductDetails />}
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
