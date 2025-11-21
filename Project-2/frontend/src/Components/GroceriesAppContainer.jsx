//importing files
import axios from "axios";
import { useEffect, useState } from "react";
import ProductsContainer from "./ProductsContainer";
import ProductForm from "./ProductForm";
import CartContainer from "./CartContainer";
import NavBar from "./NavBar";
import { useForm } from "react-hook-form"; 

export default function GroceriesApp() {
  // States
  const [productData, setProductData] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    brand: "",
    image: "",
    price: "",
  });
  const [postResponse, setPostResponse] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  //////////////////////////////////////////
  // useEffect
  useEffect(() => {
    handleProductsDB();
  }, []);
  //////////////////////////////////////////
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  //////////////////////////////////////////
  // Handlers
  // Fetching data from the database
  const handleProductsDB = async () => {
    try {
const response = await axios.get("http://localhost:3000/products");
setProductData(response.data);

 setProductQuantity(response.data.map((p) => ({ id: p._id, quantity: 0 })));
}  catch (error) {
      console.log(error.message);
    }
  };

  // Handling form data
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling form submission
const handleOnSubmit = async (e) => {
  e.preventDefault;
  try {
    if (isEditing) {
      // If isEditing is true, then update the product
      try {
        await handleUpdate(formData._id);
        await setIsEditing(false); 
        await setFormData({
          productName: "",
          brand: "",
          image: "",
          price: "",
        });
      } catch (error) {
        console.log(error.message);
      }
    } else {
      // If isEditing is false, then add the product
      await axios
        .post("http://localhost:3000/add-product", formData)
        .then((response) => {
          setPostResponse(response.data.message);
        });
      setFormData({ productName: "", brand: "", image: "", price: "" });

      const res = await axios.get("http://localhost:3000/products"); 
      setProductData(res.data); 
      setProductQuantity(res.data.map((p) => ({ id: p._id, quantity: 0 })));
    }
  } catch (error) {
    console.log(error.message);
  }
};

  // Handling edit product
  const handleEdit = async (product) => {
    setIsEditing(true);
    setFormData({
      productName: product.productName,
      brand: product.brand,
      image: product.image,
      price: product.price,
      _id: product._id,
    });
  };

  // Handling update product in the database by id
  const handleUpdate = async (id) => {
    try {
      await axios
        .patch(`http://localhost:3000/products/${id}`, formData)
        .then((response) => {
          setPostResponse(`${formData.productName} edited with ID: ${id}`);
        });
      await handleProductsDB();
    } catch (error) {
      console.log(error.message);
    }
  };

// Handling delete product from the database by id
const handleDelete = async (id) => {
  try {
    const productToDelete = productData.find((p) => p._id === id);
    await axios
      .delete(`http://localhost:3000/products/${id}`)
      .then((response) => {
       setPostResponse(`${productToDelete.productName} deleted with ID: ${id}`);
      });
        setProductData(productData.filter((p) => p._id !== id));
        setProductQuantity(productQuantity.filter((p) => p.id !== id));

        setPostResponse(`${productToDelete.productName} deleted with ID: ${id}`);
       } catch (error) {
    console.log(error.message);
  }
};

  // Handling add quantity to product or cart
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

  // Handling remove quantity from product or cart
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
// Use productData for products
const product = productData.find((p) => p._id === productId);

// Use productQuantity for quantity
const pQuantity = productQuantity.find((p) => p.id === productId);

const newCartList = [...cartList];
const productInCart = newCartList.find((p) => p.id === productId);

if (productInCart) {
productInCart.quantity += pQuantity.quantity;
} else if (!pQuantity || pQuantity.quantity === 0) {
alert(`Please select quantity for ${product.productName}`);
} else {
newCartList.push({ ...product, quantity: pQuantity.quantity, id: product._id });
}

setCartList(newCartList);
};

  // Handling remove product from cart
  const handleRemoveFromCart = (productId) => {
    const newCartList = cartList.filter((product) => product.id !== productId);
    setCartList(newCartList);
  };

  // Handling clear cart
  const handleClearCart = () => {
    setCartList([]);
  };
  //////////////////////////////////////////
  // Render

  return (
    <div>
      <NavBar quantity={cartList.length} />
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
          <p style={{ color: "green" }}>{postResponse}</p>
        </div>
        
        <div className="center-content">
          <ProductsContainer
            products={productData}
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