import express from "express";
import { generateInsights } from "./Controllers/insightsController.js";
import {userLogin} from "./Controllers/userController.js"

const router = express.Router();

export default router;