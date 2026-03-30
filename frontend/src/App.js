import { useState, useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";

// Components - IMPORTACIÓN DINÁMICA (con llaves para evitar errores de export)
import * as HeaderModule from "./components/Header";
import * as HeroModule from "./components/Hero";
import * as AboutModule from "./components/About";
import * as ServicesModule from "./components/Services";
import * as BookingModule from "./components/Booking";
import * as FooterModule from "./components/Footer";

// Extraemos el componente ya sea si es default o nombrado
const Header = HeaderModule.default || HeaderModule.Header || HeaderModule;
const Hero = HeroModule.default || HeroModule.Hero || HeroModule;
const About = AboutModule.default || AboutModule.About || AboutModule;
const Services = ServicesModule.default || ServicesModule.Services || ServicesModule;
const Booking = BookingModule.default || BookingModule.Booking || BookingModule;
const Footer = FooterModule.default || FooterModule.Footer || FooterModule;

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
