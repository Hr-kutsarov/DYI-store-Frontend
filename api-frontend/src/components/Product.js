import { FaFolderPlus, FaInfoCircle, FaTrashAlt } from "react-icons/fa";
import { useAuthStore } from "../services/GlobalState";
import { useState } from "react";

export const Product = ({
  id,
  status,
  location,
  price,
  quantity,
  title,
  section,
}) => {
  const allSections = useAuthStore((state) => state.allStores);
  const allLocations = useAuthStore((state) => state.allSections);
  const setProductDetails = useAuthStore((state) => state.setProductDetails);
  const productDetails = useAuthStore((state) => state.productDetails);
  const onProductDetailsPanel = useAuthStore(
    (state) => state.onProductDetailsPanel
  );
  const offProductDetailsPanel = useAuthStore(
    (state) => state.offProductDetailsPanel
  );
  const sectionString = (id) => {
    const filtered = allSections.filter((obj) => obj.id === id);
    return filtered[0]["name"];
  };

  const locationString = (id) => {
    const filtered = allLocations.filter((obj) => obj.id === id);
    return filtered[0]["name"];
  };

  const handleInfoProduct = async () => {
    let baseUrl = "http://127.0.0.1:8000/api/";
    const response = await fetch(baseUrl + id);
    const jsonData = await response.json();
    setProductDetails(jsonData);
    onProductDetailsPanel();
  };

  const handleDeleteProduct = async () => {
    let baseUrl = "http://127.0.0.1:8000/api/";
    const response = await fetch(baseUrl + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);
    offProductDetailsPanel();
  };
  return (
    <li className="product-list" key={id}>
      <span>
        <button onClick={handleInfoProduct}>info</button>
        <button onClick={handleDeleteProduct}>del</button>
      </span>
      <span>{title}</span>
      <span>{sectionString(section)}</span>

      <span>{(price / quantity).toFixed(2)}</span>
      <span>{productDetails.id}</span>
      <span>
        Q:
        {quantity}
      </span>
      <span>{locationString(location)}</span>
    </li>
  );
};
