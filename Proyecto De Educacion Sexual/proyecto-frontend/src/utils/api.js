import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api', // Esta URL debe coincidir con la configuración del servidor
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor de solicitudes para agregar el token de autenticación
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Obtén el token del almacenamiento local
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Agrega el token en el encabezado de autorización
  }
  return config;
});

export default api;
