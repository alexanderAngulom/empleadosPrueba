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
  Button,
  Paper,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';  //

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

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

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ position: 'relative', padding: '16px', maxWidth: '800px', width: '100%', backgroundColor: '#F8F8F8' }}>
        <Button
          variant="contained"
          color="success"
          
          disabled={loading}
         
          sx={{
            marginTop: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(40deg, #9EC1CF 30%, #F1FBFF 90%)',
            boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            color: 'black',
            padding: '8px 16px',
            width:'100%',
            borderRadius: '4px',
            transition: 'background 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(45deg, #9EC1CF 30%, #F1FBFF 90%)',
            },
          }}
        >
          Employee List
        </Button>
        {/* <IconButton
          color="primary"
          style={{ borderRadius: '50%', width: '40px', height: '40px', backgroundColor: '#2196F3', color: "black" }}
          onClick={() => {
            console.log('Botón de creación clickeado');
          }}
        >
          <AddIcon />
        </IconButton> */}
        {loading && <CircularProgress />}
        {error && <Typography color="error">{error}</Typography>}
        {selectedEmployee && (
          <div style={{ position: 'absolute', top: 16, right: 16, textAlign: 'center' }}>
            <Typography variant="h6" style={{ color: '#333', marginBottom: '8px' }}>
              Selected Employee
            </Typography>
            <Avatar
              alt={selectedEmployee.name}
              src={`https://www.example.com/path/to/custom/avatar/${selectedEmployee.employee_id}.jpg`}
              variant="square"
              sx={{
                width: 50,
                height: 50,
                marginRight: 2,
                backgroundColor: '#D3F0F0',
                borderRadius: '8px',
              }}
            />
            <Typography variant="subtitle1" style={{ color: '#333' }}>
              {selectedEmployee.name} (Version: {selectedEmployee.version})
            </Typography>
          </div>
        )}
        <List>
          {employees.map((employee) => (
            <ListItem
              key={employee.id}
              component={Link}
              to={`/employees/${employee.id}`}
              button
              style={{
                backgroundColor: '#FFF',
                marginBottom: '8px',
                borderRadius: '8px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
              onClick={() => handleEmployeeSelect(employee)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={employee.name}
                  src={`https://www.example.com/path/to/custom/avatar/${employee.employee_id}.jpg`}
                  variant="square"
                  sx={{
                    width: 50,
                    height: 50,
                    marginRight: 2,
                    background: 'linear-gradient(20deg, #9EC1CF 30%, #F1FBFF 90%)',
                    borderRadius: '8px',
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={employee.name}
                primaryTypographyProps={{
                  variant: 'subtitle1',
                  style: { fontWeight: 'bold', fontSize: '1.2em', color: '#333' },
                }}
                secondary={`Version: ${employee.version}`}
                style={{ color: '#333' }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default Employees;
