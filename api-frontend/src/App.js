import "./App.css";
import { Header } from "./components/Header";
import { LoginForm } from "./components/Auth/LoginForm";
import { Search } from "./components/Search";
import { Footer } from "./components/Footer";
import { Fragment, useState, useEffect } from "react";
import { ProductList } from "./components/ProductList";
import { RegisterForm } from "./components/Auth/RegisterForm";

import axios from "axios";

const baseUrl = "http://127.0.0.1:8000/api";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    let response = await axios.get(baseUrl);
    setProducts(response.data);
  };

  useEffect(() => {
    setIsLoading(true);
    getAllProducts().then(isLoading === false);
  }, []);

  return (
    <>
      <Header isLoading={isLoading} />
      <LoginForm user={user} />
      <RegisterForm user={user} />
      <Search products={products} />
      <ProductList products={products} />
      <Footer />
    </>
  );
}

export default App;
