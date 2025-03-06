const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        cart.items.push({ productId, quantity });
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

exports.updateCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        const item = cart.items.find(item => item.productId.toString() === req.params.id);
        
        if (item) {
            item.quantity = req.body.quantity;
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ error: "Item not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        cart.items = cart.items.filter(item => item.productId.toString() !== req.params.id);
        await cart.save();
        res.json(cart);
    } catch (err) {
        res.status(500).json({ error: "Server Error" });
    }
};
