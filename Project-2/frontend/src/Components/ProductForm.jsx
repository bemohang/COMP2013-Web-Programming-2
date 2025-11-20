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
        <div className="form-group">
          <input
            type="text"
            name="productName"
            {...(isEditing
              ? {}
              : register("productName", {
                  required: "Product name is required",
                }))}
            value={formData.productName}
            onChange={handleOnChange}
            placeholder="Product Name"
          />
          {errors.productName && (
            <span style={{ color: "red" }}>{errors.productName.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="brand"
            {...(isEditing
              ? {}
              : register("brand", {
                  required: "Brand is required",
                }))}
            value={formData.brand}
            onChange={handleOnChange}
            placeholder="Brand"
          />
          {errors.brand && (
            <span style={{ color: "red" }}>{errors.brand.message}</span>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="image"
            {...(isEditing
              ? {}
              : register("image", {
                  required: "Image URL is required",
                  pattern: {
                    value: /^https?:\/\/[^\s$.?#].[^\s]*$/,
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

        <div className="form-group">
          <input
            type="text"
            name="price"
            {...(isEditing
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

        <button type="submit" className="btn-primary">
          {isEditing ? "Update Product" : "Submit"}
        </button>
      </form>
    </div>
  );
}