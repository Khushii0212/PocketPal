import React, { useContext, useState } from "react";
import "./ExpenseList.css";
import { ExpenseContext } from "../../context/ExpenseContext";

function ExpenseList() {
  const { expenses, deleteExpense, editExpense } =
    useContext(ExpenseContext);

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
      <h3>Recent Expenses</h3>

      {expenses.length === 0 && (
        <p className="empty">No expenses added yet.</p>
      )}

      {expenses.map((expense) => (
        <div key={expense.id} className="expense-row">
          <span>
            {expense.category} — {expense.title}
          </span>

          {editingId === expense.id ? (
            <input
              type="number"
              value={editedAmount}
              onChange={(e) =>
                setEditedAmount(e.target.value)
              }
            />
          ) : (
            <span>₹ {expense.amount}</span>
          )}

          <div className="actions">
            {editingId === expense.id ? (
              <button
                className="save"
                onClick={() => handleSave(expense)}
              >
                Save
              </button>
            ) : (
              <button
                className="edit"
                onClick={() => handleEdit(expense)}
              >
                Edit
              </button>
            )}

            <button
              className="delete"
              onClick={() => deleteExpense(expense.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ExpenseList;
