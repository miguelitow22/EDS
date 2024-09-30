import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ children }) {
  const { user } = useAuth(); // Obtiene el contexto de autenticación

  return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
