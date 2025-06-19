-- Create the database
CREATE DATABASE IF NOT EXISTS venue_booking_app;
USE venue_booking_app;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Venues Table
CREATE TABLE IF NOT EXISTS venues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    venue_id INT NOT NULL,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Wishlist Table
CREATE TABLE IF NOT EXISTS wishlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    venue_id INT NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Offers Table
CREATE TABLE IF NOT EXISTS offers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    venue_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    discount_percentage INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (venue_id) REFERENCES venues(id) ON DELETE CASCADE
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    title VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Optional Indexes for Performance
CREATE INDEX idx_user_id_bookings ON bookings(user_id);
CREATE INDEX idx_venue_id_bookings ON bookings(venue_id);
CREATE INDEX idx_user_wishlist ON wishlist(user_id);


USE venue_booking_app;

-- Insert sample users
INSERT INTO users (name, email, password, role) VALUES
('Admin User', 'admin@example.com', 'admin123', 'admin'),
('John Doe', 'john@example.com', 'john123', 'user'),
('Jane Smith', 'jane@example.com', 'jane123', 'user');

-- Insert sample venues
INSERT INTO venues (name, location, capacity, price, description, image_url) VALUES
('Grand Palace', 'Downtown', 300, 25000.00, 'Spacious hall with central AC.', 'https://example.com/grand.jpg'),
('Ocean View Resort', 'Beachside', 150, 18000.00, 'Scenic beachside venue.', 'https://example.com/ocean.jpg'),
('City Banquet', 'Main Street', 200, 20000.00, 'Well-equipped hall in city center.', 'https://example.com/city.jpg');

-- Insert sample bookings
INSERT INTO bookings (user_id, venue_id, booking_date, start_time, end_time, total_amount, status) VALUES
(2, 1, '2025-07-10', '18:00:00', '22:00:00', 100000.00, 'confirmed'),
(3, 2, '2025-07-12', '10:00:00', '14:00:00', 72000.00, 'pending');

-- Insert sample wishlist items
INSERT INTO wishlist (user_id, venue_id) VALUES
(2, 2),
(3, 1);

-- Insert sample offers
INSERT INTO offers (venue_id, title, discount_percentage, start_date, end_date) VALUES
(1, 'Summer Discount', 10, '2025-07-01', '2025-07-31'),
(2, 'Monsoon Deal', 15, '2025-06-20', '2025-07-15');

-- Insert sample notifications
INSERT INTO notifications (user_id, title, message) VALUES
(2, 'Booking Confirmed', 'Your booking for Grand Palace is confirmed!'),
(3, 'Offer Alert', '15% off at Ocean View Resort this month!');
