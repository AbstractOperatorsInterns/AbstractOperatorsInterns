import cv2
from deepface import DeepFace
import speech_recognition as sr
import time
import os
from dotenv import load_dotenv
import openai
from openai import OpenAI
import subprocess

frame_emotions = {}

def analyze_frame(frame):
    try:
        result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        return result[0]['dominant_emotion']
    except Exception as e:
        print(f"Exception!!!!!!!")
        return None
    
def process_video():
    cap = cv2.VideoCapture('quizVideo.mp4')
    if not cap.isOpened():
        print("EXCEPTION WITH ACCESS VIDEO !!!!")
        return
    frame_count = 0
    frame_skip = 5
    start = time.time()
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        if frame_count % frame_skip ==0:
            emotion = analyze_frame(frame)
            print(f"Frame num {frame_count}: Dominant Emotion - {emotion}")
            frame_emotions[frame_count] = emotion
        frame_count += 1
    end = time.time()
    print(end - start)
    cap.release()
    cv2.destroyAllWindows()
process_video()

# AUDIO FILE NAME TO CHANGE HERE >>>
audioFile = "quizVideo.mp4"

#Hellooooo
def change_file_type(filename):
    name, ext = os.path.splitext(filename)
    ext = ext.lower()
    if ext == ".mp3":
        subprocess.call(['ffmpeg', '-i', name+'.mp3',
                name+'.WAV'])
        print("extension type: " + ext)
        return name+".WAV"
    elif ext == ".mp4":
        subprocess.call(['ffmpeg', '-i', name+'.mp4',
                name+'.WAV'])
        print("extension type: " + ext)
        return name+".WAV"

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

start = time.time()
r = sr.Recognizer()

audioFile = change_file_type(audioFile)

with sr.AudioFile(audioFile) as source:  
    
    audio_text = r.record(source)
    end = time.time()
    try:
        print("Unpunctuated text: "+r.recognize_google(audio_text))
    except:
         print("The audio file wasn't able to be transcribed to text.")



def punctuate(unchangedText):
    punctuationPrompt = f"Correct the punctuation in the following text: {unchangedText}"
    llm = OpenAI(api_key = os.environ["OPENAI_API_KEY"])
    response = llm.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": punctuationPrompt,
            }
        ]
    )
    return response.choices[0].message.content

text = r.recognize_google(audio_text)
punctuated_text = punctuate(text)

def generateResponse(puncText, emotionDictionary):
    punctuationPrompt = "The dominant emotion detected at each frame in the video is stored in the dictionary: "
    for key in emotionDictionary: 
        punctuationPrompt += "Frame Number:, " + str(key) + ", Dominant Emotion:, " + str(emotionDictionary[key])
    punctuationPrompt += "The audio is stored here: " + puncText + ". Give me a summary of what happened in the video using the emotions and audio, and give me an appropriate response from the user, a child with autism, to the situation you just witnessed."
    llm = OpenAI(api_key = os.environ["OPENAI_API_KEY"])
    response = llm.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": punctuationPrompt,
            }
        ]
    )
    return response.choices[0].message.content
x = generateResponse(punctuated_text, frame_emotions)
print(x)
