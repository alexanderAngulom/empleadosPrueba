// src/routes/employeeRoutes.ts
/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Obtener todos los empleados
 *     description: Obtener la lista completa de empleados.
 *     responses:
 *       200:
 *         description: Éxito, devuelve la lista de empleados.
 *       500:
 *         description: Error del servidor.
 */
import { Router } from 'express';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee } from '../controllers/employeeController';

export const employeeRoutes = Router();

// Obtener todos los empleados
employeeRoutes.get('/employees', getAllEmployees);

/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Obtener un empleado por ID
 *     description: Obtener un empleado específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Éxito, devuelve el empleado solicitado.
 *       404:
 *         description: El empleado no fue encontrado.
 *       500:
 *         description: Error del servidor.
 */
employeeRoutes.get('/employees/:id', getEmployeeById);

/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Crear un nuevo empleado
 *     description: Crear un nuevo empleado con la información proporcionada.
 *     requestBody:
 *       description: Datos del nuevo empleado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/EmployeeInput'
 *     responses:
 *       201:
 *         description: Éxito, devuelve el nuevo empleado creado.
 *       400:
 *         description: Datos de entrada no válidos.
 *       500:
 *         description: Error del servidor.
 */
employeeRoutes.post('/employees', createEmployee);

/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Actualizar el superior de un empleado
 *     description: Actualizar el superior jerárquico de un empleado existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del empleado
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Datos actualizados del empleado
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/UpdateEmployeeInput'
 *     responses:
 *       200:
 *         description: Éxito, devuelve el empleado actualizado.
 *       400:
 *         description: Datos de entrada no válidos.
 *       404:
 *         description: El empleado no fue encontrado.
 *       500:
 *         description: Error del servidor.
 */
employeeRoutes.put('/employees/:id', updateEmployee);

/**
 * @swagger
 * definitions:
 *   EmployeeInput:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         description: Nombre del empleado
 *       superior_id:
 *         type: integer
 *         description: ID del superior jerárquico (opcional)
 *
 *   UpdateEmployeeInput:
 *     type: object
 *     properties:
 *       superior_id:
 *         type: integer
 *         description: Nuevo ID del superior jerárquico
 */
