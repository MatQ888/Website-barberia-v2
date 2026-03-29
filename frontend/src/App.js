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

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Main Home Page
const Home = () => {
  const [services, setServices] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, businessRes] = await Promise.all([
          axios.get(`${API}/services`),
          axios.get(`${API}/business-info`),
        ]);
        setServices(servicesRes.data);
        setBusinessInfo(businessRes.data);
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