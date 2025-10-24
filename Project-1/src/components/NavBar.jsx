import React from 'react';
import cartFull from '../assets/cart-full.png';
import cartEmpty from '../assets/cart-empty.png';

function NavBar({ cartCount }) {
  return (
    <div className="NavBar">
      <div className="NavUser">Hello, username</div>
      <div className="NavTitle">Groceries Site</div>
      <div className="NavCart">
        <img src={cartCount > 0 ? cartFull : cartEmpty} alt="Cart" />
      </div>
    </div>
  );
}

export default NavBar;
