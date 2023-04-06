import "./CreateProduct.css";
import { useAuthStore } from "../services/GlobalState";
import { useState } from "react";
import axios from "axios";
export const CreateProduct = () => {
  // global state

  const allStores = useAuthStore((state) => state.allStores);
  const allSections = useAuthStore((state) => state.allSections);
  const offCreatePanel = useAuthStore((state) => state.offCreatePanel);
  const setProducts = useAuthStore((state) => state.setProducts);

  // local state
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [msg, setMsg] = useState("");

  const refreshList = async () => {
    let response = await axios.get("http://127.0.0.1:8000/api");
    setProducts(response.data);
    console.log(response.data);
  };
  //
  const clearForm = () => {
    setTitle("");
    setType("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setSelectedSection("Select...");
    setSelectedLocation("Select...");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/",
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
        if (response.status === 201) {
          setMsg(response.statusText + " Successfully");
          console.log("created successfully");
          clearForm();
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
    offCreatePanel();
  };

  return (
    <>
      <div className="create-products-box">
        <form>
          <h2>Create new product:</h2>
          <div className="create-msg">{msg}</div>
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
            value={selectedLocation.id}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            {allSections.map((section) => (
              <option value={section.id}>{section.name}</option>
            ))}
          </select>
          <select
            id="edit-section"
            placeholder="section"
            value={selectedSection.id}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            {allStores.map((store) => (
              <option value={store.id}>{store.name}</option>
            ))}
          </select>
          {/* <select id="edit-status" placeholder="status">
            <option value="Ordered" onChange={(e) => setStatus(e.target.value)}>
              Ordered
            </option>
            <option value="Stored" onChange={(e) => setStatus(e.target.value)}>
              Stored
            </option>
            <option value="Transit">Transit</option>
            <option
              value="Returned"
              onChange={(e) => setStatus(e.target.value)}
            >
              Returned
            </option>
            <option value={status} onClick={() => setStatus("Damaged")}>
              Damaged
            </option>
            <option value="Sold" onChange={(e) => setStatus(e.target.value)}>
              Sold
            </option>
          </select> */}
          <div className="button-box">
            <button id="edit-submit" onClick={handleSubmit}>
              Create
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
