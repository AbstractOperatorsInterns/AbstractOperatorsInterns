from flask import Flask, request, jsonify
from flask_cors import CORS
import cv2
from deepface import DeepFace
import speech_recognition as sr
import time
import os
from dotenv import load_dotenv
import openai
import subprocess

# Environment variables and configurations
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
os.environ['CUDA_VISIBLE_DEVICES'] = '-1'

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Global variables
frame_emotions = {}

def analyze_frame(frame):
    try:
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        return result[0]['dominant_emotion']
    except Exception as e:
        print(f"DeepFace exception: {e}")
        return None

def process_video(video_path, frame_skip=5):
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        return {"error": "Cannot access video."}

    frame_count = 0
    start = time.time()
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_skip == 0:
            emotion = analyze_frame(frame)
            frame_emotions[frame_count] = emotion
        frame_count += 1
    end = time.time()
    cap.release()
    cv2.destroyAllWindows()
    return {"processing_time": end - start, "frame_emotions": frame_emotions}

def change_file_type(filename):
    name, ext = os.path.splitext(filename)
    ext = ext.lower()
    output_file = name + ".wav"
    if ext in [".mp3", ".mp4"]:
        try:
            subprocess.run(['ffmpeg', '-i', filename, output_file], check=True)
            return output_file
        except subprocess.CalledProcessError as e:
            return {"error": f"FFMPEG error: {e}"}
    return {"error": "Unsupported file type."}

def transcribe_audio(audio_path):
    r = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        audio_text = r.record(source)
        try:
            return r.recognize_google(audio_text)
        except Exception as e:
            return {"error": f"Speech recognition error: {e}"}

def punctuate(unchanged_text):
    punctuation_prompt = f"Correct the punctuation in the following text: {unchanged_text}"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": punctuation_prompt}]
        )
        return response.choices[0].message.content
    except Exception as e:
        return {"error": f"OpenAI API error: {e}"}


app = Flask(__name__)
CORS(app)

# Flask routes
@app.route("/process_video", methods=["POST"])
def video_endpoint():
    file = request.files.get("video")
    if not file:
        return jsonify({"error": "No video file provided"})

    video_path = "uploaded_video.mp4"
    file.save(video_path)

    result = process_video(video_path)
    return jsonify(result)

@app.route("/convert_audio", methods=["POST"])
def audio_conversion_endpoint():
    file = request.files.get("audio")
    if not file:
        return jsonify({"error": "No audio file provided."})

    audio_path = "uploaded_audio.mp4"
    file.save(audio_path)

    result = change_file_type(audio_path)
    return jsonify({"converted_audio": result})

@app.route("/transcribe_audio", methods=["POST"])
def audio_transcription_endpoint():
    file = request.files.get("audio")
    if not file:
        return jsonify({"error": "No audio file provided."})

    audio_path = "uploaded_audio.wav"
    file.save(audio_path)

    result = transcribe_audio(audio_path)
    return jsonify({"transcription": result})

@app.route("/punctuate", methods=["POST"])
def punctuate_endpoint():
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "No text provided."})

    result = punctuate(data["text"])
    return jsonify({"punctuated_text": result})

@app.route("/summarize", methods=["POST"])
def summarize_endpoint():
    data = request.json
    if not data or "text" not in data:
        return jsonify({"error": "No text provided."})
    
    text_to_summarize = data["text"]
    
    summary_prompt = f"Summarize the following text concisely: {text_to_summarize}"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": summary_prompt}]
        )
        summary = response.choices[0].message.content
        return jsonify({"summary": summary})
    except Exception as e:
        return jsonify({"error": f"OpenAI API error: {e}"})


# Run Flask app
if __name__ == "__main__":
    app.run(debug=True, port=5001)