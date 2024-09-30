import React, { useState } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState(''); // Estado para el mensaje de error o éxito
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginMessage(''); // Limpiar mensaje previo
    try {
      const response = await api.post('/users/login', { email, password });
      console.log('Login successful:', response.data);
      localStorage.setItem('token', response.data.token);
      setLoginMessage('Login successful!'); // Mensaje de éxito
      navigate('/'); // Redirigir a la página de inicio
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginMessage('Invalid credentials, please try again.'); // Mensaje de error
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
        </form>
        {loginMessage && <p>{loginMessage}</p>} {/* Mostrar mensaje */}
      </div>
    </div>
  );
}

export default Login;
