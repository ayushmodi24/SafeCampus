import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import config from "./config/db";
import authRoutes from "./routes";

const app = express();

// MongoDB connection
mongoose
  .connect(config.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Middleware
app.use(cors({ origin: config.CORS_ORIGIN }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(config.PORT, () => {
  console.log(`🚀 Server running on port ${config.PORT}`);
});
