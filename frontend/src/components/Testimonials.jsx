import React from 'react';
import { Star } from 'lucide-react';

export const Testimonials = ({ testimonials }) => {
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Lo Que Dicen Nuestros Clientes</h2>
          <p className="section-description">
            Con más de 5.500 reseñas, nuestros clientes avalan la experiencia.
          </p>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-stars">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="star-icon" fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
