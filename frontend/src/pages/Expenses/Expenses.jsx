import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import AddExpense from "./AddExpense";
import ExpenseList from "./ExpenseList";
import "./Expenses.css";

function Expenses() {
  return (
    <div className="expenses-page">
      <Navbar />
      <div className="expenses-content">
        <h1 className="expenses-title">Expenses</h1>
        <AddExpense />
        <ExpenseList />
      </div>
    </div>
  );
}

export default Expenses;