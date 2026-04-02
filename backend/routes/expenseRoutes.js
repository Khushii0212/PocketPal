import express from "express";
import { addExpense, getExpenses, deleteExpense } from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// We put "protect" here so only logged-in users can use these

router.route("/").post(protect, addExpense).get(protect, getExpenses);
router.route("/:id").delete(protect, deleteExpense);

export default router;