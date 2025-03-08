const Product = require("../models/productModel");

// @desc Fetch all products
// @route GET /api/products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc Fetch a single product by ID
// @route GET /api/products/:id
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: "Product not found" });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc Create a new product
// @route POST /api/products
exports.createProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;

        if (!name || !price || !description || !stock) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newProduct = new Product({ name, price, description, stock });
        await newProduct.save();
        
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc Update a product by ID
// @route PUT /api/products/:id
exports.updateProduct = async (req, res) => {
    try {
        const { name, price, description, stock } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, description, stock },
            { new: true, runValidators: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        const product = await Product.findById(req.params.id);

        res.json(product);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

// @desc Delete a product by ID
// @route DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

