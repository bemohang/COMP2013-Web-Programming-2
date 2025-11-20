// Initiate the server and connect to the database
const express = require("express");
const server = express();
const port = 5000;
const { request, response } = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const { DB_URI } = process.env;
const Product = require("./models/product");

//Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());

// Connect to the database
mongoose
  .connect(DB_URI)
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to the database", error.message);
  });

// Routes
server.get("/", (request, response) => {
  response.send("Project 2 - Live");
});

server.get("/api/products", async (request, response) => {
  try {
    const products = await Product.find();
    response.send(products);
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
});

server.post("/api/products", async (request, response) => {
  const { id, productName, brand, image, price, quantity } = request.body;

  const newProduct = new Product({
    id,
    productName,
    brand,
    image,
    price,
    quantity
  });

  try {
    await newProduct.save();
    response.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    response.status(400).json({ message: error.message });
  }
});

server.delete("/api/products/:id", async (request, response) => {
  const { id } = request.params;

  try {
    await Product.findOneAndDelete({ id: id });
    response.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});

server.patch("/api/products/:id", async (request, response) => {
  const { id } = request.params;
  const { productName, brand, image, price, quantity } = request.body;

  try {
    await Product.findOneAndUpdate(
      { id: id },
      {
        productName,
        brand,
        image,
        price,
        quantity
      }
    );
    response.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
});