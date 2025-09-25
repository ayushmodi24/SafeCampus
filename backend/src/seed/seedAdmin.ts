import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User"; // Adjust path if needed
import config from "../config/db";

const createAdmin = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("MongoDB connected");

    const existingAdmin = await User.findOne({ email: "modiayush908@gmail.com" });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("ayush123", 10);

    const admin = new User({
      name: "Ayush",
      email: "modiayush908@gmail.com",
      password: hashedPassword,
      role: "admin",
      isActive: true
    });

    await admin.save();
    console.log("✅ Admin created successfully");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
