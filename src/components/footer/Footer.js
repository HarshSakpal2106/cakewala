import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../../assets/logo.svg";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">

                <div className="footer-brand">
                    <img src={logo} alt="CakeWala" className="footer-logo" />
                    <p>Every cake is baked from scratch with the finest ingredients — real butter, farm eggs, and a whole lot of love.</p>
                    <div className="footer-socials">
                        <a href="#" className="social-btn"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" className="social-btn"><i class="fa-brands fa-facebook-f"></i></a>
                        <a href="#" className="social-btn"><i class="fa-brands fa-twitter"></i></a>
                        <a href="#" className="social-btn"><i class="fa-brands fa-pinterest-p"></i></a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Explore</h4>
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/aboutus">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </div>

                <div className="footer-col">
                    <h4>Popular Cakes</h4>
                    <Link to="/menu">Chocolate Truffle</Link>
                    <Link to="/menu">Red Velvet</Link>
                    <Link to="/menu">Mango Coconut</Link>
                    <Link to="/menu">Lemon Drizzle</Link>
                </div>

                <div className="footer-col">
                    <h4>Get in Touch</h4>
                    <span>📍 Mumbai, Maharashtra</span>
                    <span>📞 +91 98765 43210</span>
                    <span>✉️ hello@cakewala.in</span>
                    <span>🕐 Mon–Sat, 9am – 7pm</span>
                </div>

            </div>
            <div className="footer-bottom">
                <p>© 2025 CakeWala. Made with 🧡 in Mumbai.</p>
            </div>
        </footer>
    );
}

export default Footer;