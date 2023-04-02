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
  const allSections = useAuthStore((state) => state.allStores);
  const allLocations = useAuthStore((state) => state.allSections);
  // local state store

  const sectionString = (id) => {
    const filtered = allSections.filter((obj) => obj.id === id);
    return filtered[0]["name"];
  };

  const locationString = (id) => {
    const filtered = allLocations.filter((obj) => obj.id === id);
    return filtered[0]["name"];
  };

  if (!searchedData) {
    return products.map((p) => {
      return (
        <li className="product-list" key={p.id}>
          <span>{p.id}</span>
          <span>{p.title}</span>
          <span>{sectionString(p.section)}</span>

          <span>{(p.price / p.quantity + 1).toFixed(2)}</span>
          <span>{p.status}</span>
          <span>
            Q:
            {p.quantity}
          </span>
          <span>{locationString(p.location)}</span>
        </li>
      );
    });
  }
};
