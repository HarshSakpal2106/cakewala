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
import { useState } from 'react';

function AppContent({ user, setUser }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <div className="App">
      {!isAdmin && <Header user={user} setUser={setUser} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/auth" element={<Auth setUser={setUser} />} />
        <Route path="/account" element={<Account user={user} setUser={setUser} />} />
        <Route path="/cart" element={<Cart user={user} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

export default App;