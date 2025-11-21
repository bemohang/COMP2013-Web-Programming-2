// Import React for component creation
import React from "react";

// Product form component with react-hook-form integration
export default function ProductForm({
  isEditing,
  formData,
  handleOnChange,
  handleOnSubmit,
  register,
  handleSubmit,
  errors,
}) {
  return (
    <div className="ProductForm">
        <h3>Product Form</h3>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div>
          <input
            type="text"
            name="productName"
            {
              // If isEditing is true, then don't register the input fields
              ...(isEditing
                ? {}
                : register("productName", {
                    required: "Product name is required",
                    pattern: {
                      value: /^[a-zA-Z0-9\s]+$/,
                      message: "Product name should contain only alphabets and numbers",
                    },
                  }))
            }
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="brand"
            {
              // If isEditing is true, then don't register the input fields
              ...(isEditing
                ? {}
                : register("brand", {
                    required: "Brand is required",
                    pattern: {
                      value: /^[a-zA-Z0-9\s]+$/,
                      message: "Brand should contain only alphabets and numbers",
                    },
                  }))
            }
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="image"
            { // If isEditing is true, then don't register the input fields
                ...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https:\/\/[a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})(\/.*)?$/,
                    message: "Invalid URL",
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>
        <div>
          <input
            type="text"
            name="price"
            { // If isEditing is true, then don't register the input fields
                ...(isEditing
              ? {}
              : register("price", {
                  required: "Price is required",
                  pattern: {
                    value: /^\$?[0-9]+(\.[0-9]{2})?$/,
                    message: "Invalid price format",
                  },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price"
          />
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>
        <button type="submit">
          {isEditing ? "Edit" : "Submit"}
        </button>
      </form>
    </div>
  );
}