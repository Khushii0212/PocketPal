import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api"; // Importing our fetch messenger
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
      const data = await registerUser(formData);
      alert(data.message || "Registration Successful!");
      navigate("/"); 
    } catch (err) {
      // Shows exact error message from backend (e.g., "User already exists")
      alert(err.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="bg-mesh"></div>
      <div className="register-card glass">
        <h2 className="text-gradient">Create Account</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>
          Join PocketPal and start managing your wealth
        </p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="name" 
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
              placeholder="Create Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="register-btn">
            Get Started
          </button>
        </form>
        <p className="auth-text">
          Already have an account?
          <Link to="/" className="auth-link">Login Here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;