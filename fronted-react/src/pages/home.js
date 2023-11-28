import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Employees from './Employees'; // Importa el componente Employees

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        console.log('Fetching employees...');
        const response = await axios.get('http://localhost:3030/api/employees');
        setEmployees(response.data);
        console.log('Employees fetched successfully:', response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setError('Error fetching employees. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchEmployees();
  }, []);
  return (
    <div>
      <h2>Welcome to the Employee Management System</h2>
   
      <Employees />
    </div>
  );
};

export default Home;
