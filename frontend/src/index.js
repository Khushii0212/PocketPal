import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ExpenseProvider } from "./context/ExpenseContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ThemeProvider>
    <ExpenseProvider>
      <App />
    </ExpenseProvider>
  </ThemeProvider>
);

