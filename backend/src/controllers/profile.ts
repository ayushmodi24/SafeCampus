import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config/db";

// Get student profile
export const getProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Fetch profile failed", err });
  }
};

// Update student profile
export const updateProfile = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { college, school } = req.body;
    // if (!college || !school) return res.status(400).json({ message: "College & School required" });
     if ((!college && !school) || (college && school)) {
      return res
        .status(400)
        .json({ message: "Please fill either College or School, not both." });
    }

    user.college = college;
    user.school = school;

    await user.save();
    res.json({ message: "Profile updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Profile update failed", err });
  }
};

// Update progress for a module
export const updateProgress = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token" });

    const token = authHeader.split(" ")[1];
    const decoded: any = jwt.verify(token, config.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const { moduleId, completed, score } = req.body;
    if (moduleId === undefined || completed === undefined)
      return res.status(400).json({ message: "ModuleId and completed required" });

    const existingModule = user.progress?.find((p) => p.moduleId === moduleId);
    if (existingModule) {
      existingModule.completed = completed;
      existingModule.score = score;
    } else {
      user.progress = [...(user.progress || []), { moduleId, completed, score }];
    }

    await user.save();
    res.json({ message: "Progress updated successfully", progress: user.progress });
  } catch (err) {
    res.status(500).json({ message: "Update progress failed", err });
  }
};
