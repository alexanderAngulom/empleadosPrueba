// employeeService.js
import axios from 'axios';

const API_URL = 'http://localhost:3030/api/employees'; 

export const updateEmployee = async (employeeId, updatedEmployeeData) => {
    try {
        const response = await axios.put(`${API_URL}/${employeeId}`, updatedEmployeeData);
        return response.data;
    } catch (error) {
        console.error('Error updating employee:', error);
        throw error;
    }
};

export const getEmployeeById = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3030/api/employees/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching employee details:', error);
        throw error; 
    }
};
