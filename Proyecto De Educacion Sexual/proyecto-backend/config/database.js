// config/database.js
require('dotenv').config();
const mysql = require('mysql2/promise');

// Crea un pool de conexiones a la base de datos MySQL
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // Host de la base de datos
  user: process.env.DB_USER,     // Usuario de la base de datos
  password: process.env.DB_PASSWORD, // Contraseña de la base de datos
  database: process.env.DB_NAME, // Nombre de la base de datos
});

module.exports = pool; // Exporta el pool para usarlo en otros módulos
