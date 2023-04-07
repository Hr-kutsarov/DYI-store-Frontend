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
  const toggledProductDetailsPanel = useAuthStore(
    (state) => state.toggledProductDetailsPanel
  );
  const onDetailsPanel = useAuthStore((state) => state.onDetailsPanel);
  const offDetailsPanel = useAuthStore((state) => state.offDetailsPanel);
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

  const handleInfoProduct = async () => {
    const response = await api.get(`api/${id}/`);
    setProductDetails(response.data);
    onDetailsPanel();
    refreshList();
  };

  let pricePerUnit = (price / quantity).toFixed(2);
  return (
    <li className="product-list" key={id}>
      <div
        className="property"
        id="actions-product-list"
        onClick={handleInfoProduct}
      >
        <button id="show-info-btn" className="round-btn">
          info
        </button>
      </div>
      <div className="property">{title}</div>
      <div className="property">{sectionString(section)}</div>

      <div className="property">{pricePerUnit}</div>
      <div className="property">{status}</div>
      <div className="property">
        Q:
        {quantity}
      </div>
      <div className="property">{locationString(location)}</div>
    </li>
  );
};
