import express from "express";
// import { addFamilyVoiceSample } from "../Controllers/userController.js";
// import { uploadAudio } from "../Controllers/audioController.js";
// import { userSignup,userLogin } from "../Controllers/userController.js";
 // Already configured for GridFS uploads
import { generateInsights } from "../Controllers/insightsController.js";
const router = express.Router();

// Endpoint to add a family voice sample (audio file uploaded will be stored in MongoDB)
// router.post("/upload-family-audio", uploadAudio, addFamilyVoiceSample);
router.post("/analyze-audio", generateInsights);
// router.post("/login",userLogin);
// router.post("/signup",userSignup);

export default router;