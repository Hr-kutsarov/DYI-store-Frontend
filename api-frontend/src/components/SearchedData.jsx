import React from "react";
import "./ProductList.css";

import axios from "axios";
import { useState, useEffect } from "react";
import { useAuthStore } from "../services/GlobalState";

export const SearchedData = () => {
    const searchedData = useAuthStore((state) => state.searchedData);
    const searchData = useAuthStore((state) => state.searchData)
    const onInfoClick = (id) => {};

    if (searchData) {
        return searchedData.map((p) => {
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
