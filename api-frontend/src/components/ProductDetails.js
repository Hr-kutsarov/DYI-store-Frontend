import { useAuthStore } from "../services/GlobalState";
import { useState } from "react";
import "./ProductDetails.css";
import api from "../Api/utils.js";

export const ProductDetails = () => {
  //global state
  let productDetails = useAuthStore((state) => state.productDetails);
  let offDetailsPanel = useAuthStore((state) => state.offDetailsPanel);
  let onEditPanel = useAuthStore((state) => state.onEditPanel);
  let setProducts = useAuthStore((state) => state.setProducts);
  let allStores = useAuthStore((state) => state.allStores);
  let allSections = useAuthStore((state) => state.allSections);
  // local state
  let [msg, setMsg] = useState("");

  const pricePerUnit = () => {
    return (productDetails.price / productDetails.quantity).toFixed(2);
  };
  const displayStoreName = (number) => {
    return allStores.filter((store) => store.id === number)[0]["name"];
  };

  const displaySectionName = (number) => {
    return allSections.filter((section) => section.id === number)[0]["name"];
  };
  // update the product list
  let refreshList = async () => {
    let response = await api.get("api/");
    setProducts(response.data);
  };

  // Edit button functionality
  const editProductHandler = () => {
    onEditPanel();
    offDetailsPanel();
  };

  // Delete button functionality
  const deleteProductHandler = async () => {
    api
      .delete(`api/${productDetails.id}`)
      .then(function (response) {
        if (response.status === 200) {
          setMsg(response.statusText + " Successfully");
          console.log("Edited successfully");
          offDetailsPanel();
          refreshList();
        }
      })
      .catch(function (error) {
        setMsg(`Whoops, wrong data. ${error.message}`);
      });

    offDetailsPanel();
    refreshList();
  };

  const handleHide = () => {
    offDetailsPanel();
  };
  return (
    <>
      <section className="product-details">
        <figure>
          <img alt="" src={productDetails.thumbnail}></img>
        </figure>
        <h3>{productDetails.title}</h3>
        <p>Details: {productDetails.type}</p>
        <p>Price per unit: {pricePerUnit()}</p>
        <p>Location: {displayStoreName(productDetails.location)}</p>
        <p>Section: {displaySectionName(productDetails.section)}</p>
        <p>Quantity: {productDetails.quantity}</p>
        <p>Description: {productDetails.description}</p>
        <p>Status: {productDetails.status}</p>
        {productDetails.is_featured ? <p>FEATURED</p> : <p>Not featured</p>}
        <div className="delete-msg-box">{msg}</div>
        <div className="button-wrapper-info">
          <button onClick={editProductHandler}>Edit</button>
          <button id="delete-product" onClick={deleteProductHandler}>
            Delete
          </button>
          <button onClick={handleHide}>Hide</button>
        </div>
      </section>
    </>
  );
};
