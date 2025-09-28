import { Router } from "express";
import { getProfile, updateProfile, updateProgress } from "../controllers/profile";

const router = Router();

router.get("/", getProfile); // GET /api/profile
router.put("/update", updateProfile); // PUT /api/profile/update
router.put("/progress", updateProgress); // PUT /api/profile/progress

export default router;
