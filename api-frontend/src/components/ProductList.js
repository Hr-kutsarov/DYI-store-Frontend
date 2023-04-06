import React from "react";
import "./ProductList.css";
import { Product } from "./Product";

import { useAuthStore } from "../services/GlobalState";

export const ProductList = () => {
  const searchedData = useAuthStore((state) => state.searchData);
  const allProducts = useAuthStore((state) => state.allProducts);

  if (!searchedData) {
    return allProducts.map((p) => {
      return (
        <div className="product-box">
          <Product key={p.id} {...p} />
        </div>
      );
    });
  }
};
