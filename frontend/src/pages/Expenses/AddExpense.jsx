import React, { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "./AddExpense.css";

function AddExpense() {
  const { addExpense } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [month, setMonth] = useState(new Date().toLocaleString("default", { month: "short" }));

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!title || !amount) return;

    addExpense({
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      month,
    });

    setTitle("");
    setAmount("");
  };

  return (
    <div className="add-expense-card">
      <h3>Add New Expense</h3>
      <form className="form-row" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="What did you buy?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount (₹)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Rent">Rent</option>
        </select>

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <button type="button" onClick={handleAddExpense}>Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;