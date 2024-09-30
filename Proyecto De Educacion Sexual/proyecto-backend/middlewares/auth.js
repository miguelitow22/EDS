// middlewares/auth.js
const jwt = require('jsonwebtoken');

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']; // Obtiene el encabezado de autorización
  const token = authHeader && authHeader.split(' ')[1]; // Extrae el token

  if (token == null) return res.status(401).json({ error: 'Token required' }); // Si no hay token, devuelve 401

  // Verifica el token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Forbidden' }); // Si el token no es válido, devuelve 403
    req.user = user; // Agrega el usuario al objeto de solicitud
    next();
  });
};

// Middleware para verificar si el usuario es un administrador
const authenticateAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden: Admins only' }); // Devuelve 403 si no es administrador
  }
  next();
};

module.exports = { authenticateToken, authenticateAdmin };
