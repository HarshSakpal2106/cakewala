import React from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";

function Account({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        setUser(null);
        navigate("/auth");
    };

    const orders = [
        { id: "#CW1042", item: "Chocolate Truffle Cake", date: "22 Mar 2025", status: "Delivered", price: "₹649" },
        { id: "#CW1038", item: "Red Velvet Cake", date: "10 Mar 2025", status: "Delivered", price: "₹599" },
        { id: "#CW1056", item: "Mango Coconut Layer", date: "27 Mar 2025", status: "On the Way", price: "₹679" },
    ];

    return (
        <div className="account-container page">

            <div className="account-profile-card">
                <div className="account-avatar">👤</div>
                <div className="account-profile-info">
                    <h2 className="account-name">{user?.name || "Guest"}</h2>
                    <p className="account-email">{user?.email || "No email"}</p>
                    <span className="account-badge">CakeWala Member</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                    <i className="fa-solid fa-arrow-right-from-bracket"></i> Logout
                </button>
            </div>

            <div className="account-grid">
                <div className="account-card">
                    <h3 className="account-card-title">Personal Details</h3>
                    <div className="account-detail-row">
                        <div className="account-detail-icon">👤</div>
                        <div>
                            <div className="account-detail-label">Full Name</div>
                            <div className="account-detail-val">{user?.name || "—"}</div>
                        </div>
                    </div>
                    <div className="account-detail-row">
                        <div className="account-detail-icon">✉️</div>
                        <div>
                            <div className="account-detail-label">Email Address</div>
                            <div className="account-detail-val">{user?.email || "—"}</div>
                        </div>
                    </div>
                    <div className="account-detail-row">
                        <div className="account-detail-icon">📞</div>
                        <div>
                            <div className="account-detail-label">Phone Number</div>
                            <div className="account-detail-val">+91 98765 43210</div>
                        </div>
                    </div>
                </div>

                <div className="account-card">
                    <h3 className="account-card-title">Order History</h3>
                    {orders.map(order => (
                        <div key={order.id} className="order-row">
                            <div className="order-row-left">
                                <div className="order-icon">🎂</div>
                                <div>
                                    <div className="order-item-name">{order.item}</div>
                                    <div className="order-item-meta">{order.id} · {order.date}</div>
                                </div>
                            </div>
                            <div className="order-row-right">
                                <div className="order-price">{order.price}</div>
                                <span className={`order-status ${order.status === "Delivered" ? "status-delivered" : "status-ontheway"}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Account;