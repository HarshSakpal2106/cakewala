import React from "react";
import "./Aboutus.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import aboutUsImg from "../../assets/aboutus-img.webp";

function AboutUs() {
    useEffect(() => {
        document.title = "About Us";
    }, []);
    return (
        <div className="about-container page">
            <section className="about-hero">
                <div className="about-image-box">
                    <img src={aboutUsImg} alt="About Us" className="about-image" />
                </div>
                <div className="about-text">
                    <h4 className="section-eyebrow">Our Story</h4>
                    <h1>Baked in a kitchen,<br />delivered with love</h1>
                    <p>CakeWala started in 2024 in a tiny Mumbai apartment kitchen. What began as weekend baking for friends and family quickly grew into something much bigger — hundreds of orders a month, a loyal community of cake lovers, and a mission to prove that homemade really is better.</p>
                    <p>Every recipe has been tested dozens of times. Every ingredient is sourced with care. We believe that when you can taste the love in a cake, it makes every occasion more special.</p>
                    <Link to="/contact" className="about-cta">Get in Touch</Link>
                </div>
            </section>
            <section className="about-stats-section">
                <div className="about-stats">
                    <div className="stat-card">
                        <div className="stat-num">2024</div>
                        <div className="stat-label">Year Founded</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num">500+</div>
                        <div className="stat-label">Happy Customers</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num">25+</div>
                        <div className="stat-label">Cake Varieties</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-num">4.5 ★</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>
            </section>
            <section className="about-values-section">
                <h4 className="section-eyebrow">What We Believe In</h4>
                <h2 className="section-title">Our Values</h2>
                <div className="values-grid">
                    <div className="value-card">
                        <div className="value-icon">🌿</div>
                        <h3>Real Ingredients</h3>
                        <p>We never use artificial flavours, colours, or shortcuts.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">❤️</div>
                        <h3>Baked with Love</h3>
                        <p>Every cake gets the attention it deserves, no mass production.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">♻️</div>
                        <h3>Sustainable Sourcing</h3>
                        <p>Local vendors, seasonal produce, eco-friendly packaging.</p>
                    </div>
                    <div className="value-card">
                        <div className="value-icon">🎨</div>
                        <h3>Creative Vision</h3>
                        <p>We love custom orders — your imagination, our craft.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default AboutUs;