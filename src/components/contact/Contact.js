import React, { useState, useEffect } from "react";
import "./Contact.css";

function Contact() {
    useEffect(() => {
        document.title = "Contact Us";
    }, []);

    const [form, setForm] = useState({ name: "", number: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);
    const [err, setErr] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("https://formspree.io/f/mzdkkpqw", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    name: form.name,
                    number: form.number,
                    subject: form.subject,
                    message: form.message,
                })
            });

            if (response.ok) {
                setSent(true);
                setErr("");
                setForm({ name: "", number: "", subject: "", message: "" });
                setTimeout(() => setSent(false), 5000);
            } else {
                setErr("Something went wrong. Please try again.");
            }

        } catch (error) {
            setErr("Failed to send. Please try again.");
        }
    };

    return (
        <div className="contact-container page">
            <section className="contact-hero">
                <h4 className="section-eyebrow">We'd love to hear from you</h4>
                <h1 className="contact-title">Get in Touch</h1>
                <p className="contact-subtitle">For orders, questions, custom cakes, or just to say hi — we're always here.</p>
            </section>
            <section className="contact-main">
                <div className="contact-info">
                    <div className="contact-info-card">
                        <h3>Find us here</h3>
                        <div className="contact-item">
                            <div className="contact-item-icon">📍</div>
                            <div>
                                <div className="contact-item-label">Visit Us</div>
                                <div className="contact-item-val">VCET, Vasai</div>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-item-icon">📞</div>
                            <div>
                                <div className="contact-item-label">Call Us</div>
                                <div className="contact-item-val">+91 98765 43210</div>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-item-icon">✉️</div>
                            <div>
                                <div className="contact-item-label">Email Us</div>
                                <div className="contact-item-val">hello@cakewala.in</div>
                            </div>
                        </div>
                        <div className="contact-item">
                            <div className="contact-item-icon">🕐</div>
                            <div>
                                <div className="contact-item-label">Opening Hours</div>
                                <div className="contact-item-val">Mon–Sat: 9am – 7pm<br />Sunday: 10am – 5pm</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="contact-form-card">
                    <h3>Send us a message</h3>
                    <p className="form-subtext">We usually reply within 24 hours.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label className="form-label">Your Name</label>
                                <input
                                    className="form-input"
                                    required
                                    placeholder="Harshwardhan Sakpal"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    className="form-input"
                                    type="tel"
                                    required
                                    placeholder="Enter Whatsapp no for quick response"
                                    value={form.number}
                                    onChange={(e) => setForm({ ...form, number: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Subject</label>
                            <input
                                className="form-input"
                                placeholder="Custom wedding cake enquiry"
                                value={form.subject}
                                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Message</label>
                            <textarea
                                className="form-textarea"
                                required
                                placeholder="Tell us all about it..."
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                            />
                        </div>
                        {err && <div className="form-error">{err}</div>}
                        <button type="submit" className="btn-submit">
                            Send Message
                        </button>
                        {sent && (
                            <div className="form-success">
                                ✓ Your message was sent! We'll get back to you within 24 hours.
                            </div>
                        )}
                    </form>
                </div>
            </section>

            <section className="contact-bottom">
                <div className="contact-bottom-card">
                    <div className="contact-bottom-icon">🎂</div>
                    <h3>Custom Orders</h3>
                    <p>Planning a wedding, birthday, or special event? We'll bake your dream cake exactly as you imagine it.</p>
                    <a href="mailto:hello@cakewala.in" className="contact-bottom-link">Email Us →</a>
                </div>
                <div className="contact-bottom-card">
                    <div className="contact-bottom-icon">🚚</div>
                    <h3>Delivery Enquiries</h3>
                    <p>We deliver across Mumbai. Call us before 10am for same-day delivery on select items.</p>
                    <a href="tel:+919876543210" className="contact-bottom-link">Call Us →</a>
                </div>
                <div className="contact-bottom-card">
                    <div className="contact-bottom-icon">📷</div>
                    <h3>Follow Our Journey</h3>
                    <p>See our latest creations, behind-the-scenes baking, and happy customer moments on Instagram.</p>
                    <a href="#" className="contact-bottom-link">@cakewala.in →</a>
                </div>
            </section>

        </div>
    );
}

export default Contact;