import "./CreateProduct.css";
import { useAuthStore } from "../services/GlobalState";
import { useState } from "react";
import Select from "react-select";
import api from "../Api/utils.js";

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
  const [currentStatus, setCurrentStatus] = useState("");
  const [msg, setMsg] = useState("");

  const refreshList = async () => {
    let response = await api.get("api/");
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
    api
      .post(
        "api/",
        {
          title: title,
          type: type,
          price: price,
          quantity: quantity,
          description: description,
          section: selectedSection,
          location: selectedLocation,
          status: currentStatus,
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
  };

  const handleCancel = (e) => {
    e.preventDefault();
    offCreatePanel();
  };

  const options = [
    { value: "Ordered", label: "Ordered" },
    { value: "Stored", label: "Stored" },
    { value: "Transit", label: "Transit" },
    { value: "Returned", label: "Returned" },
    { value: "Damaged", label: "Damaged" },
    { value: "Sold", label: "Sold" },
  ];
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
          <select
            value={currentStatus}
            onChange={(e) => setCurrentStatus(e.target.value)}
          >
            <option value="Ordered">Ordered</option>
            <option value="Sold">Sold</option>
            <option value="Transit">Transit</option>
            <option value="Stored">Stored</option>
            <option value="Damaged">Damaged</option>
            <option value="Returned">Returned</option>
          </select>

          {/* <select id="edit-status" placeholder="status">
            <option
              value={status}
              onChange={(e) => setStatus(e.target.textContent)}
            >
              Ordered
            </option>
            <option
              value={status}
              onChange={(e) => setStatus(e.target.textContent)}
            >
              Stored
            </option>
            <option
              value={status}
              onChange={(e) => setStatus(e.target.textContent)}
            >
              Transit
            </option>
            <option
              value={status}
              onChange={(e) => setStatus(e.target.textContent)}
            >
              Returned
            </option>
            <option
              value={status}
              onClick={(e) => setStatus(e.target.textContent)}
            >
              Damaged
            </option>
            <option
              value={status}
              onChange={(e) => setStatus(e.target.textContent)}
            >
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
