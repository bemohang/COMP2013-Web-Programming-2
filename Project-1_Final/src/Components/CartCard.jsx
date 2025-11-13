import React from 'react';

//CartCard component -- displayes individual cart
export default function CartCard({
  id,
  product,
  quantity,
  currentPrice,
  image,
  handleRemoveFromCart,
   onUpdateQuantity, 
}) {

  //calculate total price for item
  const totalPrice = quantity * currentPrice;

  return (
    <div className="CartCard">
      <div className="CartCardInfo">
        <img
          src={image}
          alt={product}
          style={{ width: "60px", height: "50px" }}
        />
        <h4>{product}</h4>
        <p>${currentPrice} </p>

    {/*Controls quantity add or subtract */}
        <div className="quantity-controls">
          <button onClick={() => onUpdateQuantity(id, quantity - 1)}>-</button>
          <span>{quantity}</span>
          <button onClick={() => onUpdateQuantity(id, quantity + 1)}>+</button>
        </div>
        <p>Total: ${totalPrice}</p>
      </div>

{/*Remove item from cart */}
      <button
        className="RemoveButton"
        onClick={() => handleRemoveFromCart({ id, product, quantity, currentPrice })}
      >
        Remove
      </button>
    </div>
  );
}