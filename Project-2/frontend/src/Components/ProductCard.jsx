import QuantityCounter from "./QuantityCounter";

export default function ProductCard({
  product,
  productQuantity,
  handleAddQuantity,
  handleRemoveQuantity,
  handleAddToCart,
  onEdit,    
  onDelete,  
}) {
  return (
    <div className="ProductCard">
      <h3>{product.productName}</h3>
      <img src={product.image} alt={product.productName} />
      <h4>{product.brand}</h4>
      <QuantityCounter
        id={product.id}
        mode="product"
        productQuantity={productQuantity}
        handleAddQuantity={handleAddQuantity}
        handleRemoveQuantity={handleRemoveQuantity}
      />
      <h3>{product.price}</h3>
      <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
      <div className="crud-buttons">
        <button onClick={() => onEdit(product)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(product.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}