import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Paper,
  Typography,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Avatar,
  Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';

import SaveIcon from '@mui/icons-material/Save';

import { getEmployeeById, updateEmployee } from '../services/employeeService';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    employee_id: parseInt(id),
    employee_name: '',
    employee_version: 0,
    employee_superior_id: null,
    superior_id: null,
    superior_name: '',
    superior_version: 0,
    superior_superior_id: null,
  });
  const [newSuperiorId, setNewSuperiorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      try {
        setLoading(true);
        const response = await getEmployeeById(id);
        if (response) {
          setEmployee(response);
        } else {
          console.error('Error fetching employee details: Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Error fetching employee details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const updatedEmployeeData = {
        superior_id: parseInt(newSuperiorId),
      };

      let response = await updateEmployee(id, updatedEmployeeData);
      if (response) {
      //  this.fetchEmployeeDetails();
        setSuccessMessage('Employee updated successfully!');
        const response = await getEmployeeById(id);
        if (response) {
          setEmployee(response);
        } else {
          console.error('Error fetching employee details: Invalid response format');
        }
      }
    } catch (error) {
      console.error('Error updating employee:', error);
      setError('Error updating employee. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: '16px',
          margin: '16px',
          maxWidth: '600px',
          backgroundColor: '#F6F7F7',
          border: '1px solid #ddd', 
          boxShadow: '0 0 10px rgba(0, 0.5, 0, 0.5)',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'center' }}>
                <Avatar
                  alt={employee.employee_name}
                  src={`https://www.example.com/path/to/custom/avatar/${employee.employee_id}.jpg`}
                  sx={{
                    width: 100,
                    height: 100,
                    marginBottom: 2,
                    marginRight: 2,
                    backgroundColor: '#FFCAAF',
                  }}
                />
              </div>
              <Typography variant="h4" color="primary" gutterBottom>
                {employee.employee_name}
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="primary" variant="subtitle1">
                  Version: {employee.version}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    alt={employee.superior_name}
                    src={`https://www.example.com/path/to/custom/avatar/${employee.employee_id}.jpg`}
                    sx={{
                      width: 50,
                      height: 50,
                      marginRight: 2,
                      backgroundColor: '#F8EBFF',
                    }}
                  />
                  <Typography color="textSecondary" variant="subtitle1">
                    Superior Name: {employee.superior_name}
                  </Typography>


                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography color="#00B7B7" variant="subtitle1">
                  Superior identification number:  {employee.employee_superior_id}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Nuevo Superior ID"
                  variant="outlined"
                  fullWidth
                  value={newSuperiorId}
                  onChange={(e) => setNewSuperiorId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleUpdate}
                  disabled={loading}
                  startIcon={<SaveIcon />}
                  sx={{ marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  Update Employee
                </Button>
              </Grid>
            </Grid>
          </>
        )}
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(error)}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
          sx={{ backgroundColor: '#ef5350', color: '#fff' }}
        />
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(successMessage)}
          autoHideDuration={6000}
          onClose={() => setSuccessMessage(null)}
          message={successMessage}
          sx={{ backgroundColor: '#FFF8F5', color: '#fff' }}
        />
      </Paper>
    </div>
  );
};

export default EmployeeDetails;
