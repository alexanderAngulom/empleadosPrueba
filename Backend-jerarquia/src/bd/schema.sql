-- db/schema.sql

CREATE TABLE IF NOT EXISTS employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  version INTEGER NOT NULL,
  superior_id INTEGER,
  FOREIGN KEY (superior_id) REFERENCES employees(id)
);


-- INSERT de prueba
INSERT INTO employees (name, version, superior_id) VALUES ('Alex 1', 1, NULL);
INSERT INTO employees (name, version, superior_id) VALUES ('Pedro 2', 1, 1);
INSERT INTO employees (name, version, superior_id) VALUES ('Juan 3', 1, 1);
INSERT INTO employees (name, version, superior_id) VALUES ('Julian 4', 1, 2);
INSERT INTO employees (name, version, superior_id) VALUES ('Ana 5', 1, 2);
INSERT INTO employees (name, version, superior_id) VALUES ('Sahara 6', 1, 3);
INSERT INTO employees (name, version, superior_id) VALUES ('Maria 7', 1, 3);
