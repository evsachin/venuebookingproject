const db = require("../config/db");

// Get all venues (with optional filtering by location or price)
exports.getVenues = (req, res) => {
  const { location, sortByPrice } = req.query;
  let query = "SELECT * FROM venues";
  const filters = [];

  if (location) {
    filters.push(`location = ${db.escape(location)}`);
  }

  if (filters.length > 0) {
    query += " WHERE " + filters.join(" AND ");
  }

  if (sortByPrice === "asc") query += " ORDER BY price ASC";
  else if (sortByPrice === "desc") query += " ORDER BY price DESC";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Add a venue (admin only)
exports.createVenue = (req, res) => {
  const { name, location, capacity, price, description, image_url } = req.body;

  db.query(
    `INSERT INTO venues (name, location, capacity, price, description, image_url) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, location, capacity, price, description, image_url],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Venue added successfully" });
    }
  );
};

// Get a specific venue
exports.getVenueById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM venues WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Venue not found" });
    res.json(results[0]);
  });
};

// Update a venue (admin only)
exports.updateVenue = (req, res) => {
  const { id } = req.params;
  const { name, location, capacity, price, description, image_url } = req.body;

  db.query(
    `UPDATE venues SET name=?, location=?, capacity=?, price=?, description=?, image_url=? WHERE id=?`,
    [name, location, capacity, price, description, image_url, id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Venue updated successfully" });
    }
  );
};

// Delete a venue (admin only)
exports.deleteVenue = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM venues WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Venue deleted successfully" });
  });
};
