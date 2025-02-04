from pydub import AudioSegment
import numpy as np
from scipy.spatial.distance import cosine
from fastdtw import fastdtw
import traceback

# Function to extract features using pydub
def extract_features(audio_path):
    try:
        audio = AudioSegment.from_file(audio_path)
        audio = audio.set_channels(1).set_frame_rate(16000)  # Convert to mono and 16kHz for uniformity
        samples = np.array(audio.get_array_of_samples())

        # Compute MFCC using FFT
        spectrogram = np.abs(np.fft.fft(samples))
        mfcc = np.mean(np.log(spectrogram[:13]))  # 13 MFCC coefficients as a placeholder

        # Compute Chroma using FFT
        chroma = np.mean(np.abs(np.fft.fft(samples))[:12])  # A simplified version for demonstration

        # Spectral Contrast (using basic FFT magnitude)
        spectral_contrast = np.mean(np.abs(np.fft.fft(samples))[:50])  # Placeholder example

        # Tonnetz: Using Zero-Crossing Rate for simplicity
        zero_crossing_rate = np.mean(np.diff(np.sign(samples)))

        # Ensure all features are wrapped in arrays
        mfcc = np.array([mfcc])  # Convert to array for consistency
        chroma = np.array([chroma])  # Convert to array for consistency
        spectral_contrast = np.array([spectral_contrast])  # Convert to array for consistency
        zero_crossing_rate = np.array([zero_crossing_rate])  # Convert to array for consistency

        # Concatenate all features into a single feature vector
        feature_vector = np.concatenate([mfcc, chroma, spectral_contrast, zero_crossing_rate])
        
        return feature_vector
    except Exception as e:
        error_message = f"Error extracting features from {audio_path}: {str(e)}"
        traceback_str = ''.join(traceback.format_tb(e.__traceback__))
        full_error_message = f"{error_message}\n{traceback_str}"
        print(full_error_message)
        raise

# DTW similarity calculation
def dtw_similarity(vec1, vec2):
    try:
        distance, _ = fastdtw(vec1, vec2)
        return 1 / (1 + distance)
    except Exception as e:
        error_message = f"Error calculating DTW similarity: {str(e)}"
        traceback_str = ''.join(traceback.format_tb(e.__traceback__))
        full_error_message = f"{error_message}\n{traceback_str}"
        print(full_error_message)
        raise

# Find the impersonated person
def find_impersonated_person(forged_audio, contact_audios):
    try:
        forged_features = extract_features(forged_audio)

        max_similarity = -1
        impersonated_contact = None
        similarity_scores = {}

        for contact_name, contact_audio in contact_audios.items():
            try:
                contact_features = extract_features(contact_audio)
                similarity = dtw_similarity(forged_features, contact_features)
                similarity_scores[contact_name] = similarity
                if similarity > max_similarity:
                    max_similarity = similarity
                    impersonated_contact = contact_name
            except FileNotFoundError as e:
                print(f"Error finding contact audio {contact_audio}: {str(e)}")
                continue

        return impersonated_contact, max_similarity, similarity_scores
    except Exception as e:
        error_message = f"Error finding impersonated person: {str(e)}"
        traceback_str = ''.join(traceback.format_tb(e.__traceback__))
        full_error_message = f"{error_message}\n{traceback_str}"
        print(full_error_message)
        raise