import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; 

function Header({ user }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <h1>Educación Sin Fronteras</h1>
      </div>
      <nav className={`nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/register">Registro</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/profile">Perfil</Link></li>
        </ul>
      </nav>
      <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
        <div className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></div>
      </div>
    </header>
  );
}

export default Header;
