import React from "react";
import "./Search.css";

export const Search = (props) => {
  const { products } = props;
  function handleSearch(e) {
    e.preventDefault();
    console.log(products);
  }
  return (
    <div id="search-box">
      <form id="search-form">
        <input id="search-bar" placeholder="Search anything"></input>
        <button className="btn" id="search-btn" onClick={handleSearch}>
          Search
        </button>
      </form>
    </div>
  );
};
