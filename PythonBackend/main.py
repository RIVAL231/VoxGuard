from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import tensorflow as tf
import numpy as np
import shutil
import os
import traceback
import json
import google.generativeai as genai
from audio_augmentation import process_audio
from compare import find_impersonated_person
from typing import Dict, Any
from datetime import datetime

app = FastAPI()

# Middleware to allow CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini
GOOGLE_API_KEY = "AIzaSyDLukT2LcjiJfx5K1y2EwMBYcghpxLECdo"
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel('gemini-pro')

# Load your ML model
MODEL_PATH = os.path.join(os.getcwd(), 'model.h5')
audio_model = tf.keras.models.load_model(MODEL_PATH)

# Define contact audios for comparison
contact_audios = {
    "Archi Dhoot": 'D:/audio_forensics/ArchiDhoot.mp3',
    "Arth Agrawal": 'D:/audio_forensics/ArthAgrawal.mp3',
    "Simar Bhatia": 'D:/audio_forensics/SimarBhatia.mp3',
}

def get_class_message(predicted_class: int) -> str:
    class_messages = {
        0: "Audio is real",
        1: "Audio is fake and forgery is Speech Synthesis",
        2: "Audio is fake and forgery is Speech Synthesis",
        3: "Audio is fake and forgery is Voice Conversion",
        4: "Audio is fake and forgery is Voice Conversion",
        5: "Audio is fake and forgery is Replay Attack",
        6: "Audio is fake and forgery is Replay Attack with Distant Microphone",
    }
    return class_messages.get(predicted_class, "Unknown class")

async def get_llm_analysis(message: str, probabilities: list) -> str:
    """
    Get insight text from Gemini
    """
    try:
        prompt = f"""Given this audio analysis:
        Detection Result: {message}
        Confidence Scores: {probabilities}
        
        Provide a concise, single-paragraph analysis explaining the detection result and its implications.
        Focus on explaining the type of forgery detected (if any) and its potential impact.
        Keep the response under 150 words and make it informative yet easy to understand.
        """

        response = model.generate_content(prompt)
        return response.text.strip()

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error getting LLM analysis: {str(e)}"
        )

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    try:
        file_location = f"temp/{file.filename}"
        os.makedirs("temp", exist_ok=True)
        
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Process audio with augmentation
        spectrogram = process_audio(file_location, apply_augmentation=True)
        
        if spectrogram is None:
            raise HTTPException(status_code=400, detail="Failed to process audio file")
            
        spectrogram = np.expand_dims(spectrogram, axis=0)
        predictions = audio_model.predict(spectrogram)
        predicted_class = np.argmax(predictions, axis=-1)[0]
        probabilities = (predictions * 100).astype(int).tolist()[0]  # Get first list item
        message = get_class_message(predicted_class)
        
        # Get maximum probability
        max_probability = max(probabilities)
        
        # Get LLM insight
        insight_text = await get_llm_analysis(message, probabilities)
        
        # Perform audio comparison
        impersonated_person, max_similarity, similarity_scores = find_impersonated_person(file_location, contact_audios)
        
        # Format response according to specified structure
        structured_response = {
            "forgeryType": message,
            "forgeryProbability": max_probability,
            "result": insight_text,
            "timestamp": datetime.now().isoformat(),
            "impersonatedPerson": impersonated_person,
            "maxSimilarity": max_similarity,
            "similarityScores": similarity_scores
        }
        
        return structured_response

    except Exception as e:
        error_message = f"Error processing file {file.filename}: {str(e)}"
        traceback_str = ''.join(traceback.format_tb(e.__traceback__))
        full_error_message = f"{error_message}\n{traceback_str}"
        raise HTTPException(status_code=500, detail=full_error_message)
        
    finally:
        if os.path.exists(file_location):
            os.remove(file_location)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)