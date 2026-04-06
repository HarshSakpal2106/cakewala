import "./Admin.css";
import Logo from "../../assets/logo.svg";
import { useEffect, useState } from "react";

const API = "http://localhost/cakewala/backend";
const CLOUD_NAME = "drpvfbehm";   
const UPLOAD_PRESET = "cakewala_uploads"; 

const CATEGORIES = ["Chocolate", "Fruit", "Vanilla", "Citrus", "Custom"];

const BLANK_FORM = { name: "", description: "", price: "", tag: "", category: "Chocolate", image_url: "" };

function Admin() {
    useEffect(() => { document.title = "CakeWala - Admin"; }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminId, setAdminId] = useState("");
    const [adminPassword, setAdminPassword] = useState("");
    const [loginErr, setLoginErr] = useState(false);

    const ADMIN_ID = "cakewala_admin";
    const ADMIN_PASSWORD = "cakewala@123";

    useEffect(() => {
        if (localStorage.getItem("isAdmin") === "true") setIsLoggedIn(true);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminId === ADMIN_ID && adminPassword === ADMIN_PASSWORD) {
            setIsLoggedIn(true);
            localStorage.setItem("isAdmin", "true");
        } else {
            setLoginErr(true);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("isAdmin");
        setAdminId(""); setAdminPassword("");
    };

    const [cakes, setCakes] = useState([]);
    const [orders, setOrders] = useState([]);
    const [tab, setTab] = useState("orders");
    const [form, setForm] = useState(BLANK_FORM);
    const [imgFile, setImgFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!isLoggedIn) return;
        fetchCakes();
        fetchOrders();
    }, [isLoggedIn]);

    const fetchCakes = () =>
        fetch(`${API}/cakes.php?all=1`)
            .then(r => r.json()).then(setCakes);

    const fetchOrders = () =>
        fetch(`${API}/orders.php`)
            .then(r => r.json()).then(setOrders);

    const uploadToCloudinary = async (file) => {
        const fd = new FormData();
        fd.append("file", file);
        fd.append("upload_preset", UPLOAD_PRESET);
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
            method: "POST", body: fd,
        });
        const data = await res.json();
        return data.secure_url;
    };

    const handleAddCake = async (e) => {
        e.preventDefault();
        setSaving(true);
        let image_url = form.image_url;

        if (imgFile) {
            setUploading(true);
            try {
                image_url = await uploadToCloudinary(imgFile);
            } catch {
                alert("Image upload failed. Check your Cloudinary config.");
                setUploading(false); setSaving(false); return;
            }
            setUploading(false);
        }

        await fetch(`${API}/cakes.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...form, price: parseInt(form.price), image_url }),
        });

        setForm(BLANK_FORM);
        setImgFile(null);
        setSaving(false);
        fetchCakes();
    };

    const toggleCake = async (id) => {
        await fetch(`${API}/cakes.php?id=${id}&action=toggle`, { method: "PATCH" });
        fetchCakes();
    };

    const deleteCake = async (id) => {
        if (!window.confirm("Delete this cake permanently?")) return;
        await fetch(`${API}/cakes.php?id=${id}`, { method: "DELETE" });
        fetchCakes();
    };

    const updateOrderStatus = async (id, status) => {
        await fetch(`${API}/orders.php?id=${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        fetchOrders();
    };

    if (!isLoggedIn) {
        return (
            <div className="admin-login-container page">
                <div className="admin-login-box">
                    <h1 className="admin-login-h1">Admin Login</h1>
                    <form onSubmit={handleLogin}>
                        <div className="admin-login-field">
                            <label>Admin ID</label>
                            <input type="text" value={adminId} onChange={e => setAdminId(e.target.value)} required />
                        </div>
                        <div className="admin-login-field">
                            <label>Password</label>
                            <input type="password" value={adminPassword} onChange={e => setAdminPassword(e.target.value)} required />
                        </div>
                        <button type="submit" className="admin-login-btn">Login</button>
                        {loginErr && <div className="admin-login-alert">Invalid Credentials!</div>}
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-container page">
            <header className="admin-header">
                <img src={Logo} alt="CakeWala" className="admin-header-logo" />
                <h1 className="admin-header-h1">Admin Dashboard</h1>
                <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
            </header>

            <div className="admin-tabs">
                <button className={`admin-tab ${tab === "orders" ? "active" : ""}`} onClick={() => setTab("orders")}>
                    Orders <span className="admin-tab-count">{orders.length}</span>
                </button>
                <button className={`admin-tab ${tab === "cakes" ? "active" : ""}`} onClick={() => setTab("cakes")}>
                    Manage Menu <span className="admin-tab-count">{cakes.length}</span>
                </button>
            </div>

            {tab === "orders" && (
                <section className="order-section">
                    <h2 className="order-section-h1">Orders</h2>
                    <div className="order-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Item</th>
                                    <th>Qty</th>
                                    <th>Customer</th>
                                    <th>Contact</th>
                                    <th>Address</th>
                                    <th>Payment</th>
                                    <th>Total</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>{order.order_ref}</td>
                                        <td>{order.cake_name}</td>
                                        <td>{order.quantity}</td>
                                        <td>{order.customer_name}</td>
                                        <td>{order.contact}</td>
                                        <td className="address-cell">{order.address}{order.city ? `, ${order.city}` : ""}</td>
                                        <td>{order.payment_method}</td>
                                        <td>₹{order.total_price}</td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={e => updateOrderStatus(order.id, e.target.value)}
                                            >
                                                <option>Pending</option>
                                                <option>Out for Delivery</option>
                                                <option>Done</option>
                                                <option>Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}

            {tab === "cakes" && (
                <section className="admin-cakes-section">

                    <div className="admin-add-cake">
                        <h2>Add New Cake</h2>
                        <form className="admin-cake-form" onSubmit={handleAddCake}>
                            <input
                                placeholder="Cake Name *"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                required
                            />
                            <textarea
                                placeholder="Description *"
                                rows={2}
                                value={form.description}
                                onChange={e => setForm({ ...form, description: e.target.value })}
                                required
                            />
                            <div className="admin-cake-form-row">
                                <input
                                    type="number"
                                    placeholder="Price (₹) *"
                                    value={form.price}
                                    onChange={e => setForm({ ...form, price: e.target.value })}
                                    required
                                />
                                <input
                                    placeholder="Tag (e.g. New, Popular)"
                                    value={form.tag}
                                    onChange={e => setForm({ ...form, tag: e.target.value })}
                                />
                                <select
                                    value={form.category}
                                    onChange={e => setForm({ ...form, category: e.target.value })}
                                >
                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                </select>
                            </div>

                            <div className="admin-img-upload">
                                <label>Cake Image (Cloudinary)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={e => setImgFile(e.target.files[0])}
                                />
                                {imgFile && <span className="admin-img-name">📎 {imgFile.name}</span>}
                            </div>

                            <button type="submit" className="admin-add-btn" disabled={saving}>
                                {uploading ? "Uploading image..." : saving ? "Saving..." : "Add Cake"}
                            </button>
                        </form>
                    </div>

                    <div className="admin-cake-list">
                        <h2>All Cakes ({cakes.length})</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Tag</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cakes.map(cake => (
                                    <tr key={cake.id} className={!cake.available ? "cake-hidden" : ""}>
                                        <td>
                                            {cake.image_url
                                                ? <img src={cake.image_url} alt={cake.name} className="admin-cake-thumb" />
                                                : <span className="admin-cake-no-img">🎂</span>
                                            }
                                        </td>
                                        <td>{cake.name}</td>
                                        <td>{cake.category}</td>
                                        <td>₹{cake.price}</td>
                                        <td>{cake.tag}</td>
                                        <td>
                                            <span className={`admin-status-badge ${cake.available ? "status-active" : "status-hidden"}`}>
                                                {cake.available ? "Visible" : "Hidden"}
                                            </span>
                                        </td>
                                        <td className="admin-cake-actions">
                                            <button
                                                className="admin-action-btn toggle-btn"
                                                onClick={() => toggleCake(cake.id)}
                                                title={cake.available ? "Hide from menu" : "Show on menu"}
                                            >
                                                {cake.available ? "Hide" : "Show"}
                                            </button>
                                            <button
                                                className="admin-action-btn delete-btn"
                                                onClick={() => deleteCake(cake.id)}
                                                title="Delete permanently"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            )}
        </div>
    );
}

export default Admin;
