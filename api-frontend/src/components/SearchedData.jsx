import React from "react";
import "./ProductList.css";


import { useAuthStore } from "../services/GlobalState";

export const SearchedData = () => {
    const searchedData = useAuthStore((state) => state.searchedData);
    const searchData = useAuthStore((state) => state.searchData)


    const allStores = useAuthStore((state) => state.allStores);

    const allLocations = useAuthStore((state) => state.allSections);
    // local state store
  
    const sectionString = (id) => {
      const filtered = allStores.filter((obj) => obj.id === id);
      return filtered[0]["name"];
    };
  
    const locationString = (id) => {
      const filtered = allLocations.filter((obj) => obj.id === id);
      return filtered[0]["name"];
    };

    if (searchData) {
        return searchedData.map((p) => {
            return (
              <li className="product-list" key={p.id}>
                <span>{p.id}</span>
                <span>{p.title}</span>
                <span>{sectionString(p.section)}</span>
                
                <span>{(p.price / p.quantity).toFixed(2)}</span>
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
