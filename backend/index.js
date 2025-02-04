/* global process */
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import routes from "./Routes/routes.js";
dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());

const router = express.Router();

router.get('/status', (req, res) => {
    res.json({ message: 'Server is running' });
});

router.post('/analyze', (req, res) => {
    // Process audio analysis here
    res.json({ success: true });
});

app.use('/', routes);

// Route to process audio analysis results
mongoose
    .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
