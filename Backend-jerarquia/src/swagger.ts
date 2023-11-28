// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Employee Management API',
      version: '1.0.0',
      description: 'API para gestionar empleados con versionamiento jerárquico.',
    },
  },
  apis: ['./src/routes/*.ts'], // Rutas que deseas incluir en la documentación (ajústalas según tus necesidades)
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
