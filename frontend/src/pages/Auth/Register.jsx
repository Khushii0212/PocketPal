import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  return (
    <div className="register-container">
      <h2>Register</h2>

      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button>Register</button>

      <p className="auth-text">
        Already have an account?{" "}
        <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;
