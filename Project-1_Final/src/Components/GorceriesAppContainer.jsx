import { useState } from "react";
import products from '../data/products';
import ProductsContainer from './ProductsContainer';
import CartContainer from './CartContainer';
import NavBar from './NavBar';

//Main container component for grocery store application
export default function GroceriesAppContainer() {
    const [productQuantity, setProductQuantity] = useState(
        products.map((prod) => {
          const itemPrice = Number(prod.price.replace("$", "").replace(",", ""));
            return {
                id: prod.id,
                purchaseQuantity: 0,
                priceOptions: [itemPrice],
                currentPrice: itemPrice,
            };
        })
    );

//state for shopping cart items
const [cart, setCart] = useState([]);

//Increase quantity 
const handleAddToQuantity = (productId) => {
    const newProductQuantity = new Array(productQuantity.length);
    
    for (let i = 0; i < productQuantity.length; i++) {
        const prod = productQuantity[i];
        if (prod.id === productId) {
            newProductQuantity[i] = { 
                ...prod, 
                purchaseQuantity: prod.purchaseQuantity + 1 
            };
        } else {
            newProductQuantity[i] = prod;
        }
    }
    setProductQuantity(newProductQuantity);
};

//Decrease quantity for 
const handleRemoveQuantity = (productId) => {
    const newProductQuantity = new Array(productQuantity.length);
    
    for (let i = 0; i < productQuantity.length; i++) {
        const prod = productQuantity[i];
        if (prod.id === productId && prod.purchaseQuantity > 0) {
            newProductQuantity[i] = { 
                ...prod, 
                purchaseQuantity: prod.purchaseQuantity - 1 
            };
        } else {
            newProductQuantity[i] = prod;
        }
    }
    setProductQuantity(newProductQuantity);
};
    //Add product to cart with selected quantity
    const handleAddToCart = (productId) => {
        const productToAdd = productQuantity.find(prod => prod.id === productId);
        if (productToAdd && productToAdd.purchaseQuantity > 0) {
            const productData = products.find(prod => prod.id === productId);
            setCart(prevCart => {
                const existingItem = prevCart.find(item => item.id === productId);
                if (existingItem) {
                    return prevCart.map(item =>
                        item.id === productId
                            ? { ...item, quantity: item.quantity + productToAdd.purchaseQuantity }
                            : item
                    );
                } else {
                    //Add new item to cart
                    return [...prevCart, {
                        id: productId,
                        product: productData.productName,
                        quantity: productToAdd.purchaseQuantity,
                        currentPrice: productToAdd.currentPrice,
                        image: productData.image,
                    }];
                }
            });
            
            //Reset quantity after adding to cart
            const resetQuantity = productQuantity.map((prod) => {
                if (prod.id === productId) {
                    return { ...prod, purchaseQuantity: 0 };
                }
                return prod;
            });
            setProductQuantity(resetQuantity);
        } else {
            alert("Please set quantity greater than 0 before adding to cart");
        }
    };

    //Remove item from cart
    const handleRemoveFromCart = (itemToRemove) => {
    const newCart = cart.filter(item => item.id !== itemToRemove.id);
    setCart(newCart);
};

    //calculate total items
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const handleEmptyCart = () => {
  setCart([]);
};

 // Handle checkout process
    const handleCheckout = () => {
        const total = cart.reduce((sum, item) => sum + (item.quantity * item.currentPrice), 0);
        alert(`Thank you for your purchase! \n Your order total is $${total}`);
        setCart([]);
    };
    
//Update quantity ot item
const handleUpdateQuantity = (productId, newQuantity) => {
  if (newQuantity < 1) {
    //remove item if quantity is 0
    handleRemoveFromCart({ id: productId });
  } else {
    //update quantity
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  }
};

    return (
        <div>
            <NavBar username="username" cartItemCount={totalCartItems} />
            <div className="GroceriesApp-Container">
                <ProductsContainer
                    data={products}
                    productQuantity={productQuantity}
                    handleAddToQuantity={handleAddToQuantity}
                    handleRemoveQuantity={handleRemoveQuantity}
                    handleAddToCart={handleAddToCart}
                />
                <CartContainer
                    cart={cart}
                    handleRemoveFromCart={handleRemoveFromCart}
                    onEmptyCart={handleEmptyCart}
                    onCheckout={handleCheckout}
                    onUpdateQuantity={handleUpdateQuantity}
                />
            </div>
        </div>
    );
}