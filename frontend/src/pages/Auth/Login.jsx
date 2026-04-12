import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api"; 
import "./Login.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const data = await loginUser(formData);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      alert("Welcome back! Login Successful.");
      navigate("/dashboard"); 
    } catch (err) {
      alert(err.message || "Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="login-container">
      <div className="bg-mesh"></div>
      <div className="login-card glass">
        <h2 className="text-gradient">Welcome Back</h2>
        <p>Login to manage your finances with PocketPal</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email" 
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Sign In
          </button>
        </form>
        <p className="auth-text">
          Don't have an account?
          <Link to="/register" className="auth-link">Create Account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;