import express from "express";
import mongoose from "mongoose";
import stockRoutes from "./routes/stock.route.js";  // Import your stock route
import { startCronJob } from "./services/cronjob.service.js";  // Import cron job service

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/stocks", stockRoutes);  // Your stock scraping route

// Database Connection
const DB_URI = "mongodb://localhost:27017/stock-tracker";
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    // After DB connection, start the cron job and listen to the server
    startCronJob(); // Start the cron job
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Failed to connect to MongoDB:", err));


