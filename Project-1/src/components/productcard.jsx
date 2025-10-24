import React, { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => setQuantity(quantity + 1);

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      onAddToCart({ ...product, quantity });
      setQuantity(0);
    } else {
      alert('Please add quantity of the item before adding to cart.');
    }
  };

  return (
    <div className="ProductCard">
      <img src={product.image} alt={product.productName} />
      <h3>{product.productName}</h3>
      <p>{product.brand}</p>

      <div className="ProductQuantityDiv">
        <button className="QuantityBtn" onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button className="QuantityBtn" onClick={increaseQuantity}>+</button>
      </div>

      <p>{product.price}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;
