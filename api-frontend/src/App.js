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
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api");
    setProducts(response.data);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllProducts().then(setIsLoading(false));
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
