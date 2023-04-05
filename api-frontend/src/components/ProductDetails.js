import { useAuthStore } from "../services/GlobalState";
import "./ProductDetails.css";

export const ProductDetails = () => {
  const productDetails = useAuthStore((state) => state.productDetails);
  const offProductDetailsPanel = useAuthStore(
    (state) => state.offProductDetailsPanel
  );

  const editProductHandler = () => {
    console.log(productDetails.id);
  };
  const deleteProductHandler = () => {
    console.log(productDetails.id);
  };
  const handleHide = () => {
    offProductDetailsPanel();
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
          Price per unit:{" "}
          {(productDetails.price / productDetails.quantity).toFixed(2)}
        </p>
        <p>Quantity: {productDetails.quantity}</p>
        <p>{productDetails.description}</p>
        <p>{productDetails.status}</p>
        {productDetails.is_featured ? <p>FEATURED</p> : <p>Not featured</p>}
        <div className="button-wrapper-info">
          <button onClick={editProductHandler}>Edit</button>
          <button onClick={deleteProductHandler}>Delete</button>
          <button onClick={handleHide}>Hide</button>
        </div>
      </section>
    </>
  );
};
