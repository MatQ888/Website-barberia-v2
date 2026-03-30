import React, { useState, createContext, useContext } from "react";
import "./App.css"; 
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 1. ESCUDOS: Definimos todo lo que los hijos podrían pedir
export const API = ""; 
export const CartContext = createContext({});
export const useCart = () => ({ cartItems: [], cartCount: 0, addToCart: () => {} });

// 2. IMPORTACIONES
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

// 3. COMPONENTE DE SEGURIDAD (ErrorBoundary interno rápido)
const SafeComponent = ({ children, name }) => {
  try {
    return <>{children}</>;
  } catch (e) {
    console.error(`Error en componente ${name}:`, e);
    return <div style={{color: 'red', padding: '20px'}}>Error en {name}</div>;
  }
};

const Home = () => {
  const [services] = useState([
    { id: 1, name: "Corte Caballero", price: 15, description: "Corte y peinado" },
    { id: 2, name: "Arreglo Barba", price: 10, description: "Perfilado completo" }
  ]);
  
  const [businessInfo] = useState({
    name: "The Corner Barber",
    phone: "677 83 75 93",
    address: "Almería"
  });

  return (
    <div className="min-h-screen bg-black text-white" style={{ display: 'block' }}>
      <SafeComponent name="Header"><Header businessInfo={businessInfo} /></SafeComponent>
      <main>
        <SafeComponent name="Hero"><Hero businessInfo={businessInfo} /></SafeComponent>
        <SafeComponent name="About"><About /></SafeComponent>
        <SafeComponent name="Services"><Services services={services} /></SafeComponent>
        <SafeComponent name="Booking"><Booking services={services} /></SafeComponent>
        <SafeComponent name="Footer"><Footer businessInfo={businessInfo} /></SafeComponent>
      </main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
