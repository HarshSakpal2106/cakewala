import React, { useState, useEffect } from "react";
import "./Auth.css";
import logo from "../../assets/logo.svg";

function Auth() {
  useEffect(() => {
    document.title = "User Login";
  }, []);

  const [tab, setTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setErr("");
    setSuccess("Logged in successfully! Welcome back");
    setTimeout(() => setSuccess(""), 4000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirm) {
      setErr("Passwords do not match."); return;
    }
    if (registerForm.password.length < 6) {
      setErr("Password must be at least 6 characters."); return;
    }
    setErr("");
    setSuccess("Account created! Welcome to CakeWala 🎉");
    setTimeout(() => setSuccess(""), 4000);
  };

  return (
    <div className="auth-container page">
      <div className="auth-container-inner">
        <div className="auth-left-panel">
          <div className="auth-left-content">
            <div className="auth-brand"><img src={logo} alt="CakeWala Logo" /></div>
            <h2>Welcome to CakeWala</h2>
            <p>Sign in to track your orders, save your favourites, and place custom cake requests.</p>
          </div>
        </div>
        <div className="auth-right-panel">
          <div className="auth-tabs">
            <button
              className={`auth-tab ${tab === "login" ? "active" : ""}`}
              onClick={() => { setTab("login"); setErr(""); }}
            >
              Sign In
            </button>
            <button
              className={`auth-tab ${tab === "register" ? "active" : ""}`}
              onClick={() => { setTab("register"); setErr(""); }}
            >
              Register
            </button>
          </div>
          {tab === "login" && (
            <div className="login-container">
              <div className="auth-form-header">
                <h3>Welcome back!</h3>
                <p>Sign in to your CakeWala account</p>
              </div>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Password
                    <a href="#" className="forgot-link">Forgot password?</a>
                  </label>
                  <input
                    className="form-input"
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                </div>
                <div className="form-check">
                  <input type="checkbox" id="rememberMe" />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                {err && <div className="form-error">{err}</div>}
                {success && <div className="form-success">{success}</div>}
                <button type="submit" className="btn-submit">
                  Log In
                </button>
              </form>
              <p className="auth-switch">
                Don't have an account?{" "}
                <span onClick={() => { setTab("register"); setErr(""); }}>
                  Register here
                </span>
              </p>
            </div>
          )}
          {tab === "register" && (
            <div className="register-container">
              <div className="auth-form-header">
                <h3>Create an account</h3>
                <p>Join hundreds of happy CakeWala customers</p>
              </div>
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    className="form-input"
                    required
                    placeholder="Harshwardhan Sakpal"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    className="form-input"
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      className="form-input"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Confirm Password</label>
                    <input
                      className="form-input"
                      type="password"
                      required
                      placeholder="••••••••"
                      value={registerForm.confirm}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirm: e.target.value })}
                    />
                  </div>
                </div>
                <div className="form-check">
                  <input type="checkbox" id="agreeTerms" required />
                  <label htmlFor="agreeTerms">I agree to the <a href="#">Terms & Conditions</a></label>
                </div>
                {err && <div className="form-error">{err}</div>}
                {success && <div className="form-success">{success}</div>}
                <button type="submit" className="btn-submit">
                  Create Account
                </button>
              </form>
              <p className="auth-switch">
                Already have an account?{" "}
                <span onClick={() => { setTab("login"); setErr(""); }}>
                  Sign in here
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;