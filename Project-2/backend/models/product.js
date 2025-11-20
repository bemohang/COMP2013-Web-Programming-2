// Initialize mongoose
const mongoose = require("mongoose");

// Define the schema for the product model
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  }
});

// Create the model for the product schema
const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;