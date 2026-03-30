import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API = `${BACKEND_URL}/api`;

const Home = () => {
  // Datos de prueba para que la web no salga en blanco
  const [services] = useState([
    { id: 1, name: "Corte de Pelo", price: 15, description: "Corte clásico o moderno" },
    { id: 2, name: "Arreglo de Barba", price: 10, description: "Perfilado y ritual con toalla caliente" }
  ]);
  
  const [businessInfo] = useState({
    name: "The Corner Barber",
    phone: "677 83 75 93",
    address: "Almería, España",
    schedule: "Lunes a Sábado: 10:00 - 20:00"
  });

  return (
    <div className="min-h-screen">
      <div className="noise-overlay" />
      <Header businessInfo={businessInfo} />
      <main>
        <Hero businessInfo={businessInfo} />
        <About />
        <Services services={services} />
        <Booking services={services} />
        <Footer businessInfo={businessInfo} />
      </main>
    </div>
  );
};
    fetchData();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="noise-overlay" />
      <Header businessInfo={businessInfo} />
      <main>
        <Hero businessInfo={businessInfo} />
        <About />
        <Services services={services} />
        <Booking services={services} />
        <Footer businessInfo={businessInfo} />
      </main>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default App;
