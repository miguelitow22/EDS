// app.js
const express = require('express');
const app = express();
const dotenv = require('dotenv'); // Carga las variables de entorno
const helmet = require('helmet'); // Seguridad HTTP
const xss = require('xss-clean'); // Prevención de XSS
const cors = require('cors'); // Habilita CORS
const userRoutes = require('./routes/userRoutes'); // Importa las rutas de usuario

dotenv.config(); // Carga las variables de entorno

app.use(express.json()); // Middleware para parsear JSON
app.use(helmet()); // Aplica middleware de seguridad
app.use(xss()); // Previene ataques XSS

// Configura CORS
app.use(cors({
  origin: 'http://localhost:3000', // Cambia esto a la URL de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/users', userRoutes); // Monta las rutas en el prefijo /api/users

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' }); // Responde con error 500
});

const PORT = process.env.PORT || 3001; // Usa el puerto definido en .env o 3001 por defecto
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`); // Inicia el servidor
});
