import React, { useState, createContext, useContext } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. Exportaciones de emergencia para que los otros archivos no "exploten"
export const API = ""; 
export const CartContext = createContext({});
export const useCart = () => ({ cartItems: [], cartCount: 0, addToCart: () => {} });

// 2. Importaciones de componentes
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

const Home = () => {
  const [services] = useState([
    { id: 1, name: "Corte de Pelo", price: 15, description: "Corte clásico" },
    { id: 2, name: "Arreglo de Barba", price: 10, description: "Perfilado" }
  ]);
  
  const [businessInfo] = useState({
    name: "The Corner Barber",
    phone: "677 83 75 93"
  });

  return (
    <div className="min-h-screen">
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
    </div>
  );
}

export default App;
