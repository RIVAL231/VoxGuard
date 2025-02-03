import express from "express";
import { addFamilyVoiceSample } from "../Controllers/userController.js";
import { uploadAudio,userLogin } from "../Controllers/audioController.js"; // Already configured for GridFS uploads
import { generateInsights } from "../Controllers/insightsController.js";
const router = express.Router();

// Endpoint to add a family voice sample (audio file uploaded will be stored in MongoDB)
router.post("/upload-family-audio", uploadAudio, addFamilyVoiceSample);

router.post("/analyze-audio", generateInsights);
router.post("/login",userLogin);

export default router;