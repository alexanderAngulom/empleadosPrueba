// src/controllers/employeeController.ts
import { Request, Response } from 'express';
import { Employee, getAllEmployeesFromDB, getEmployeeByIdFromDB, createEmployeeInDB, updateEmployeeInDB } from '../models/employeeModel';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await getAllEmployeesFromDB();
    res.json(employees);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);

  try {
    const employee = await getEmployeeByIdFromDB(id);

    if (employee) {
      res.json(employee);
    } else {
      res.status(404).send('Empleado no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener el empleado por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  const { name, superior_id } = req.body;

  try {
    const newEmployee: Employee = {
      id: 0, // La base de datos asignará un ID
      name,
      version: 1, // Nuevo empleado, versión inicial
      superior_id,
    };

    const createdEmployee = await createEmployeeInDB(newEmployee);
    res.json(createdEmployee);
  } catch (error) {
    console.error('Error al crear el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const newSuperiorId = parseInt(req.body.superior_id, 10);

  try {
    const currentEmployee = await getEmployeeByIdFromDB(id);

    if (!currentEmployee) {
      res.status(404).send('Empleado no encontrado');
      return;
    }
    console.log("currentEmployee.version",currentEmployee);

    const newVersion = currentEmployee.version + 1;

    const updatedEmployee = await updateEmployeeInDB(id, newSuperiorId, newVersion);

    if (updatedEmployee) {
      res.json(updatedEmployee);
    } else {
      res.status(404).send('Empleado no encontrado');
    }
  } catch (error) {
    console.error('Error al actualizar el empleado:', error);
    res.status(500).send('Error interno del servidor');
  }
};
