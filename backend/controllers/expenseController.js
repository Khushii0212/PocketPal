import Expense from "../models/Expense.js";

//  ADD NEW EXPENSE
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, month } = req.body;
    
    const newExpense = new Expense({
      user: req.user.id, 
      title,
      amount,
      category,
      month
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL EXPENSES FOR A USER
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE EXPENSE
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });

    // Check if the expense belongs to the user trying to delete it
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }
    await expense.deleteOne();
    res.status(200).json({ message: "Expense removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};