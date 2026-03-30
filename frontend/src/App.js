import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";

// Components - Cambiados a importación con llaves por si no son default
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
export const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [services, setServices] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, businessRes] = await Promise.all([
          axios.get(`${API}/services`).catch(() => ({ data: [] })),
          axios.get(`${API}/business-info`).catch(() => ({ data: null })),
        ]);
        setServices(servicesRes.data || []);
        setBusinessInfo(businessRes.data || {});
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen" data-testid="home-page">
      <div className="noise-overlay" />
      {/* Usamos condicionales para que no explote si el componente falló al cargar */}
      {Header && <Header businessInfo={businessInfo} />}
      <main>
        {Hero && <Hero businessInfo={businessInfo} />}
        {About && <About />}
        {Services && <Services services={services} />}
        {Booking && <Booking services={services} />}
        {Footer && <Footer businessInfo={businessInfo} />}
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
