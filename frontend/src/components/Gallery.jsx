import React from 'react';

export const Gallery = ({ gallery }) => {
  return (
    <section className="gallery-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Galería de Fotos</h2>
          <p className="section-description">
            Descubre nuestros platos más populares y el ambiente único de nuestro restaurante.
          </p>
        </div>

        <div className="gallery-grid">
          {gallery.map((image) => (
            <div key={image.id} className="gallery-item">
              <img 
                src={image.url} 
                alt={image.alt}
                className="gallery-image"
                loading="lazy"
              />
              <div className="gallery-overlay">
                <p className="gallery-caption">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
