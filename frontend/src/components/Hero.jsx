import React from 'react';
import { MapPin, Phone, Star } from 'lucide-react';
import { Button } from './ui/button';

export const Hero = ({ restaurantInfo, onReserveClick }) => {
  return (
    <section className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className="container">
          <div className="hero-text">
            <h1 className="hero-title">{restaurantInfo.name}</h1>
            <p className="hero-subtitle">{restaurantInfo.tagline}</p>
            
            <div className="hero-info">
              <div className="info-item">
                <Star className="icon" fill="currentColor" />
                <span>{restaurantInfo.rating} estrellas</span>
              </div>
              <div className="info-item">
                <span>•</span>
              </div>
              <div className="info-item">
                <span>{restaurantInfo.reviewCount.toLocaleString()} reseñas</span>
              </div>
            </div>

            <p className="hero-description">
              Si buscas tacos auténticos, nachos irresistibles y el verdadero sabor de México, 
              La Cochinita Loca es el lugar perfecto para ti.
            </p>

            <div className="hero-contact">
              <div className="contact-item">
                <MapPin className="icon" />
                <span>{restaurantInfo.address}</span>
              </div>
              <div className="contact-item">
                <Phone className="icon" />
                <span>{restaurantInfo.phone}</span>
              </div>
            </div>

            <div className="hero-buttons">
              <Button 
                className="btn-primary" 
                onClick={onReserveClick}
                size="lg"
              >
                Reservar Mesa
              </Button>
              <Button 
                className="btn-secondary" 
                variant="outline"
                size="lg"
                onClick={() => {
                  const menuSection = document.getElementById('menu');
                  menuSection?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Ver Menú
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
