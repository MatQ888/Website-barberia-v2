import React from 'react';
import { ChefHat, UtensilsCrossed, Wine, Dessert } from 'lucide-react';

const iconMap = {
  'chef-hat': ChefHat,
  'utensils': UtensilsCrossed,
  'wine': Wine,
  'dessert': Dessert
};

export const Menu = ({ dishes }) => {
  return (
    <section id="menu" className="menu-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Platos y Servicios</h2>
          <p className="section-description">
            En La Cochinita Loca ofrecemos una carta variada con lo mejor de la cocina mexicana.
          </p>
        </div>

        <div className="menu-grid">
          {dishes.map((dish) => (
            <div key={dish.id} className="menu-card">
              <div className="menu-card-header">
                <div className="menu-icon">{dish.icon}</div>
                <h3 className="menu-card-title">{dish.title}</h3>
              </div>
              <p className="menu-card-description">{dish.description}</p>
              <ul className="menu-items-list">
                {dish.items.map((item, index) => (
                  <li key={index} className="menu-item">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="dining-options">
          <h3 className="dining-title">Opciones para disfrutar</h3>
          <div className="dining-badges">
            <span className="badge">✔ Comer en el restaurante</span>
            <span className="badge">✔ Recoger tu pedido sin entrar</span>
            <span className="badge">✔ Pedir entrega sin contacto</span>
          </div>
        </div>
      </div>
    </section>
  );
};
