import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ProductsContainer from "./ProductsContainer";
import ProductForm from "./ProductForm";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";

// Main component
export default function GroceriesApp() {
  
  const [productData, setProductData] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  
  // State to show messages 
  const [statusMessage, setStatusMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Fetch products from server
  useEffect(() => {
    handleProductsDB();
  }, []);

  // Fetch product list from backend API
  const handleProductsDB = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProductData(response.data);
      setProductQuantity(
        response.data.map((product) => ({ id: product.id, quantity: 0 }))
      ); 
    } catch (error) {
      console.log(error.message);
    }
  };

  // Update form state when input changes
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission for add&edit product
  const handleOnSubmit = async (data) => {
    try {
      if (isEditing) {
        await handleUpdate(formData.id); 
      } else {
        const productWithId = {
          ...formData,
          id: Date.now().toString(),
        };
        await axios.post("http://localhost:5000/api/products", productWithId);
        setStatusMessage(`${formData.productName} added with ID: ${productWithId.id}`);
        setFormData({ productName: "", brand: "", image: "", price: "" }); 
        await handleProductsDB();
      }
    } catch (error) {
      console.log("Form error:", error.message);
    }
  };

  // Load product data into form for editing
  const handleEdit = async (product) => {
    setIsEditing(true);
    setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      id: product.id
    });
  };

  // Update product data in backend
  const handleUpdate = async (id) => {
    try {
      const updateData = {
        productName: formData.productName,
        brand: formData.brand,
        image: formData.image,
        price: formData.price,
      };
      await axios.patch(`http://localhost:5000/api/products/${id}`, updateData);
      setStatusMessage(`${formData.productName} edited with ID: ${id}`);
      setIsEditing(false);
      setFormData({ productName: "", brand: "", image: "", price: "" }); 
      await handleProductsDB();
    } catch (error) {
      console.log("Update error:", error.message);
    }
  };

  // Delete product from backend
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        setStatusMessage(`${formData.productName} deleted with ID: ${id}`);
        await handleProductsDB();
      } catch (error) {
        console.log("Delete error:", error.message);
      }
    }
  };

  // Increase quantity of product 
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

  // Decrease quantity of product 
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

  // Add selected quantity of product 
  const handleAddToCart = (productId) => {
    const product = productData.find((product) => product.id === productId);
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

  // Remove product from cart
  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  // Clear all items from cart
  const handleClearCart = () => {
    setCartList([]);
  };

  return (
    <div>
      <NavBar quantity={cartList.length} /> {/* Display total cart items */}
      <div className="GroceriesApp-Container">
        <div className="left-sidebar">
          <ProductForm
            isEditing={isEditing}
            formData={formData}
            handleOnChange={handleOnChange}
            handleOnSubmit={handleOnSubmit}
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
          />
          {/* Display status messages like "added,edited or deleted" */}
          {statusMessage && (
            <p style={{ color: "green", marginTop: "10px", textAlign: "center" }}>
              {statusMessage}
            </p>
          )}
        </div>
        
        <div className="center-content">
          <ProductsContainer
            productData={productData}
            productQuantity={productQuantity}
            handleAddQuantity={handleAddQuantity}
            handleRemoveQuantity={handleRemoveQuantity}
            handleAddToCart={handleAddToCart}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>
        
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
