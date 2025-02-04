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

        // Assume analysisResults includes:
        // predicted_class: number (0 means real audio; others mean forgery)
        // probabilities: array of numbers
        // message: string representing the type of forgery (if any)
        const { predicted_class, probabilities, message } = analysisResults;
        const maxProbability = Array.isArray(probabilities) ? Math.max(...probabilities) : null;

        let structuredResponse = {};

        // If audio is real, no need to call Gemini API
        if (predicted_class === 0) {
            structuredResponse = {
                forgeryType: "Real",
                forgeryProbability: maxProbability,
                result: "The audio is real.",
                timestamp: new Date().toISOString()
            };
        } else {
            // For forgery, call Gemini API to get detailed insights
            const geminiResponse = await axios.post(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
                {
                    contents: [{
                        parts: [{
                            text: `The audio analysis report indicates a forgery detected as: ${message}. The model probability is ${maxProbability}. 
Provide a simple explanation of what this forgery type means, how scammers could use it to scam people, and advice on how users can protect themselves and report such scams.`
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

            // Extract the explanation text from Gemini API response.
            // Adjust this extraction logic based on the actual structure of geminiResponse.data.
            let insightText = "No detailed insight available.";
            if (
                geminiResponse.data &&
                geminiResponse.data.candidates &&
                geminiResponse.data.candidates.length > 0
            ) {
                insightText = geminiResponse.data.candidates[0].output;
            }

            structuredResponse = {
                forgeryType: message,
                forgeryProbability: maxProbability,
                result: insightText,
                timestamp: new Date().toISOString()
            };
        }

        res.json(structuredResponse);
    } catch (error) {
        console.error("Error processing request:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};