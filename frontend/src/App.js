import React, { useEffect } from "react";
import { Toaster } from "./components/ui/sonner";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Menu } from "./components/Menu";
import { Features } from "./components/Features";
import { Gallery } from "./components/Gallery";
import { ReservationForm } from "./components/ReservationForm";
import { Testimonials } from "./components/Testimonials";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import {
  restaurantInfo,
  dishes,
  features,
  gallery,
  faqs,
  testimonials,
  mockReservation
} from "./mockData";
import "./App.css";

function App() {
  const handleReserveClick = () => {
    const reservationSection = document.getElementById('reservar');
    reservationSection?.scrollIntoView({ behavior: 'smooth' });
  };

  
  
  // Reemplaza 'const handleReservationSubmit = async ...' con esto:

const handleReservationSubmit = async (formData) => {
  try {
    // 1. LA URL DE TEST DE TU WEBHOOK N8N (Pegar aquí lo que copiaste en el PASO 1)
    // No borres '/webhook-test/' mientras estás en fase de desarrollo.
    const n8n_webhook_url = "http://localhost:5678/webhook-test/cb544185-7f62-4447-bca0-08467b29779b";

    // 2. LA PETICIÓN OPTIMIZADA
    const response = await fetch(n8n_webhook_url, {
      method: "POST", // Método POST correcto
      headers: {
        "Content-Type": "application/json", // Decimos a n8n que enviamos JSON
      },
      // Convertimos el objeto formData a un string JSON puro
      body: JSON.stringify({
        // Aseguramos que los nombres de las claves sean claros y consistentes
        cliente_nombre: formData.name || "Sin nombre",
        cliente_email: formData.email || "Sin email",
        cliente_telefono: formData.phone || "Sin teléfono",
        reserva_fecha: formData.date || "",
        reserva_hora: formData.time || "",
        reserva_personas: formData.guests || "0"
      }),
    });

    // 3. MANEJO DE LA RESPUESTA
    // n8n por defecto devuelve solo texto ("Workflow started").
    // No necesitamos parsear JSON aquí a menos que configures n8n para responderlo.
    if (response.ok) {
      return {
        success: true,
        message: "Reserva enviada correctamente a procesamiento."
      };
    } else {
      throw new Error(`Error en el servidor n8n: ${response.status}`);
    }

  } catch (error) {
    console.error("Error crítico enviando la reserva:", error);
    // Devolvemos un objeto de error estructurado para la UI
    return {
      success: false,
      message: "Lo sentimos, hubo un problema técnico. Inténtelo de nuevo."
    };
  }
};

  
  
  useEffect(() => {
    // Log para verificar que la app se cargó correctamente
    console.log("La Cochinita tonta - App cargada");
  }, []);

  return (
    <div className="App">
      <Toaster position="top-right" />
      
      <Header 
        restaurantInfo={restaurantInfo}
        onReserveClick={handleReserveClick}
      />

      <main>
        <Hero 
          restaurantInfo={restaurantInfo}
          onReserveClick={handleReserveClick}
        />

        <Menu dishes={dishes} />

        <Features features={features} />

        <div id="galeria">
          <Gallery gallery={gallery} />
        </div>

        <ReservationForm onSubmit={handleReservationSubmit} />

        <Testimonials testimonials={testimonials} />

        <div id="faq">
          <FAQ faqs={faqs} />
        </div>
      </main>

      <Footer restaurantInfo={restaurantInfo} />
    </div>
  );
}

export default App;
