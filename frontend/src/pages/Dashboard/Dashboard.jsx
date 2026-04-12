import React, { useContext } from "react";
import "./Dashboard.css";
import Navbar from "../../components/Navbar/Navbar";
import { ExpenseContext } from "../../context/ExpenseContext";
import { ThemeContext } from "../../context/ThemeContext";
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
  const { theme } = useContext(ThemeContext);

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
  const chartTextColor = theme === "light" ? "#475569" : "#94a3b8";
  
  const pieData = {
    labels: categories,
    datasets: [{
      data: categoryTotals,
      backgroundColor: ["#6366f1", "#10b981", "#f59e0b", "#ec4899"],
      borderWidth: 0,
    }],
  };

  const barData = {
    labels: months,
    datasets: [{
      label: "Monthly Expenses (₹)",
      data: monthlyTotals,
      backgroundColor: theme === "light" ? "#6366f1" : "#818cf8",
      borderRadius: 12,
    }],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: chartTextColor,
          font: { family: 'Outfit', size: 14 }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: chartTextColor },
        grid: { display: false }
      },
      y: {
        ticks: { color: chartTextColor },
        grid: { color: theme === "light" ? "rgba(0,0,0,0.05)" : "rgba(255,255,255,0.05)" }
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="bg-mesh"></div>
      <Navbar />

      <div className="dashboard-content">
        <h1 className="dashboard-title">
          <span className="text-gradient">Financial Overview</span>
        </h1>

        {isBudgetExceeded && (
          <div className="budget-warning">
            <span>🚨</span>
            <p>You have exceeded your monthly budget by <strong>₹ {Math.abs(budgetLeft).toLocaleString()}</strong></p>
          </div>
        )}

        <div className="cards">
          <div className="card glass">
            <span className="card-icon">💰</span>
            <p>Total Expenses</p>
            <h2>₹ {totalExpenses.toLocaleString()}</h2>
          </div>

          <div className="card glass">
            <span className="card-icon">📅</span>
            <p>This Month</p>
            <h2>₹ {currentMonthTotal.toLocaleString()}</h2>
          </div>

          <div className={`card glass ${isBudgetExceeded ? "danger" : "success"}`}>
            <span className="card-icon">👛</span>
            <p>Budget Left</p>
            <h2>₹ {budgetLeft.toLocaleString()}</h2>
          </div>
        </div>

        <div className="charts-grid">
          <div className="chart-card glass">
            <h3 className="chart-title">Expense Distribution</h3>
            <div style={{ height: "300px" }}>
              <Pie data={pieData} options={chartOptions} />
            </div>
          </div>

          <div className="chart-card glass">
            <h3 className="chart-title">Monthly Overview</h3>
            <div style={{ height: "300px" }}>
              <Bar data={barData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;