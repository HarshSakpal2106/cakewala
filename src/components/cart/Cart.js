import "./Cart.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Cart() {
  useEffect(() => {
    document.title = "Your Cart";
  }, []);

  return (
    <div className="cart-container page">
      <div className="cart-login-alert">
        <h2 className="cart-login-alert-title">Please log in to view your cart.</h2>
        <p className="cart-login-alert-text">Your delicious selections are waiting!Please sign in or create an account to view your cart and complete your order.</p>
        <Link to="/auth" className="cart-login-alert-cta">Log In / Register</Link>
      </div>
    </div>
  );
}

export default Cart;