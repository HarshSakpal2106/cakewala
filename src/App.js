import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import Aboutus from './components/aboutus/Aboutus';
import Contact from './components/contact/Contact';
import Auth from './components/auth/Auth';
import Cart from './components/cart/Cart';
import Footer from './components/footer/Footer';
import Admin from './components/admin/Admin';
import Account from './components/account/Account';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

function AppContent({ user, setUser }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <div className="App">
      {!isAdmin && <Header user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu user={user} cart={cart} setCart={setCart} />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/account" element={<Account user={user} setUser={setUser} />} />
        <Route path="/cart" element={<Cart user={user} cart={cart} setCart={setCart} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

export default App;