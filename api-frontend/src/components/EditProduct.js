import { useAuthStore } from "../services/GlobalState";
import "./EditProduct.css";
import { useState } from "react";
import api from "../Api/utils.js";

export const EditProduct = () => {
  // global state
  const allStores = useAuthStore((state) => state.allStores);
  const allSections = useAuthStore((state) => state.allSections);
  const productDetails = useAuthStore((state) => state.productDetails);

  const offEditPanel = useAuthStore((state) => state.offEditPanel);
  const offDetailsPanel = useAuthStore((state) => state.offDetailsPanel);
  const setProducts = useAuthStore((state) => state.setProducts);
  // local state
  const [title, setTitle] = useState(productDetails.title);
  const [type, setType] = useState(productDetails.type);
  const [price, setPrice] = useState(productDetails.price);
  const [quantity, setQuantity] = useState(productDetails.quantity);
  const [description, setDescription] = useState(productDetails.description);
  const [selectedSection, setSelectedSection] = useState(
    productDetails.section
  );
  const [selectedLocation, setSelectedLocation] = useState(
    productDetails.location
  );
  const [selectedStatus, setSelectedStatus] = useState(productDetails.status);
  const [msg, setMsg] = useState("");

  const refreshList = async () => {
    let response = await api.get("api/");
    setProducts(response.data);
    console.log(response.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // server call
    api
      .put(
        `api/${productDetails.id}/`,
        {
          title: title,
          type: type,
          price: price,
          quantity: quantity,
          description: description,
          section: selectedSection,
          location: selectedLocation,
        },
        { headers: {} }
      )
      .then(function (response) {
        if (response.status === 200) {
          setMsg(response.statusText + " Successfully");
          console.log("Edited successfully");
          offEditPanel();
          offDetailsPanel();
          refreshList();
        }
      })
      .catch(function (error) {
        setMsg(`Whoops, wrong data. ${error.message}`);
      });

    setMsg("");
  };

  const handleCancel = (e) => {
    e.preventDefault();
    offEditPanel();
  };
  return (
    <>
      <div className="edit-products-box">
        <form>
          <h2>Edit product ID:{productDetails.id}</h2>
          <h6>{msg}</h6>
          <input
            id="edit-title"
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <input
            id="edit-type"
            placeholder="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          ></input>

          <input
            id="edit-price"
            type="text"
            placeholder="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          ></input>
          <input
            id="edit-quantity"
            type="text"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></input>
          <input
            id="edit-description"
            type="textarea"
            placeholder="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></input>
          <select
            id="edit-location"
            placeholder="location"
            value="Select Location"
          >
            {allSections.map((section) => (
              <option
                value={section.id}
                onChange={(e) => setSelectedSection(e.target.value)}
              >
                {section.name}
              </option>
            ))}
          </select>
          <select
            id="edit-section"
            placeholder="section"
            value="Select Section"
          >
            {allStores.map((store) => (
              <option
                value={store.id}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                {store.name}
              </option>
            ))}
          </select>
          <select
            id="edit-status"
            placeholder="status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="Sold">Sold</option>
            <option value="Ordered">Ordered</option>
          </select>
          <div className="button-box">
            <button id="edit-submit" onClick={handleSubmit}>
              Edit
            </button>
            <button id="edit-cancel" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
