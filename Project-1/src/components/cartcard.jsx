import React from 'react';

function CartCard({ item, onRemove, onQuantityChange }) {
  const handleRemove = () => onRemove(item.id);

  const itemPrice = Number(item.price.replace("$", "").replace(",", ""));
  const itemTotal = (itemPrice * item.quantity);

  return (
    <div className="CartCard">
      <div className="CartCardInfo">
        <img src={item.image} alt={item.productName} />
        <h4>{item.productName}</h4>
        <p className="price">${itemPrice.toFixed(2)}</p>

        <div className="cart-item-quantity">
          <button
            className="QuantityBtn"
            onClick={() => onQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="QuantityBtn"
            onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          > 
            +
          </button>
        </div>
      </div>

      <div className="CartCardActions">
        <div className="CartCardTotal">
          <span className="total-label">Total:</span>
          <span className="total-amount">${itemTotal}</span>
        </div>

        <button className="RemoveButton" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartCard;
