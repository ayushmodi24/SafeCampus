import { Request, Response } from "express";
import User from "../models/User";
import Module from "../models/Module";

// Get all modules
export const getModules = async (req: Request, res: Response) => {
  try {
    const modules = await Module.find();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: "Error fetching modules", error });
  }
};

// Get user progress
export const getProgress = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate("progress.moduleId");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.progress);
  } catch (error) {
    res.status(500).json({ message: "Error fetching progress", error });
  }
};

// Update user progress
export const updateProgress = async (req: Request, res: Response) => {
  try {
    const { userId, moduleId, completed, score } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const existing = user.progress?.find(
      (p) => p.moduleId.toString() === moduleId
    );

    if (existing) {
      existing.completed = completed;
      if (score !== undefined) existing.score = score;
    } else {
      user.progress?.push({ moduleId, completed, score });
    }

    await user.save();
    res.json({ message: "Progress updated", progress: user.progress });
  } catch (error) {
    res.status(500).json({ message: "Error updating progress", error });
  }
};
