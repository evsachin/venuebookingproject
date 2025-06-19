const db = require("../config/db");

// Book a venue
exports.createBooking = (req, res) => {
  const { user_id, venue_id, booking_date, start_time, end_time } = req.body;

  // Check availability
  const checkQuery = `
    SELECT * FROM bookings
    WHERE venue_id = ? AND booking_date = ? AND (
      (start_time <= ? AND end_time > ?) OR
      (start_time < ? AND end_time >= ?) OR
      (start_time >= ? AND end_time <= ?)
    )
  `;

  db.query(
    checkQuery,
    [
      venue_id,
      booking_date,
      start_time,
      start_time,
      end_time,
      end_time,
      start_time,
      end_time,
    ],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      if (results.length > 0) {
        return res
          .status(409)
          .json({ message: "Venue already booked for this slot." });
      }

      // Fetch venue price
      db.query(
        "SELECT price FROM venues WHERE id = ?",
        [venue_id],
        (err, venueResult) => {
          if (err) return res.status(500).json({ error: err.message });
          if (venueResult.length === 0)
            return res.status(404).json({ message: "Venue not found" });

          const price = venueResult[0].price;

          // Calculate duration in hours
          const start = parseInt(start_time.split(":")[0]);
          const end = parseInt(end_time.split(":")[0]);
          const duration = Math.max(end - start, 1);
          const totalAmount = price * duration;

          // Insert booking
          const insertQuery = `
          INSERT INTO bookings (user_id, venue_id, booking_date, start_time, end_time, total_amount, status)
          VALUES (?, ?, ?, ?, ?, ?, 'pending')
        `;

          db.query(
            insertQuery,
            [
              user_id,
              venue_id,
              booking_date,
              start_time,
              end_time,
              totalAmount,
            ],
            (err, result) => {
              if (err) return res.status(500).json({ error: err.message });
              res
                .status(201)
                .json({ message: "Booking created successfully", totalAmount });
            }
          );
        }
      );
    }
  );
};

// Get all bookings for a user
exports.getBookingsByUser = (req, res) => {
  const { userId } = req.params;

  const query = `
    SELECT b.*, v.name AS venue_name, v.location
    FROM bookings b
    JOIN venues v ON b.venue_id = v.id
    WHERE b.user_id = ?
    ORDER BY b.booking_date DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
