// models/userModel.js
const pool = require('../config/database'); // Importa el pool de conexiones a la base de datos

// Crea un nuevo usuario en la base de datos
const createUser = async (nombre, email, password, role) => {
  try {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, contraseña, role) VALUES (?, ?, ?, ?)',
      [nombre, email, password, role]
    );
    return result.insertId; // Devuelve el ID del nuevo usuario
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

// Busca un usuario por su email
const findByEmail = async (email) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows[0]; // Devuelve el primer usuario encontrado
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

// Busca un usuario por su ID
const findById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return rows[0]; // Devuelve el usuario encontrado
  } catch (error) {
    console.error('Error finding user by id:', error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

// Actualiza la información de un usuario
const updateUser = async (id, nombre, email, password, role) => {
  try {
    const [result] = await pool.query(
      'UPDATE usuarios SET nombre = ?, email = ?, contraseña = ?, role = ? WHERE id = ?',
      [nombre, email, password, role, id]
    );
    return result.affectedRows; // Devuelve el número de filas afectadas
  } catch (error) {
    console.error('Error updating user:', error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

// Desactiva un usuario
const deactivateUser = async (id) => {
  try {
    const [result] = await pool.query('UPDATE usuarios SET activo = 0 WHERE id = ?', [id]);
    return result.affectedRows; // Devuelve el número de filas afectadas
  } catch (error) {
    console.error('Error deactivating user:', error);
    throw error; // Lanza el error para ser manejado en el controlador
  }
};

module.exports = {
  createUser,
  findByEmail,
  findById,
  updateUser,
  deactivateUser,
};
