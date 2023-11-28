// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import { employeeRoutes } from './routes/employeeRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger';
import cors from 'cors'; // Importa el paquete cors

const app = express();
const port = process.env.PORT || 3030;

// Middleware
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Reemplaza con el origen de tu front-end
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
// Routes
app.use('/api', employeeRoutes);

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Default route
app.get('/', (req, res) => {
  res.send('Bienvenido al sistema de gestión de empleados');
});

// Start the server
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
