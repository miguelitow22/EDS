// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  deactivateUser,
  getProfile,
} = require('../controllers/userController'); // Importa las funciones del controlador
const { authenticateToken } = require('../middlewares/auth'); // Importa el middleware de autenticación

// Define las rutas
router.post('/register', registerUser); // Ruta para registrar un nuevo usuario
router.post('/login', loginUser); // Ruta para iniciar sesión
router.get('/profile', authenticateToken, getProfile); // Ruta para obtener el perfil del usuario
router.put('/profile', authenticateToken, updateUser); // Ruta para actualizar el perfil del usuario
router.delete('/profile', authenticateToken, deactivateUser); // Ruta para desactivar el usuario

module.exports = router; // Exporta las rutas
