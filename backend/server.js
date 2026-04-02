import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

dotenv.config(); // This loads your MONGO_URI from the .env file

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // VERY IMPORTANT: This allows your React frontend to talk to this backend

app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);

// Database Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ PocketPal Brain Connected to Database!"))
  .catch((err) => console.log("❌ DB Connection Error:", err.message));

// Test GET route
app.get("/", (req, res) => {
  res.send("PocketPal Backend is awake and running...");
});

// Test POST route
app.post("/test", (req, res) => {
  res.json({
    message: "Data received successfully",
    data: req.body,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server flying on http://localhost:${PORT}`);
});