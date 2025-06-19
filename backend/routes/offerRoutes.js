const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offerController");
const { verifyToken, isAdmin } = require("../middleware/authMiddleware");

router.post("/", verifyToken, isAdmin, offerController.createOffer);
router.get("/", offerController.getAllOffers);

module.exports = router;
