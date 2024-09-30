// controllers/userController.js
const bcrypt = require('bcryptjs'); // Para manejar el hashing de contraseñas
const jwt = require('jsonwebtoken'); // Para crear y verificar tokens JWT
const userModel = require('../models/userModel'); // Importa el modelo de usuario

// Registra un nuevo usuario
const registerUser = async (req, res) => {
  const { nombre, email, password, role } = req.body;
  try {
    // Verifica que todos los campos estén presentes
    if (!nombre || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hashea la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await userModel.createUser(nombre, email, hashedPassword, role);
    res.status(201).json({ id: userId }); // Responde con el ID del nuevo usuario
  } catch (error) {
    console.error('Error during user registration:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};

// Inicia sesión un usuario existente
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Busca al usuario por su email
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compara la contraseña proporcionada con la almacenada
    const isMatch = await bcrypt.compare(password, user.contraseña);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Crea un token JWT para el usuario
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
};

// Obtiene el perfil del usuario actual
const getProfile = async (req, res) => {
  const { id } = req.user; // Obtiene el ID del usuario del token
  try {
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Busca el usuario por su ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
};

// Actualiza la información del usuario
const updateUser = async (req, res) => {
  const { nombre, email, password, role } = req.body;
  const id = req.user.id; // Obtiene el ID del usuario del token
  try {
    if (!nombre || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.updateUser(id, nombre, email, hashedPassword, role);
    res.json({ updated: result > 0 }); // Devuelve un booleano indicando si se actualizó
  } catch (error) {
    console.error('Error during user update:', error);
    res.status(500).json({ error: 'Update failed' });
  }
};

// Desactiva un usuario
const deactivateUser = async (req, res) => {
  const id = req.user.id; // Obtiene el ID del usuario del token
  try {
    const result = await userModel.deactivateUser(id);
    res.json({ deactivated: result > 0 }); // Devuelve un booleano indicando si se desactivó
  } catch (error) {
    console.error('Error during user deactivation:', error);
    res.status(500).json({ error: 'Deactivation failed' });
  }
};

// Obtiene todos los usuarios (puede ser para un administrador)
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users); // Devuelve la lista de usuarios
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deactivateUser,
  getProfile,
  getAllUsers,
};
