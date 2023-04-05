import React from "react";
import "./ProductList.css";
import { Product } from "./Product";

import { useAuthStore } from "../services/GlobalState";

export const ProductList = (props) => {
  const { products } = props;
  // const allProducts = useAuthStore((state) => state.allProducts);
  // const searchData = useAuthStore((state) => state.searchData);
  const searchedData = useAuthStore((state) => state.searchData);
  const allProducts = useAuthStore((state) => state.allProducts);

  if (!searchedData) {
    return allProducts.map((p) => {
      return <Product key={p.id} {...p} />;
    });
  }
};
