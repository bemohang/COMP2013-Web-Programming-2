import { useState } from "react";

export default function ProductForm({ 
  product, 
  onSubmit, 
  onCancel, 
  isEditing = false 
}) {
  const [formData, setFormData] = useState({
    productName: product?.productName || "",
    brand: product?.brand || "",
    image: product?.image || "",
    price: product?.price || ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a simple ID for new products
    const submitData = isEditing ? 
      formData : 
      { ...formData, id: Date.now().toString(), quantity: "1 unit" };
    
    onSubmit(submitData);
    if (!isEditing) {
      setFormData({ productName: "", brand: "", image: "", price: "" });
    }
  };

  return (
    <div className="ProductForm">
      <h3>Product Form</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {isEditing ? "Update Product" : "Add Product"}
          </button>
          {isEditing && (
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}