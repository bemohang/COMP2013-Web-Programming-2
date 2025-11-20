// Import React for component creation
import React from "react";

// Product form component with react-hook-form integration
export default function ProductForm({
  isEditing,          // Boolean to track edit mode
  formData,           // Current form data
  handleOnChange,     // Input change handler
  handleOnSubmit,     // Form submission handler
  register,           // React-hook-form register function
  handleSubmit,       // React-hook-form submit handler
  errors,             // Form validation errors
}) {
  return (
    <div className="ProductForm">
      <h3>Product Form</h3>
      {/* Form with react-hook-form validation */}
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Product Name Input */}
        <div className="form-group">
          <input
            type="text"
            name="productName"
            {
              // Conditional registration: skip validation in edit mode
              ...(isEditing
                ? {}
                : register("productName", {
                    required: "Product name is required", // Validation rule
                  }))
            }
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {/* Display validation error if exists */}
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>

        {/* Brand Input */}
        <div className="form-group">
          <input
            type="text"
            name="brand"
            {...(isEditing
              ? {}
              : register("brand", {
                  required: "Brand is required", // Validation rule
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {/* Display validation error if exists */}
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>

        {/* Image URL Input */}
        <div className="form-group">
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required", // Validation rule
                  pattern: {
                    value: /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/, // URL pattern
                    message: "Invalid URL", // Error message for invalid URL
                  },
                }))}
            value={formData.image}
            onChange={handleOnChange}
            placeholder="Image URL"
          />
          {/* Display validation error if exists */}
          {errors.image && (
            <span style={{ color: "red" }}>{errors.image.message}</span>
          )}
        </div>

        {/* Price Input */}
        <div className="form-group">
          <input
            type="text"
            name="price"
            {...(isEditing
              ? {}
              : register("price", {
                  required: "Price is required", // Validation rule
                  pattern: {
                    value: /^\$?[0-9]+(\.[0-9]{2})?$/, // Price format pattern
                    message: "Invalid price format", // Error message
                  },
                }))}
            value={formData.price}
            onChange={handleOnChange}
            placeholder="Price"
          />
          {/* Display validation error if exists */}
          {errors.price && (
            <span style={{ color: "red" }}>{errors.price.message}</span>
          )}
        </div>

        {/* Submit Button - Changes text based on mode */}
        <button type="submit" className="btn-primary">
          {isEditing ? "Update Product" : "Submit"}
        </button>
      </form>
    </div>
  );
}