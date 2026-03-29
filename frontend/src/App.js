import { useState, useEffect, createContext, useContext } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Components
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Booking from "./components/Booking";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import CheckoutSuccess from "./components/CheckoutSuccess";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} añadido al carrito`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// Main Home Page
const Home = () => {
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [businessInfo, setBusinessInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, productsRes, businessRes] = await Promise.all([
          axios.get(`${API}/services`),
          axios.get(`${API}/products`),
          axios.get(`${API}/business-info`),
        ]);
        setServices(servicesRes.data);
        setProducts(productsRes.data);
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
        <Products products={products} />
        <Reviews />
        <Footer businessInfo={businessInfo} />
      </main>
      <Cart />
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
            <Route path="/checkout/success" element={<CheckoutSuccess />} />
          </Routes>
        </BrowserRouter>
        <Toaster position="bottom-right" richColors />
      </div>
    </CartProvider>
  );
}

export default App;
