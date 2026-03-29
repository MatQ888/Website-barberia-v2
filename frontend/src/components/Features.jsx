import React from 'react';
import { ChefHat, Clock, Music, Heart, Star } from 'lucide-react';

const iconMap = {
  'chef-hat': ChefHat,
  'clock': Clock,
  'music': Music,
  'heart': Heart,
  'star': Star
};

export const Features = ({ features }) => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Por Qué Elegir La Cochinita Loca</h2>
        </div>

        <div className="features-grid">
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div key={feature.id} className="feature-card">
                <div className="feature-icon-wrapper">
                  <IconComponent className="feature-icon" />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
