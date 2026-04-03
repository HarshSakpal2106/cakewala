import React from "react";
import logo from "../../assets/logo.svg";
import "./Header.css";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header-logo" alt="CakeWala" />
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/aboutus">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
      <div className="auth-links">
        <Link to="/cart"><i class="fa-solid fa-cart-shopping"></i>Cart</Link>
        <Link to="/auth" id="loginBtn"><i class="fa-solid fa-arrow-right-to-bracket"></i>Login</Link>
      </div>
    </header>
  );
}

export default Header;