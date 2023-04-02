import React, { useRef, useEffect, useState } from "react";
import "./Search.css";
import { SearchedData } from "./SearchedData";
import { useAuthStore } from "../services/GlobalState";

export const Search = () => {
  const ref = useRef();

  // global state store selectors
  const searchData = useAuthStore((state) => state.searchData);
  const setSearchData = useAuthStore((state) => state.setSearchData);
  const allProducts = useAuthStore((state) => state.allProducts);

  const setSearchedData = useAuthStore((state) => state.setSearchedData);

  const handleSearch = (e) => {
    const data = e.target.value.toLowerCase();

    const result = allProducts.filter((obj) =>
      obj.title.toLowerCase().includes(data)
    );
    setSearchedData(result);
    setSearchData(e.target.value);
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  return (
    <>
      <div id="search-box">
        <form id="search-form">
          <input
            key="search"
            id="search-bar"
            placeholder="Search anything"
            ref={ref}
            value={searchData}
            onChange={handleSearch}
          ></input>
        </form>
        <SearchedData />
      </div>
    </>
  );
};
