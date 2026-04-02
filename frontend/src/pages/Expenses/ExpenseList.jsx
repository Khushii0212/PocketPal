import React, { useContext, useState } from "react";
import "./ExpenseList.css";
import { ExpenseContext } from "../../context/ExpenseContext";

function ExpenseList() {
  const { expenses, deleteExpense, editExpense } = useContext(ExpenseContext);
  const [editingId, setEditingId] = useState(null);
  const [editedAmount, setEditedAmount] = useState("");

  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setEditedAmount(expense.amount);
  };

  const handleSave = (expense) => {
    editExpense({
      ...expense,
      amount: Number(editedAmount),
    });
    setEditingId(null);
  };

  return (
    <div className="expense-list-card">
      <h3>Recent Transactions</h3>

      {expenses.length === 0 ? (
        <p className="empty">No expenses added yet. Start by adding one above!</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id} className="expense-row">
            <div className="expense-info">
              <span className="category-tag">{expense.category}</span>
              <span className="expense-title">{expense.title}</span>
            </div>

            <div className="expense-value-section">
              {editingId === expense.id ? (
                <input
                  className="edit-input"
                  type="number"
                  value={editedAmount}
                  onChange={(e) => setEditedAmount(e.target.value)}
                  autoFocus
                />
              ) : (
                <span className="expense-amount">₹ {expense.amount.toLocaleString()}</span>
              )}
            </div>

            <div className="actions">
              {editingId === expense.id ? (
                <button className="save" onClick={() => handleSave(expense)}>
                  Save
                </button>
              ) : (
                <button className="edit" onClick={() => handleEdit(expense)}>
                  Edit
                </button>
              )}

              <button className="delete" onClick={() => deleteExpense(expense.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default ExpenseList;