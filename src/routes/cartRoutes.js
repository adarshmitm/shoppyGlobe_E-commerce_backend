const express = require("express");
const { addToCart, updateCart, removeFromCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, addToCart);
router.put("/:id", authMiddleware, updateCart);
router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;
