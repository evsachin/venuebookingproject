const db = require("../config/db");

// Create an offer (Admin only)
exports.createOffer = (req, res) => {
  const { venue_id, title, discount_percentage, start_date, end_date } =
    req.body;

  const query = `
    INSERT INTO offers (venue_id, title, discount_percentage, start_date, end_date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [venue_id, title, discount_percentage, start_date, end_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Offer created successfully" });
    }
  );
};

// Get all active offers
exports.getAllOffers = (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  db.query(
    `SELECT o.*, v.name AS venue_name FROM offers o 
     JOIN venues v ON o.venue_id = v.id 
     WHERE end_date >= ?`,
    [today],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    }
  );
};
