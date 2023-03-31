export const Product = (id, title, quantity, price, status) => {
  return (
    <ul>
      <li>{id}</li>
      <li>{title}</li>
      <li>{status}</li>
      <li>{price}</li>
      <li>{quantity}</li>
    </ul>
  );
};
