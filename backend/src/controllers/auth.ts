// import { Request, Response } from "express";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User";
// import config from "../config/db";

// // Student signup
// export const studentSignup = async (req: Request, res: Response) => {
//   try {
//     const { name, email, password } = req.body;

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const student = new User({ name, email, password: hashedPassword, role: "student", isActive: true });
//     await student.save();

//     res.status(201).json({ message: "Student registered successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Signup failed", error });
//   }
// };

// // // Admin creates teacher/parent
// // export const createUserByAdmin = async (req: Request, res: Response) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     if (!["teacher", "parent"].includes(role)) {
// //       return res.status(400).json({ message: "Invalid role. Only teacher/parent can be created by admin" });
// //     }

// //     const existingUser = await User.findOne({ email });
// //     if (existingUser) return res.status(400).json({ message: "User already exists" });

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({ name, email, password: hashedPassword, role });
// //     await newUser.save();

// //     res.status(201).json({ message: `${role} account created successfully` });
// //   } catch (error) {
// //     res.status(500).json({ message: "Admin user creation failed", error });
// //   }
// // };


// // Admin creates teacher/parent/admin
// export const createUserByAdmin = async (req: Request, res: Response) => {
//   try {
//     const { name, email, role } = req.body;

//     if (!["teacher", "parent", "admin"].includes(role)) {
//       return res.status(400).json({ message: "Invalid role. Only teacher/parent/admin can be created by admin" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     // Create user without password (inactive)
//     const newUser = new User({ name, email, role, password: "", isActive: false });
//     await newUser.save();

//     // Generate token for setting password (expires in 24h)
//     const token = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: "24h" });

//     const setupLink = `http://localhost:5173/set-password/${token}`; // frontend link

//     res.status(201).json({ message: `${role} account created`, setupLink });
//   } catch (error) {
//     res.status(500).json({ message: "Admin user creation failed", error });
//   }
// };

// // User sets password via setup link
// export const setPassword = async (req: Request, res: Response) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;
//     if (!password) return res.status(400).json({ message: "Password required" });

//     const decoded: any = jwt.verify(token, config.JWT_SECRET);
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const hashed = await bcrypt.hash(password, 10);
//     user.password = hashed;
//     user.isActive = true;
//     await user.save();

//     res.status(200).json({ message: "Password set successfully. You can now login." });
//   } catch (error) {
//     res.status(400).json({ message: "Invalid or expired token", error });
//   }
// };


// // Login
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { email, password, role } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

//     if (role && user.role !== role) {
//       return res.status(403).json({ message: `You are not authorized as ${role}` });
//     }

//     const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, {
//       expiresIn: "1d",
//     });

//     res.json({
//       message: "Login successful",
//       token,
//       user: { id: user._id, name: user.name, email: user.email, role: user.role },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login failed", error });
//   }
// };
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config/db";

// Student signup
export const studentSignup = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = new User({
      name,
      email,
      password: hashedPassword,
      role: "student",
      isActive: true,
    });
    await student.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error });
  }
};

// Admin creates teacher/parent/admin
export const createUserByAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, role } = req.body;

    if (!["teacher", "parent", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Generate a temporary password
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      isActive: false,
    });
    await newUser.save();

    // Create setup password link
    const setupToken = jwt.sign({ id: newUser._id }, config.JWT_SECRET, { expiresIn: "1d" });
    const setupLink = `http://localhost:5173/setup-password/${setupToken}`;

    res.status(201).json({ message: `${role} account created`, setupLink });
  } catch (error) {
    res.status(500).json({ message: "Admin user creation failed", error });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    if (role && user.role !== role) {
      return res.status(403).json({ message: `Not authorized as ${role}` });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, config.JWT_SECRET, { expiresIn: "1d" });

    res.json({ message: "Login successful", token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};
// Setup password
export const setupPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;
    const decoded: any = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    user.isActive = true;
    await user.save();

    res.json({ message: "Password set successfully" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
