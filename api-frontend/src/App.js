import "./App.css";
import { Header } from "./components/Header";
import { LoginForm } from "./components/Auth/LoginForm";
import { Search } from "./components/Search";
import { Footer } from "./components/Footer";
import { useState, useEffect } from "react";
import { ProductList } from "./components/ProductList";
import { RegisterForm } from "./components/Auth/RegisterForm";

import axios from "axios";
import { useAuthStore } from "./services/GlobalState";

function App() {
  const setAllStores = useAuthStore((state) => state.setAllStores);
  const setAllSections = useAuthStore((state) => state.setAllSections);
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [products, setProducts] = useState([]);

  //
  const setProductsGlobally = useAuthStore((state) => state.setProducts);

  // make a call to the API to get all data before the user is logged in. Allows hashing and smoother UX
  const getAllProducts = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api");
    setProducts(response.data);
    setProductsGlobally(response.data);
  };

  const getAllStores = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/store");
    // console.log(response.data);
    setAllStores(response.data);
  };

  const getAllSections = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/section");
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
      <LoginForm />
      <RegisterForm />
      {isLoggedIn && (
        <>
          <Search products={products} />
          <ProductList products={products} />
        </>
      )}
      <Footer />
    </>
  );
}

export default App;
