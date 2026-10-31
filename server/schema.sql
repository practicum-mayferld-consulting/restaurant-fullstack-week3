-- Savoria Bistro — Database Schema
-- Run once to create all tables, then run seed.js to populate data

-- Users table: stores signup credentials
-- Passwords are stored as bcrypt hashes, never plaintext
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(255) UNIQUE NOT NULL,
  password   VARCHAR(255) NOT NULL,       -- bcrypt hash
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menu items table: replaces the hardcoded menuItems.js array
CREATE TABLE IF NOT EXISTS menu_items (
  id          SERIAL PRIMARY KEY,
  category    VARCHAR(50)  NOT NULL CHECK (category IN ('starters', 'mains', 'desserts')),
  name        VARCHAR(200) NOT NULL,
  price       NUMERIC(6,2) NOT NULL,
  description TEXT         NOT NULL,
  tags        TEXT[]       DEFAULT '{}',  -- array of strings e.g. {'Vegetarian','GF Available'}
  pairing     VARCHAR(300),
  signature   BOOLEAN      DEFAULT FALSE,
  created_at  TIMESTAMPTZ  DEFAULT NOW()
);

-- Reservations table: stores form submissions from the frontend
CREATE TABLE IF NOT EXISTS reservations (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id) ON DELETE SET NULL, -- NULL for guest bookings
  name            VARCHAR(100) NOT NULL,
  email           VARCHAR(255) NOT NULL,
  phone           VARCHAR(30)  NOT NULL,
  guests          INTEGER      NOT NULL CHECK (guests BETWEEN 1 AND 12),
  date            DATE         NOT NULL,
  time_slot       VARCHAR(20),
  seating         VARCHAR(100),
  notes           TEXT,
  created_at      TIMESTAMPTZ  DEFAULT NOW()
);

-- Session table is created automatically by connect-pg-simple at server start
-- (createTableIfMissing: true in index.js)
