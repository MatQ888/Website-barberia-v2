import React from 'react';
import { Button } from './ui/button';

export const Header = ({ restaurantInfo, onReserveClick }) => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-logo">
            <h1 className="logo-text">{restaurantInfo.name}</h1>
          </div>

          <nav className="header-nav">
            <button 
              onClick={() => scrollToSection('menu')} 
              className="nav-link"
            >
              Menú
            </button>
            <button 
              onClick={() => scrollToSection('galeria')} 
              className="nav-link"
            >
              Galería
            </button>
            <button 
              onClick={() => scrollToSection('faq')} 
              className="nav-link"
            >
              FAQ
            </button>
            <Button 
              onClick={onReserveClick}
              className="btn-header"
              size="sm"
            >
              Reservar
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
};
export default Header;
