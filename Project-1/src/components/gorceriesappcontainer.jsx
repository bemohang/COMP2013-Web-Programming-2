import React, { useState } from "react";
import NavBar from "./NavBar";
import ProductsContainer from "./productsconatiner";
import CartContainer from "./cartcontainer";
import products from "../data/products";

function GorceriesAppContainer() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    if (!product.quantity || product.quantity <= 0) return;

    const newCart = [...cart];
    let found = false;

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === product.id) {
        newCart[i].quantity = newCart[i].quantity + product.quantity;
        found = true;
        break;
      }
    }

    if (found) {
      setCart(newCart); 
    } else {
      setCart([...newCart, { ...product, quantity: product.quantity }]); 
    }
  };

  const handleQuantityChange = (productId, quantity) => {
    const newCart = [...cart];

    for (let i = 0; i < newCart.length; i++) {
      if (newCart[i].id === productId) {
        if (quantity < 1) {
          newCart[i].quantity = 1; 
        } else {
          newCart[i].quantity = quantity;
        }
        break;
      }
    }

    setCart(newCart);
  };

  const handleRemoveItem = (productId) => {
    const newCart = [];
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].id !== productId) {
        newCart.push(cart[i]);
      }
    }
    setCart(newCart);
  };

  const handleEmptyCart = () => setCart([]);

  return (
    <div>
      <NavBar cartCount={cart.length} />
      <div className="GroceriesApp-Container">
        <ProductsContainer products={products} onAddToCart={handleAddToCart} />
        <CartContainer
          cartItems={cart}
          onRemoveItem={handleRemoveItem}
          onQuantityChange={handleQuantityChange}
          onEmptyCart={handleEmptyCart}
        />
      </div>
    </div>
  );
}

export default GorceriesAppContainer;
