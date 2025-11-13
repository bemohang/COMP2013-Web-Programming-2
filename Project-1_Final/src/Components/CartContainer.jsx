
import CartCard from "./CartCard";
import React from 'react';

//display and manage Shopping Cart
export default function CartContainer({ cart, handleRemoveFromCart, onEmptyCart, onCheckout, onUpdateQuantity, }) {
  //Calculate Total price
  const totalPrice = cart.reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0);
  
  return (
    <div className="CartContainer">
      <h2>Cart item: {cart.length} </h2>
      
      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartCard
              key={item.id}
              {...item}
              image={item.image}
              handleRemoveFromCart={handleRemoveFromCart}
                onUpdateQuantity={onUpdateQuantity}
            />
          ))}
          
          {/* Cart action buttons */}
          <div className="CartListBtns">
            <button onClick={onEmptyCart}>
              Empty Cart
            </button>
            <button onClick={onCheckout}>
              Checkout - ${totalPrice}
            </button>
          </div>
        </>
      )}
    </div>
  );
}