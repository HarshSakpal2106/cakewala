import "./Cart.css";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Cart({ user }) {
  useEffect(() => {
    document.title = "Your Cart";
  }, []);

  if (!user) {
    return (
      <div className="cart-container page">
        <div className="cart-login-alert">
          <h2 className="cart-login-alert-title">Please log in to view your cart.</h2>
          <p className="cart-login-alert-text">Your delicious selections are waiting! Please sign in or create an account to view your cart and complete your order.</p>
          <Link to="/auth" className="cart-login-alert-cta">Log In / Register</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container page">
      <h1 className="cart-title">Your Cart</h1>
      <p className="cart-empty-text">Your cart is empty. <Link to="/menu">Browse our menu</Link></p>
    </div>
  );
}

export default Cart;