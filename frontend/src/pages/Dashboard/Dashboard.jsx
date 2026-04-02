import React, { useContext } from "react";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { ExpenseContext } from "../../context/ExpenseContext";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Dashboard() {
  const { expenses, budget } = useContext(ExpenseContext);

  // --- Logic ---
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const budgetLeft = budget - totalExpenses;
  const isBudgetExceeded = budgetLeft < 0;

  const categories = ["Food", "Travel", "Shopping", "Rent"];
  const categoryTotals = categories.map((cat) =>
    expenses.filter((e) => e.category === cat).reduce((sum, e) => sum + e.amount, 0)
  );

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTotals = months.map((month) =>
    expenses.filter((e) => e.month === month).reduce((sum, e) => sum + e.amount, 0)
  );

  const currentMonth = new Date().toLocaleString("default", { month: "short" });
  const currentMonthTotal = expenses
    .filter((e) => e.month === currentMonth)
    .reduce((sum, e) => sum + e.amount, 0);

  // --- Chart Data ---
  const pieData = {
    labels: categories,
    datasets: [{
      data: categoryTotals,
      backgroundColor: ["#4f46e5", "#16a34a", "#f59e0b", "#ec4899"],
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: months,
    datasets: [{
      label: "Monthly Expenses (₹)",
      data: monthlyTotals,
      backgroundColor: "#4f46e5",
      borderRadius: 8,
    }],
  };

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>

        {isBudgetExceeded && (
          <div className="budget-warning">
            🚨 You have exceeded your monthly budget by <strong>₹ {Math.abs(budgetLeft)}</strong>
          </div>
        )}

        <div className="cards">
          <div className="card">
            <span className="card-icon">💰</span>
            <p>Total Expenses</p>
            <h2>₹ {totalExpenses.toLocaleString()}</h2>
          </div>

          <div className="card">
            <span className="card-icon">📅</span>
            <p>This Month</p>
            <h2>₹ {currentMonthTotal.toLocaleString()}</h2>
          </div>

          <div className={`card ${isBudgetExceeded ? "danger" : "success"}`}>
            <span className="card-icon">👛</span>
            <p>Budget Left</p>
            <h2>₹ {budgetLeft.toLocaleString()}</h2>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Expense Distribution</h3>
            <Pie data={pieData} />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Monthly Overview</h3>
            <Bar data={barData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;