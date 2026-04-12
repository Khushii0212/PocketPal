import React, { useState, useContext } from "react";
import "./Budget.css";
import Navbar from "../../components/Navbar/Navbar";
import { ExpenseContext } from "../../context/ExpenseContext";

function Budget() {
  const { expenses, budget, setBudget } = useContext(ExpenseContext);
  const [inputBudget, setInputBudget] = useState("");
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remaining = budget - totalSpent;
  const spendPercentage = budget > 0 ? Math.min((totalSpent / budget) * 100, 100) : 0;

  const handleSaveBudget = () => {
    if (!inputBudget || inputBudget <= 0) return;
    setBudget(Number(inputBudget));
    setInputBudget("");
    alert("Monthly Budget Updated!");
  };

  return (
    <div className="budget-page">
      <div className="bg-mesh"></div>
      <Navbar />

      <div className="budget-content">
        <h1 className="budget-title text-gradient">Financial Planning</h1>

        <div className="set-budget-card glass">
          <div className="card-header">
            <h3>Set Monthly Target</h3>
            <p>Plan your spending for better savings and wealth growth.</p>
          </div>

          <div className="set-budget-form">
            <div className="input-wrapper">
              <span className="currency-symbol">₹</span>
              <input
                type="number"
                placeholder="Enter amount"
                value={inputBudget}
                onChange={(e) => setInputBudget(e.target.value)}
              />
            </div>
            <button className="save-btn" onClick={handleSaveBudget}>Update Budget</button>
          </div>
        </div>

        <div className="budget-summary-grid">
          <div className="summary-card glass">
            <span className="summary-icon">🎯</span>
            <div className="summary-info">
              <p>Budget Limit</p>
              <h2>₹ {budget.toLocaleString()}</h2>
            </div>
          </div>

          <div className="summary-card glass">
            <span className="summary-icon">💸</span>
            <div className="summary-info">
              <p>Total Spent</p>
              <h2>₹ {totalSpent.toLocaleString()}</h2>
            </div>
          </div>

          <div className={`summary-card glass ${remaining < 0 ? "danger" : "success"}`}>
            <span className="summary-icon">{remaining < 0 ? "🚨" : "✅"}</span>
            <div className="summary-info">
              <p>{remaining < 0 ? "Over Budget" : "Balance Left"}</p>
              <h2>₹ {remaining.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        <div className="progress-section glass">
          <div className="progress-label">
            <span>Budget Utilization</span>
            <span>{spendPercentage.toFixed(0)}%</span>
          </div>
          <div className="progress-track">
            <div 
              className={`progress-bar ${spendPercentage > 90 ? "critical" : ""}`} 
              style={{ width: `${spendPercentage}%` }}
            ></div>
          </div>
          <p className="progress-help">
            {remaining < 0 
              ? "Warning: You have exceeded your budget limit! Consider reviewing your expenses." 
              : `Strength! You still have ₹ ${remaining.toLocaleString()} available for this month.`}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Budget;