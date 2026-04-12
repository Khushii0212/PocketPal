import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar glass">
      <div className="nav-logo text-gradient">PocketPal</div>

      <div className="nav-links">
        <Link to="/dashboard" className={isActive("/dashboard") ? "active" : ""}>
          Dashboard
        </Link>
        <Link to="/expenses" className={isActive("/expenses") ? "active" : ""}>
          Expenses
        </Link>
        <Link to="/budget" className={isActive("/budget") ? "active" : ""}>
          Budget
        </Link>
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle Theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        <Link to="/" className="logout-link">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;
