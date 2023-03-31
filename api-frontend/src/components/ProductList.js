import React from "react";
import "./ProductList.css";
import { Product } from "./Product";
import axios from "axios";

export const ProductList = (props) => {
  const { products } = props;
  const onInfoClick = (id) => {};

  return products.map((p) => {
    return (
      <li className="product-list" key={p.id} onClick={onInfoClick}>
        <span>{p.id}</span>
        <span>{p.title}</span>
        <span>{p.price}</span>
        <span>{p.status}</span>
        <span>Q: {p.quantity}</span>
      </li>
    );
  });
};
