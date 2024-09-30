import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom'; // Importar el hook para redirigir
import './Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', email: '', password: '', role: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setUser(response.data.user);
        setFormData({
          nombre: response.data.user.nombre,
          email: response.data.user.email,
          password: '',
          role: response.data.user.role,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put('/users/profile', formData);
      setMessage('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Failed to update profile');
    }
  };

  const handleDeactivate = async () => {
    try {
      await api.delete('/users/profile');
      setMessage('Profile deactivated successfully!');
      setUser(null);
    } catch (error) {
      console.error('Error deactivating profile:', error);
      setMessage('Failed to deactivate profile');
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h1>Profile</h1>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Role"
            required
          />
          <button type="submit">Update</button>
        </form>

        {/* Botón para desactivar la cuenta */}
        <button onClick={handleDeactivate} style={{ marginTop: '20px' }}>
          Deactivate Account
        </button>

        {/* Botón para cerrar sesión con el mismo estilo */}
        <button onClick={handleLogout} style={{ marginTop: '20px' }}>
          Logout
        </button>

        {message && <div className="message">{message}</div>}
      </div>
    </div>
  );
}

export default Profile;