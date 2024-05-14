import express from "express";
import { getMoods } from "../controllers/mood.js";
const router = express.Router();

router.get("/", getMoods);

export default router;
