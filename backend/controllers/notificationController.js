const db = require("../config/db");

// Send notification to a user
exports.createNotification = (req, res) => {
  const { user_id, title, message } = req.body;

  db.query(
    `INSERT INTO notifications (user_id, title, message) VALUES (?, ?, ?)`,
    [user_id, title, message],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Notification sent" });
    }
  );
};

// Get notifications for a user
exports.getUserNotifications = (req, res) => {
  const { userId } = req.params;

  db.query(
    `SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC`,
    [userId],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};

// Mark notification as read
exports.markAsRead = (req, res) => {
  const { id } = req.params;

  db.query(
    `UPDATE notifications SET is_read = 1 WHERE id = ?`,
    [id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Notification marked as read" });
    }
  );
};
