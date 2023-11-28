-- db/schema.sql

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  version INTEGER NOT NULL,
  superior_id INTEGER,
  FOREIGN KEY (superior_id) REFERENCES employees(id)
);
