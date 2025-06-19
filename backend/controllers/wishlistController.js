const db = require("../config/db");

// Add a venue to wishlist
exports.addToWishlist = (req, res) => {
  const { user_id, venue_id } = req.body;

  const query = `INSERT INTO wishlist (user_id, venue_id) VALUES (?, ?)`;

  db.query(query, [user_id, venue_id], (err, result) => {
    if (err) {
      if (err.code === "ER_DUP_ENTRY") {
        return res.status(409).json({ message: "Already in wishlist" });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: "Venue added to wishlist" });
  });
};

// Get all wishlist venues for a user
exports.getWishlistByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT w.id, v.*
    FROM wishlist w
    JOIN venues v ON w.venue_id = v.id
    WHERE w.user_id = ?
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Remove a venue from wishlist
exports.removeFromWishlist = (req, res) => {
  const { id } = req.params;

  db.query(`DELETE FROM wishlist WHERE id = ?`, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Venue removed from wishlist" });
  });
};
