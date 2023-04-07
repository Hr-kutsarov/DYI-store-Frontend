import React from "react";
import "./ProductList.css";
import api from '../Api/utils.js'

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
                <div
                  className="property"
                  id="actions-product-list">
                <button id="show-info-btn" className="round-btn" >
                  info
                </button>
                </div>
                <div className="property">{p.title}</div>
                <div className="property">{sectionString(p.section)}</div>
                
                <div className="property">{p.price}</div>
                <div className="property">{p.status}</div>
                <div className="property">
                  Q:
                  {p.quantity}
                </div>
                <div className="property">{locationString(p.location)}</div>
              </li>
            );
          });
    }
};
