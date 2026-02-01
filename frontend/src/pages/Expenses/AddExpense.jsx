import React, { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "./AddExpense.css";

function AddExpense() {
  const { addExpense } = useContext(ExpenseContext);

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [month, setMonth] = useState("Jan");

  const handleAddExpense = () => {
    if (!title || !amount) return;

    addExpense({
      id: Date.now(),
      title,
      amount: Number(amount),
      category,
      month: new Date().toLocaleString("default", { month: "short" }),
    });

    setTitle("");
    setAmount("");
  };

  return (
    <div className="add-expense-card">
      <h3>Add Expense</h3>

      <div className="form-row">
        <input
          type="text"
          placeholder="Title"
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
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Rent</option>
        </select>

        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option>Jan</option>
          <option>Feb</option>
          <option>Mar</option>
          <option>Apr</option>
          <option>May</option>
          <option>Jun</option>
          <option>Jul</option>
          <option>Aug</option>
          <option>Sep</option>
          <option>Oct</option>
          <option>Nov</option>
          <option>Dec</option>
        </select>

        <button onClick={handleAddExpense}>Add</button>
      </div>
    </div>
  );
}

export default AddExpense;
