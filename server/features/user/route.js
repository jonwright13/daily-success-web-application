import express from "express";
import { fetchGoal, updateGoal } from "./controller.js";

const router = express.Router();

router.get("/goal", fetchGoal);
router.put("/goal", updateGoal);

export default router;
