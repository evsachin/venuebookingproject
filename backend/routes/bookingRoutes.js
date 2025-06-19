const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const { verifyToken } = require("../middleware/authMiddleware");

// Protected routes
router.post("/", verifyToken, bookingController.createBooking);
router.get("/:userId", verifyToken, bookingController.getBookingsByUser);

module.exports = router;
