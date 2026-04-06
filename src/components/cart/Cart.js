import "./Cart.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API = "http://localhost/cakewala/backend";

function Cart({ user, cart, setCart }) {
    useEffect(() => { document.title = "Your Cart - CakeWala"; }, []);

    const [step,        setStep]        = useState("cart");
    const [orderRef,    setOrderRef]    = useState("");
    const [loading,     setLoading]     = useState(false);
    const [form, setForm] = useState({
        contact: "", address: "", city: "", pincode: "", payment_method: "Cash"
    });
    const [isProcessing, setIsProcessing] = useState(false);

    if (!user) {
        return (
            <div className="cart-container page">
                <div className="cart-login-alert">
                    <h2 className="cart-login-alert-title">Please log in to view your cart.</h2>
                    <p className="cart-login-alert-text">Your delicious selections are waiting! Sign in or create an account to view your cart and complete your order.</p>
                    <Link to="/auth" className="cart-login-alert-cta">Log In / Register</Link>
                </div>
            </div>
        );
    }

    const updateQty = (id, delta) => {
        setCart(prev =>
            prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
        );
    };

    const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

    const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cart.length === 0) return;

        setLoading(true);
        setIsProcessing(true);

        await new Promise(resolve => setTimeout(resolve, 2500));

        try {
            let lastOrderRef = "";
            
            for (const item of cart) {
                const res = await fetch(`${API}/orders.php`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        customer_name:  user.name,
                        customer_email: user.email,
                        contact:        form.contact,
                        address:        form.address,
                        city:           form.city,
                        pincode:        form.pincode,
                        cake_id:        item.id,
                        cake_name:      item.name,
                        quantity:       item.qty,
                        total_price:    item.price * item.qty,
                        payment_method: form.payment_method,
                        user_id:        user.id,
                    }),
                });
                const data = await res.json();
                if (data.order_ref) lastOrderRef = data.order_ref;
            }

            setOrderRef(lastOrderRef || "#CW" + Math.floor(1000 + Math.random() * 9000));
            setCart([]);
            setStep("success");
        } catch {
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
            setIsProcessing(false);
        }
    };

    if (step === "success") {
        return (
            <div className="cart-container page">
                <div className="cart-success">
                    <div className="cart-success-icon">🎂</div>
                    <h2>Order Placed!</h2>
                    <p>Your order <strong>{orderRef}</strong> has been received.</p>
                    <p className="cart-success-sub">We'll start baking right away. Check your account for updates.</p>
                    <div className="cart-success-actions">
                        <Link to="/account" className="cart-btn-primary">View Orders</Link>
                        <Link to="/menu" className="cart-btn-secondary">Order More</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (step === "checkout") {
        return (
            <div className="cart-container page">
                <button className="cart-back-btn" onClick={() => setStep("cart")}>← Back to Cart</button>
                <h1 className="cart-title">Checkout</h1>

                <div className="checkout-layout">
                    <div className="checkout-summary">
                        <h3>Order Summary</h3>
                        {cart.map(i => (
                            <div key={i.id} className="checkout-summary-row">
                                <span>{i.name} × {i.qty}</span>
                                <span>₹{i.price * i.qty}</span>
                            </div>
                        ))}
                        <div className="checkout-summary-total">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <form className="checkout-form" onSubmit={handleCheckout}>
                        <h3>Delivery Details</h3>

                        <div className="checkout-field">
                            <label>Contact Number</label>
                            <input
                                type="tel"
                                placeholder="9876543210"
                                required
                                value={form.contact}
                                onChange={e => setForm({ ...form, contact: e.target.value })}
                            />
                        </div>

                        <div className="checkout-field">
                            <label>Full Address</label>
                            <textarea
                                placeholder="Flat/House No., Building, Street..."
                                required
                                rows={3}
                                value={form.address}
                                onChange={e => setForm({ ...form, address: e.target.value })}
                            />
                        </div>

                        <div className="checkout-row">
                            <div className="checkout-field">
                                <label>City</label>
                                <input
                                    type="text"
                                    placeholder="Thane"
                                    value={form.city}
                                    onChange={e => setForm({ ...form, city: e.target.value })}
                                />
                            </div>
                            <div className="checkout-field">
                                <label>Pincode</label>
                                <input
                                    type="text"
                                    placeholder="400601"
                                    value={form.pincode}
                                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="checkout-field">
                            <label>Payment Method</label>
                            <select
                                value={form.payment_method}
                                onChange={e => setForm({ ...form, payment_method: e.target.value })}
                            >
                                <option value="Cash">Cash on Delivery</option>
                                <option value="UPI">UPI</option>
                                <option value="Card">Card</option>
                            </select>
                        </div>

                        <button type="submit" className="checkout-submit-btn" disabled={loading}>
                            {loading ? "Placing Order..." : `Place Order · ₹${total}`}
                        </button>
                    </form>
                </div>

                {isProcessing && (
                    <div className="payment-overlay">
                        <div className="payment-modal">
                            <div className="payment-spinner"></div>
                            <h3>Processing Payment...</h3>
                            <p>Please do not refresh or close this window.</p>
                            <div className="payment-methods-icons">
                                {form.payment_method === "UPI" && <span>📱 UPI</span>}
                                {form.payment_method === "Card" && <span>💳 Card</span>}
                                {form.payment_method === "Cash" && <span>💵 Cash</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="cart-container page">
            <h1 className="cart-title">Your Cart</h1>

            {cart.length === 0 ? (
                <div className="cart-empty">
                    <p className="cart-empty-text">Your cart is empty.</p>
                    <Link to="/menu" className="cart-btn-primary">Browse Menu</Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <div className="cart-item-img">
                                    {item.image_url
                                        ? <img src={item.image_url} alt={item.name} />
                                        : <span>🎂</span>
                                    }
                                </div>
                                <div className="cart-item-info">
                                    <h3 className="cart-item-name">{item.name}</h3>
                                    <p className="cart-item-price">₹{item.price} each</p>
                                </div>
                                <div className="cart-item-qty">
                                    <button onClick={() => updateQty(item.id, -1)}>−</button>
                                    <span>{item.qty}</span>
                                    <button onClick={() => updateQty(item.id, +1)}>+</button>
                                </div>
                                <div className="cart-item-subtotal">₹{item.price * item.qty}</div>
                                <button className="cart-item-remove" onClick={() => removeItem(item.id)}>✕</button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-footer">
                        <div className="cart-total">Total: <strong>₹{total}</strong></div>
                        <button className="cart-btn-primary" onClick={() => setStep("checkout")}>
                            Proceed to Checkout →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
