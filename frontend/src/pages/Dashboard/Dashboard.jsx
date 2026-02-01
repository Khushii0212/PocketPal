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

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

function Dashboard() {
  const { expenses, budget } = useContext(ExpenseContext);

  /* ===== Derived Data ===== */

  // Total expenses
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

  // Categories
  const categories = ["Food", "Travel", "Shopping", "Rent"];

  // Category-wise totals
  const categoryTotals = categories.map((cat) =>
    expenses
      .filter((e) => e.category === cat)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  // Months
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  // Month-wise totals
  const monthlyTotals = months.map((month) =>
    expenses
      .filter((e) => e.month === month)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  /* ===== Chart Data ===== */

  const pieData = {
    labels: categories,
    datasets: [
      {
        data: categoryTotals,
        backgroundColor: [
          "#4f46e5",
          "#16a34a",
          "#f59e0b",
          "#ec4899",
        ],
        borderWidth: 0,
      },
    ],
  };

  const barData = {
    labels: months,
    datasets: [
      {
        label: "Monthly Expenses (₹)",
        data: monthlyTotals,
        backgroundColor: "#4f46e5",
        borderRadius: 8,
        maxBarThickness: 38,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        grid: { color: "#e5e7eb" },
        ticks: {
          callback: (value) => `₹ ${value}`,
        },
      },
    },
  };

  const currentMonth = new Date().toLocaleString("default", {
  month: "short",
});

const currentMonthTotal = expenses
  .filter((e) => e.month === currentMonth)
  .reduce((sum, e) => sum + e.amount, 0);

  const budgetLeft = budget - totalExpenses;
  const isBudgetExceeded = budgetLeft < 0;

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-content">
        <h1 className="dashboard-title">Dashboard</h1>
        {isBudgetExceeded && (
  <div className="budget-warning">
    🚨 You have exceeded your monthly budget by{" "}
    <strong>₹ {Math.abs(budgetLeft)}</strong>
  </div>
)}

        <div className="cards">
          <div className="card">
            <span className="card-icon">💰</span>
            <p>Total Expenses</p>
            <h2>₹ {totalExpenses}</h2>
          </div>

          <div className="card">
            <span className="card-icon">📅</span>
            <p>This Month</p>
            <h2>₹ {currentMonthTotal}</h2>
          </div>

          <div className={`card ${budgetLeft < 0 ? "danger" : "success"}`}>
            <span className="card-icon">👛</span>
            <p>Budget Left</p>
            <h2>₹ {budgetLeft}</h2>
          </div>
        </div>

        {/* ===== Charts ===== */}
        <div className="charts-grid">
          <div className="chart-card">
            <h3 className="chart-title">Expense Distribution</h3>
            <Pie data={pieData} />
          </div>

          <div className="chart-card">
            <h3 className="chart-title">Monthly Expenses (Jan–Dec)</h3>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
