import React from "react";
import "./Account.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost/cakewala/backend";

function Account({ user, setUser }) {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetch(`${API}/orders.php?user_id=${user.id}`)
                .then(r => r.json())
                .then(data => {
                    setOrders(data);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [user]);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("isAdmin");
        navigate("/auth");
    };

    useEffect(() => {
        document.title = "Your Account";
    }, []);

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
                            <div className="account-detail-val">{user?.phone || "—"}</div>
                        </div>
                    </div>
                </div>

                <div className="account-card">
                    <h3 className="account-card-title">Order History</h3>
                    {loading ? (
                        <p>Loading your orders...</p>
                    ) : orders.length === 0 ? (
                        <p>No orders placed yet.</p>
                    ) : (
                        orders.map(order => (
                            <div key={order.id} className="order-row">
                                <div className="order-row-left">
                                    <div className="order-icon">🎂</div>
                                    <div>
                                        <div className="order-item-name">{order.cake_name}</div>
                                        <div className="order-item-meta">{order.order_ref} · {new Date(order.created_at).toLocaleDateString()}</div>
                                    </div>
                                </div>
                                <div className="order-row-right">
                                    <div className="order-price">₹{order.total_price}</div>
                                    <span className={`order-status status-${(order.status || 'pending').toLowerCase().replace(/\s+/g, '')}`}>
                                        {order.status}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}

export default Account;