import axios from "axios";
import dotenv from "dotenv";
import process from "process";

dotenv.config();

export const generateInsights = async (req, res) => {
    try {
        const { analysisResults } = req.body;
        if (!analysisResults) {
            return res.status(400).json({ error: "No analysis results provided" });
        }

        // Send the analysis results to the Gemini API for insights
        const geminiResponse = await axios.post(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
            {
                contents: [{
                    parts: [{
                        text: `Analyze this audio report and provide insights on the audio forgery analysis results. Explain the meaning of each classified forgery type in simple terms that a layperson can understand. For the type of forgery detected, explain how attackers could use it to scam people. Also, provide advice on how users can combat these types of scams and how they can report them. Here's the audio analysis report: ${analysisResults}`
                    }]
                }],
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    key: process.env.GEMINI_API_KEY,
                },
            }
        );

        const insights = geminiResponse.data;
        res.json({ insights });
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};