const BASE_URL = "http://localhost:5000/api";


const request = async (endpoint, method = "GET", body = null) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };
  if (body) {
    config.body = JSON.stringify(body);
  }
  const response = await fetch(`${BASE_URL}${endpoint}`, config);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
  return data;
};

export const registerUser = (userData) => request("/auth/register", "POST", userData);
export const loginUser = (userData) => request("/auth/login", "POST", userData);

// Expense Actions
export const fetchExpenses = () => request("/expenses", "GET");
export const createExpense = (expenseData) => request("/expenses", "POST", expenseData);
export const removeExpense = (id) => request(`/expenses/${id}`, "DELETE");