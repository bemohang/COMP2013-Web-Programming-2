//displays individual product with quantity controls
export default function ProductCard({
  productName,
  brand,
  image,
  price,
  productQuantity,
  handleAddToQuantity,
  handleRemoveQuantity,
  handleAddToCart,
}) {
  return (
    <div className="ProductCard">
      <img src={image} alt={productName} />
      <h3>{productName}</h3>
      <p>{brand}</p>
        <p>{price}</p>
      
      {/*Quantity controls buttons */}
      <div className="counter-container">
        <button 
          onClick={() => handleRemoveQuantity(productQuantity.id)}
        >
          -
        </button>

        {/*Display current quantity */}
        <span>{productQuantity?.purchaseQuantity}</span>
        <button 
          onClick={() => handleAddToQuantity(productQuantity.id)}
        >
          +
        </button>
      </div>
      
      {/*Add to cart button */}
      <button onClick={() => handleAddToCart(productQuantity.id)}>
        Add to Cart
      </button>
    </div>
  );
}