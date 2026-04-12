import React, { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import "./ExpenseList.css";

function ExpenseList() {
  const { expenses, deleteExpense, updateExpense } = useContext(ExpenseContext);
  const [editId, setEditId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const handleEdit = (expense) => {
    setEditId(expense.id);
    setEditAmount(expense.amount);
  };

  const handleSave = (id) => {
    updateExpense(id, { amount: Number(editAmount) });
    setEditId(null);
  };

  return (
    <div className="expense-list-card glass">
      <h3 className="text-gradient">Recent Transactions</h3>
      {expenses.length === 0 ? (
        <p className="empty">No expenses recorded yet. Time to log something!</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} className="expense-row">
            <div className="expense-info">
              <span className="expense-title">{expense.title}</span>
              <span className="expense-meta">
                {expense.category} • {expense.month}
              </span>
            </div>
            
            {editId === expense.id ? (
              <input
                type="number"
                value={editAmount}
                onChange={(e) => setEditAmount(e.target.value)}
              />
            ) : (
              <span className="expense-amount">₹ {expense.amount.toLocaleString()}</span>
            )}

            <div className="actions">
              {editId === expense.id ? (
                <button className="save" onClick={() => handleSave(expense.id)} title="Save">
                  💾
                </button>
              ) : (
                <button className="edit" onClick={() => handleEdit(expense)} title="Edit">
                  ✏️
                </button>
              )}
              <button className="delete" onClick={() => deleteExpense(expense.id)} title="Delete">
                🗑️
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;