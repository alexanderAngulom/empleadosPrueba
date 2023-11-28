// src/models/employeeModel.ts
import { Pool, PoolClient } from 'pg';

export interface Employee {
  id: number;
  name: string;
  version: number;
  superior_id: number | null; // Relación jerárquica con el superior
}

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'jerarquia',
  password: 'admin',
  port: 5434,
});

export const getAllEmployeesFromDB = async (): Promise<Employee[]> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM employees');
    return result.rows;
  } finally {
    client.release();
  }
};

export const getEmployeeByIdFromDB = async (id: number): Promise<Employee | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM employees WHERE id = $1', [id]);
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};

export const createEmployeeInDB = async (employee: Employee): Promise<Employee> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      'INSERT INTO employees (name, version, superior_id) VALUES ($1, $2, $3) RETURNING *',
      [employee.name, employee.version, employee.superior_id]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

export const updateEmployeeInDB = async (id: number, newSuperiorId: number, newVersion: number): Promise<Employee | null> => {
  const client: PoolClient = await pool.connect();
  try {
    const result = await client.query(
      'UPDATE employees SET version = $1, superior_id = $2 WHERE id = $3 RETURNING *',
      [newVersion, newSuperiorId, id]
    );
    return result.rows[0] || null;
  } finally {
    client.release();
  }
};