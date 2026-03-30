import { useState, createContext, useContext } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Footer from "./components/Footer";

// 1. Definimos las exportaciones que los otros archivos buscan (API y Cart)
export const API = ""; 
export const CartContext = createContext();
export const useCart = () => useContext(CartContext) || { cartItems: [], cartCount: 0, addToCart: () => {} };

// 2. Un proveedor simple para que no explote la web
const CartProvider = ({ children }) => (
  <CartContext.Provider value={{ cartItems: [], cartCount: 0, addToCart: () => {} }}>
    {children}
  </CartContext.Provider>
);

const Home = () => {
  const [services] = useState([
    { id: 1, name: "Corte de Pelo", price: 15, description: "Corte clásico o moderno" },
    { id: 2, name: "Arreglo de Barba", price: 10, description: "Perfilado y ritual con toalla caliente" },
    { id: 3, name: "Corte + Barba", price: 22, description: "Combo completo de barbería" }
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

function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" richColors />
      </div>
    </CartProvider>
  );
}

export default App;
