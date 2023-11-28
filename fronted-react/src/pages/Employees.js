import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/employees');
        setEmployees(response.data);
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
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', maxWidth: '600px' }}>
      <Typography variant="h4" gutterBottom>
        Employee List
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <List>
        {employees.map((employee) => (
          <ListItem key={employee.id} component={Link} to={`/employees/${employee.id}`} button>
            <ListItemAvatar>
              <Avatar alt={employee.name} src={employee.profileImage} />
            </ListItemAvatar>
            <ListItemText primary={`${employee.name} (Version: ${employee.version})`} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default Employees;
