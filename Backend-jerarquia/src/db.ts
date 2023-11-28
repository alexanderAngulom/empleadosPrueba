// src/db.ts
import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jerarquia',
  password: 'admin',
  port: 5434,
});

export default pool;
