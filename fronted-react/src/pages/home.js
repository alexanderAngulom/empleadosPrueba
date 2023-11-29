import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Employees from './Employees'; 
import {

  Typography,
  AppBar,
  Toolbar,
} from '@mui/material';
const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        /* console.log('Fetching employees...');
        const response = await axios.get('http://localhost:3030/api/employees');
        setEmployees(response.data);
        console.log('Employees fetched successfully:', response.data); */
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
      <AppBar position="static" style={{ backgroundColor: '#333' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1, color: '#FFF' }}>
            Employee Management App
          </Typography>
        </Toolbar>
      </AppBar>

      <Employees />
    </div>
  );
};

export default Home;
