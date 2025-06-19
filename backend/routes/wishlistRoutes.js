const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protected routes
router.post("/", verifyToken, wishlistController.addToWishlist);
router.get("/:userId", verifyToken, wishlistController.getWishlistByUser);
router.delete("/:id", verifyToken, wishlistController.removeFromWishlist);

module.exports = router;
