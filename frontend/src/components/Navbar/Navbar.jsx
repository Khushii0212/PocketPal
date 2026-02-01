import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">PocketPal</div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/budget">Budget</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
