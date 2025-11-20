///////////////////////////////////////////////////////////////////////////////////
// Importing Files
import { useState, useEffect } from "react";
import axios from "axios";
import CartContainer from "./CartContainer";
import ProductsContainer from "./ProductsContainer";
import NavBar from "./NavBar";
import ProductForm from "./ProductForm";

export default function GroceriesAppContainer() {
  //////////////////////////////////////////
  // States
  const [productList, setProductList] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  //////////////////////////////////////////
  // useEffect
  useEffect(() => {
    handleProductsDB();
  }, []);

  //////////////////////////////////////////
  // Handlers

  // Fetching data from the database
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProductList(response.data);
      setProductQuantity(
        response.data.map((product) => ({ id: product.id, quantity: 0 }))
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  // CRUD HANDLERS
  const handleCreateProduct = async (productData) => {
    try {
      await axios.post("http://localhost:5000/api/products", productData);
      await handleProductsDB();
    } catch (error) {
      console.log("Error creating product:", error.message);
    }
  };

  const handleEditProduct = (productId) => {
    const product = productList.find(p => p.id === productId);
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (productData) => {
    try {
      await axios.patch(`http://localhost:5000/api/products/${productData.id}`, productData);
      await handleProductsDB();
      setEditingProduct(null);
    } catch (error) {
      console.log("Error updating product:", error.message);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${productId}`);
        await handleProductsDB();
      } catch (error) {
        console.log("Error deleting product:", error.message);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  // Cart Handlers (keep all your existing cart handlers)
  const handleAddQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setCartList(newCartList);
    } else {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
    }
  };

  const handleRemoveQuantity = (productId, mode) => {
    if (mode === "cart") {
      const newCartList = cartList.map((product) => {
        if (product.id === productId && product.quantity > 1) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setCartList(newCartList);
    } else {
      const newProductQuantity = productQuantity.map((product) => {
        if (product.id === productId && product.quantity > 0) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      setProductQuantity(newProductQuantity);
    }
  };

  const handleAddToCart = (productId) => {
    const product = productList.find((product) => product.id === productId);
    const pQuantity = productQuantity.find((product) => product.id === productId);

    if (!pQuantity || pQuantity.quantity === 0) {
      alert(`Please select quantity for ${product.productName}`);
      return;
    }

    const newCartList = [...cartList];
    const productInCart = newCartList.find((product) => product.id === productId);

    if (productInCart) {
      productInCart.quantity += pQuantity.quantity;
    } else {
      newCartList.push({ ...product, quantity: pQuantity.quantity });
    }

    setCartList(newCartList);
  };

  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  const handleClearCart = () => {
    setCartList([]);
  };

  //////////////////////////////////////////
  // Render
  return (
    <div>
      <NavBar quantity={cartList.length} />

      <div className="GroceriesApp-Container">
        {/* LEFT SIDE - PRODUCT FORM */}
        <div className="left-sidebar">
          <ProductForm
            product={editingProduct}
            onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
            onCancel={handleCancelEdit}
            isEditing={!!editingProduct}
          />
        </div>

        {/* CENTER - PRODUCTS */}
        <div className="center-content">
          <ProductsContainer
            products={productList}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            productQuantity={productQuantity}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        </div>

        {/* RIGHT SIDE - CART */}
        <div className="right-sidebar">
          <CartContainer
            cartList={cartList}
            handleRemoveFromCart={handleRemoveFromCart}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}