const express = require("express");
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    deleteProduct 
} = require("../controllers/productController");

const router = express.Router();

// Product Routes
router.get("/", getProducts);        // Get all products
router.get("/:id", getProductById);   // Get a single product by ID
router.post("/", createProduct);      // Create a new product
router.put("/:id", updateProduct);    // Update a product
router.delete("/:id", deleteProduct); // Delete a product

module.exports = router;
