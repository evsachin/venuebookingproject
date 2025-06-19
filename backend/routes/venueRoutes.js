const express = require("express");
const router = express.Router();
const venueController = require("../controllers/venueController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

// Public
router.get("/", venueController.getVenues);
router.get("/:id", venueController.getVenueById);

// Admin-only
router.post("/", verifyToken, isAdmin, venueController.createVenue);
router.put("/:id", verifyToken, isAdmin, venueController.updateVenue);
router.delete("/:id", verifyToken, isAdmin, venueController.deleteVenue);

module.exports = router;
