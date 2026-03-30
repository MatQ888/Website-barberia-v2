import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export const Footer = ({ restaurantInfo }) => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">{restaurantInfo.name}</h3>
            <p className="footer-description">
              Auténtica comida mexicana en el corazón de Madrid. 
              Ven a disfrutar de tacos, nachos y el mejor ambiente mexicano.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Contacto</h4>
            <div className="footer-links">
              <div className="footer-link">
                <MapPin className="footer-icon" />
                <span>{restaurantInfo.address}</span>
              </div>
              <div className="footer-link">
                <Phone className="footer-icon" />
                <a href={`tel:${restaurantInfo.phone.replace(/\s/g, '')}`}>
                  {restaurantInfo.phone}
                </a>
              </div>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-subtitle">Horario</h4>
            <div className="footer-links">
              <div className="footer-link">
                <Clock className="footer-icon" />
                <div>
                  <p>Lun - Jue: 13:00 - 23:00</p>
                  <p>Vie - Sáb: 13:00 - 00:00</p>
                  <p>Dom: 13:00 - 23:00</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {restaurantInfo.name}. Todos los derechos reservados.</p>
          <p>Diseñado con ❤️ para los amantes de la cocina mexicana</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
