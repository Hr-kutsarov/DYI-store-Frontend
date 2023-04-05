import "./CreateProduct.css";

export const CreateProduct = () => {
  return (
    <>
      <form className="create-product">
        <label for="name">Name</label>
        <input type="text"></input>
        <label for="type">Type</label>
        <input type="text"></input>
      </form>
    </>
  );
};
