import React from "react";
import "./ProductList.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthStore } from "../services/GlobalState";

export const ProductList = (props) => {
  const { products } = props;
  const allProducts = useAuthStore((state) => state.allProducts);
  const searchData = useAuthStore((state) => state.searchData);
  const searchedData = useAuthStore((state) => state.searchData);
  // local state store
  const [stores, setStores] = useState({});
  const [sections, setSections] = useState({});

  const onInfoClick = (id) => {};

  const getAllStores = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/store");
    console.log(response.data);
    setStores(response.data);
  };

  const getAllSections = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/section");
    console.log(response.data);
    setSections(response.data);
  };

  useEffect(() => {
    getAllStores();
    getAllSections();
  }, []);

  if (!searchedData) {
    return products.map((p) => {
      return (
        <li className="product-list" key={p.id} onClick={onInfoClick}>
          <span>{p.id}</span>
          <span>{p.title}</span>
          <span>{(p.price / p.quantity + 1).toFixed(2)}</span>
          <span>{p.status}</span>
          <span>
            Q:
            {p.quantity}
          </span>
        </li>
      );
    });
  }
};
