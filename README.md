# 👛 PocketPal - Premium Student Expense Tracker

PocketPal is a full-stack **MERN** (MongoDB, Express, React, Node.js) application designed to help students take absolute control of their finances. It features a state-of-the-art, immersive interface with real-time data visualization and secure authentication.

## ✨ Key Features & Recent Upgrades

### 🎨 Premium UI/UX Overhaul (New!)
- **Glassmorphic Design System**: A sophisticated interface with backdrop blurs, soft borders, and an elegant floating navigation bar.
- **Dynamic Theme Engine**: Full support for both **Dark Mode** and **Vibrant Light Mode**, accessible via a smooth theme toggle.
- **Animated Background Mesh**: A custom-built, high-performance animated radial gradient mesh that adds depth and life to every page.
- **Immersive Layout**: Rebalanced UI scaling for a full-screen feel while maintaining optimal readability on laptops and desktops.
- **Modern Typography**: Uniform use of the **Outfit** font family from Google Fonts for a premium, clean aesthetic.

### 💰 Financial Management
- **Smart Budgeting**: Set monthly targets and receive real-time visual progress monitoring (Progress Bars & Dynamic Alerts).
- **Comprehensive Expense Tracking**: Log expenses with detailed metadata (title, amount, category, date) using a sleek, interactive form.
- **Data-Driven Insights**: Interactive **Pie Charts** for category breakdowns and **Bar Charts** for trend analysis (powered by Chart.js).

### 🔒 Core Functionality
- **Secure Authentication**: Robust Login & Register system using **JWT** and **Bcrypt** hashing.
- **Responsive Engineering**: Fully optimized for a flawless experience across mobile phones, tablets, and laptops.

## 🛠️ Tech Stack
- **Frontend**: React.js, Chart.js, CSS3 (Custom Glass-UI Logic)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **State/Theme**: React Context API (Auth & Theme management)

## 📦 Local Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Khushii0212/PocketPal.git
   ```

2. **Backend Setup**:
   - Navigate to `backend/`
   - Run `npm install`
   - Create a `.env` file and add:
     ```env
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```
   - Start the server: `npm start`

3. **Frontend Setup**:
   - Navigate to `frontend/`
   - Run `npm install`
   - Start the application: `npm start`

👤 **About the Developer**
Built with ❤️ by **Khushi Prasad**
Aspiring Full-Stack Developer | Passionate about creating clean, functional, and premium web solutions.
