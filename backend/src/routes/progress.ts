import { Router } from "express";
import { getModules, getProgress, updateProgress } from "../controllers/progress";

const router = Router();

router.get("/modules", getModules);               // get all learning modules
router.get("/progress/:userId", getProgress);     // get user progress
router.post("/progress", updateProgress);         // update user progress

export default router;
