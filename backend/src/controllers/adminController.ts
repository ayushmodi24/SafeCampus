import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config/db";

// Admin creates user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, role } = req.body;
  if (!name || !email || !role) return res.status(400).json({ message: "Missing fields" });

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, role, password: "", isActive: false });
    await newUser.save();

    // Generate password setup token (expires in 24h)
    const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: "24h" });
    const setupLink = `http://localhost:5173/set-password/${token}`; // frontend link

    // Normally send email here. For now, return link in response
    res.status(201).json({ message: "User created", setupLink });
  } catch (err) {
    res.status(500).json({ message: "Server error", err });
  }
};

// User sets password
export const setPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: "Password required" });

  try {
    const decoded: any = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const hashed = await bcrypt.hash(password, 10);
    user.password = hashed;
    user.isActive = true;
    await user.save();

    res.status(200).json({ message: "Password set successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token", err });
  }
};
