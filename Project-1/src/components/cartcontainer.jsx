import React from 'react';
import CartCard from './cartcard';

function CartContainer({ cartItems, onRemoveItem, onQuantityChange, onEmptyCart }) {
  const totalAmount = cartItems.reduce((total, item) => {
    const itemPrice = Number(item.price.replace("$", "").replace(",", "")) || 0;
    return total + itemPrice * item.quantity;
  }, 0);

  return (
    <div className="CartContainer">
      <h3>Cart items: {cartItems.length}</h3>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartCard
              key={item.id}
              item={item}
              onRemove={onRemoveItem}
              onQuantityChange={onQuantityChange}
            />
          ))}

          <div className="CartListBtns">
            <button className="EmptyCartButton" onClick={onEmptyCart}>Empty Cart</button>
            <button id="CheckoutButton">Checkout: ${totalAmount.toFixed(2)}</button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartContainer;
