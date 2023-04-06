import { useAuthStore } from "../services/GlobalState";
import "./ProductDetails.css";
import axios from "axios";

export const ProductDetails = () => {
  let productDetails = useAuthStore((state) => state.productDetails);
  let offDetailsPanel = useAuthStore((state) => state.offDetailsPanel);
  let onEditPanel = useAuthStore((state) => state.onEditPanel);
  let setProducts = useAuthStore((state) => state.setProducts);

  let refreshList = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api/");
    setProducts(response.data);
    console.log(response.data);
  };

  const editProductHandler = () => {
    onEditPanel();
    offDetailsPanel();
  };
  const deleteProductHandler = async () => {
    console.log(productDetails.id);
    const ID = productDetails.id;
    const baseUrl = "http://127.0.0.1:8000/api/";
    const response = await fetch(baseUrl + ID, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonData = await response.json();
    console.log(jsonData);

    offDetailsPanel();
    setProducts = refreshList();
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
        <p>
          Price per unit:
          {(productDetails.price / productDetails.quantity).toFixed(2)}
        </p>
        <p>Quantity: {productDetails.quantity}</p>
        <p>{productDetails.description}</p>
        <p>{productDetails.status}</p>
        {productDetails.is_featured ? <p>FEATURED</p> : <p>Not featured</p>}
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
