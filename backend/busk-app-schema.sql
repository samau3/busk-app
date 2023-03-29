/* USERS TABLE */
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

/* BUSKERS TABLE */
CREATE TABLE buskers (
  id SERIAL PRIMARY KEY,
  userId INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
  buskerName TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT
);

/* EVENTS TABLE */
CREATE TABLE events(
  id SERIAL PRIMARY KEY,
  busker_id INTEGER NOT NULL REFERENCES buskers ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  coordinates JSON NOT NULL
);
