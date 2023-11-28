// EmployeeDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Typography, Grid, Button, TextField, CircularProgress } from '@mui/material';
import { updateEmployee } from '../services/employeeService'; // Ajusta la ruta según la ubicación real

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({ id: parseInt(id), name: '', position: '', superior_id: null });
  const [newSuperiorId, setNewSuperiorId] = useState('');
  const [loading, setLoading] = useState(false); // Nuevo estado para manejar la carga

  useEffect(() => {
    // Aquí puedes hacer una solicitud para obtener los detalles del empleado por su ID
    // Puedes usar axios o tu método preferido
    // Ejemplo: axios.get(`/api/employees/${id}`).then(response => setEmployee(response.data));
    // En este ejemplo, estoy usando datos de muestra, así que deberías reemplazarlo con la lógica real.
    setEmployee({
      id: parseInt(id),
      name: 'John Doe',
      position: 'Developer',
      superior_id: 1, // Reemplaza con el valor real si es aplicable
    });
  }, [id]);

  const handleUpdate = async () => {
    try {
      setLoading(true); // Activar el indicador de carga

      // Aquí puedes construir los datos actualizados del empleado
      const updatedEmployeeData = {
        superior_id: parseInt(newSuperiorId),
      };

      // Simular demora de 5 segundos (puedes reemplazarlo con tu lógica de solicitud real)
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Llama al servicio para actualizar el empleado
      await updateEmployee(employee.id, updatedEmployeeData);

      // Puedes realizar otras acciones después de la actualización, como recargar los datos del empleado
    } catch (error) {
      console.error('Error updating employee:', error);
    } finally {
      setLoading(false); // Desactivar el indicador de carga independientemente del resultado
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px', maxWidth: '600px' }}>
      <Typography variant="h4" gutterBottom>
        Employee Details
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">ID: {employee.id}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Name: {employee.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Position: {employee.position}</Typography>
        </Grid>
        {/* Agrega otros campos según sea necesario */}
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
            color="primary"
            onClick={handleUpdate}
            disabled={loading} // Desactivar el botón mientras está cargando
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Update Employee'}
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeDetails;
