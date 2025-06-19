const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/", verifyToken, notificationController.createNotification);
router.get(
  "/:userId",
  verifyToken,
  notificationController.getUserNotifications
);
router.put("/:id/read", verifyToken, notificationController.markAsRead);

module.exports = router;
