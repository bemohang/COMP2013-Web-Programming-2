import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  id,
  onEdit,
  onDelete
}) {
  return (
    <div className="ProductCard">
      <h3>{productName}</h3>
      <img src={image} alt={productName} />
      <h4>{brand}</h4>
      <QuantityCounter
        handleAddQuantity={handleAddQuantity}
        productQuantity={productQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
        id={id}
        mode="product"
      />
      <h3>{price}</h3>
      <button onClick={() => handleAddToCart(id)}>Add to Cart</button>
      
      {/* CRUD BUTTONS */}
      <div className="crud-buttons">
        <button 
          onClick={() => onEdit(id)} 
          className="edit-btn"
        >
          Edit
        </button>
        <button 
          onClick={() => onDelete(id)} 
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}