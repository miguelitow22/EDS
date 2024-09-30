// src/pages/Register.js
import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './Register.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  const navigate = useNavigate(); // Inicializa useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', { nombre, email, password, role });
      console.log('User registered successfully:', response.data);
      setSuccessMessage('Registro exitoso!'); // Mensaje de éxito
      setErrorMessage(''); // Resetea el mensaje de error

      // Redirige a la página de inicio de sesión después de 2 segundos
      setTimeout(() => {
        navigate('/login'); // Cambia a la ruta de inicio de sesión
      }, 2000);
      
      // Reinicia los campos del formulario
      setNombre('');
      setEmail('');
      setPassword('');
      setRole('');
    } catch (error) {
      console.error('Error registering user:', error);
      setErrorMessage(error.response?.data?.error || 'Error en el registro, intenta de nuevo.'); // Mensaje de error específico
      setSuccessMessage(''); // Resetea el mensaje de éxito
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} required />
          <button type="submit">Register</button>
        </form>
        {successMessage && <div className="success-message">{successMessage}</div>} {/* Muestra el mensaje de éxito */}
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Muestra el mensaje de error */}
      </div>
    </div>
  );
}

export default Register;
