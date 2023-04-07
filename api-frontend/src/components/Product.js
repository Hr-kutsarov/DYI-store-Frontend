import { useAuthStore } from "../services/GlobalState";
import "./Product.css";
import api from "../Api/utils.js";

export const Product = ({
  id,
  status,
  description,
  location,
  price,
  quantity,
  title,
  section,
}) => {
  const allSections = useAuthStore((state) => state.allStores);
  const allLocations = useAuthStore((state) => state.allSections);
  const setProductDetails = useAuthStore((state) => state.setProductDetails);
  const offEditPanel = useAuthStore((state) => state.offEditPanel);
  const onDetailsPanel = useAuthStore((state) => state.onDetailsPanel);
  const offDetailsPanel = useAuthStore((state) => state.onDetailsPanel);
  const onCreatePanel = useAuthStore((state) => state.onCreatePanel);
  let setProducts = useAuthStore((state) => state.setProducts);

  let refreshList = async () => {
    let response = await api.get("api/");
    setProducts(response.data);
  };
  const sectionString = (id) => {
    const filtered = allSections.filter((obj) => obj.id === id);
    return filtered[0]["name"];
  };

  const locationString = (id) => {
    const filtered = allLocations.filter((obj) => obj.id === id);
    return filtered[0]["name"];
  };
  const handleAddProduct = () => {
    onCreatePanel();
    offEditPanel();
    offDetailsPanel();
  };
  const handleInfoProduct = async () => {
    const response = await api.get(`api/${id}/`);
    setProductDetails(response.data);
    onDetailsPanel();
    refreshList();
  };

  let pricePerUnit = (price / quantity).toFixed(2);
  return (
    <li className="product-list" key={id}>
      <span id="actions-product-list">
        <button onClick={handleAddProduct}>new</button>
        <button onClick={handleInfoProduct}>info</button>
      </span>
      <span>{title}</span>
      <span>{sectionString(section)}</span>

      <span>{pricePerUnit}</span>
      <span>{status}</span>
      <span>
        Q:
        {quantity}
      </span>
      <span>{locationString(location)}</span>
    </li>
  );
};
