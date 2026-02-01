import { createContext, useState, useEffect } from "react";

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  // Expenses state
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // Budget state
  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem("budget");
    return saved ? Number(saved) : 0;
  });

  // ✅ ADD EXPENSE FUNCTION (THIS WAS MISSING)
  const addExpense = (expense) => {
    setExpenses((prev) => [...prev, expense]);
  };
   
  // ✅ DELETE EXPENSE
const deleteExpense = (id) => {
  setExpenses((prev) => prev.filter((e) => e.id !== id));
};

// ✅ EDIT EXPENSE
const editExpense = (updatedExpense) => {
  setExpenses((prev) =>
    prev.map((e) =>
      e.id === updatedExpense.id ? updatedExpense : e
    )
  );
};

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Persist budget
  useEffect(() => {
    localStorage.setItem("budget", budget);
  }, [budget]);

  return (
    <ExpenseContext.Provider
  value={{
    expenses,
    addExpense,
    deleteExpense,
    editExpense,
    budget,
    setBudget,
  }}
>

      {children}
    </ExpenseContext.Provider>
  );
};
