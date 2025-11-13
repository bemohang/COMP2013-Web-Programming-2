
import React from 'react';
import emptyCartLogo from "../assets/cart-empty.png";
import fullCartLogo from "../assets/cart-full.png"; 

//NavBar component which diplays navigation
export default function NavBar({ username, cartItemCount }) {

  //display cart icon based on cart items
  const cartImage = cartItemCount > 0 ? fullCartLogo : emptyCartLogo;
  
  return (
    <nav className="NavBar">
      <div className="NavDiv NavUser">
        <p>Hello, {username}!</p>
      </div>
      <div className="NavDiv NavTitle">
        <h1>Grocery Store</h1>
      </div>
      <div className="NavDiv NavCart">
        <img src={cartImage} alt="Cart" className="logo" />
        
      </div>
    </nav>
  );
}