import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import "./Expenses.css";

function Expenses() {
  return (
    <div className="expenses-page">
      <div className="bg-mesh"></div>
      <Navbar />
      <div className="expenses-content">
        <h1 className="expenses-title text-gradient">Manage Expenses</h1>
        <AddExpense />
        <ExpenseList />
      </div>
    </div>
  );
}

export default Expenses;