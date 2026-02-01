import React, { useState, useContext } from "react";
import "./Budget.css";
import Navbar from "../../components/Navbar/Navbar";
import { ExpenseContext } from "../../context/ExpenseContext";

function Budget() {
  const { expenses, budget, setBudget } = useContext(ExpenseContext);
  const [inputBudget, setInputBudget] = useState("");

  // Total spent (from expenses)
  const totalSpent = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Remaining budget
  const remaining = budget - totalSpent;

const handleSaveBudget = () => {
  if (!inputBudget) return;
  setBudget(Number(inputBudget));
  setInputBudget("");
};


  return (
    <div className="budget-page">
      <Navbar />

      <div className="budget-content">
        <h1 className="budget-title">Budget</h1>

        {/* Set Monthly Budget */}
        <div className="set-budget-card">
          <h3>Set Monthly Budget</h3>

          <div className="set-budget-form">
            <input
              type="number"
              placeholder="Enter amount (₹)"
              value={inputBudget}
              onChange={(e) => setInputBudget(e.target.value)}
            />
            <button onClick={handleSaveBudget}>Save</button>
          </div>
        </div>

        {/* Budget Summary */}
        <div className="budget-cards">
          <div className="budget-card">
            <p>Monthly Budget</p>
            <h2>₹ {budget}</h2>
          </div>

          <div className="budget-card">
            <p>Total Spent</p>
            <h2>₹ {totalSpent}</h2>
          </div>

          <div className="budget-card success">
            <p>Remaining</p>
            <h2>₹ {remaining}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Budget;
