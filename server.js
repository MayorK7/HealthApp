import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import Database
import connectDB from "./config/db.js";

// Import Routes
import authRoutes from "./routes/authroute.js";
import medicationRoute from "./routes/medicationroute.js";
import dashboardRoute from "./routes/dashboardroute.js";
import reminderRoute from "./routes/reminderroute.js";
import adminRoute from "./routes/adminroute.js";
import newsRoute from "./routes/newsroute.js";
import notificationRoute from "./routes/notificationroute.js";
// import "./cron/reminderCron.js";
import adminNotificationRoute from "./routes/adminNotificationRoute.js";
import doseRoute from "./routes/doseroute.js";

// Load Environment Variables
dotenv.config();

await import("./cron/reminderCron.js");

// Connect to MongoDB
connectDB();

// Create Express App
const app = express();

// __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ==============================
// Middlewares
// ==============================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

app.use("/uploads", express.static("uploads"));

// ==============================
// API Routes
// ==============================

app.use("/api/auth", authRoutes);
app.use("/api/med", medicationRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/reminders", reminderRoute);
app.use("/api/admin", adminRoute);
app.use("/api/news",newsRoute);
app.use("/api/notifications",notificationRoute);
app.use("/api/admin/notifications",adminNotificationRoute);

// ==============================
// Home Route
// ==============================

// app.get("/", (req, res) => {
//   res.send("🚀 Mobile Health Management System API is Running...");
// });


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
// ==============================
// 404 Route
// ==============================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});