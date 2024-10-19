import speech_recognition as sr
import time
import os
from dotenv import load_dotenv
import openai
from openai import OpenAI
import subprocess
audioFile = "quizVideo.mp4"

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
        print(start - end)
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
    print(response.choices[0].message.content)

text = r.recognize_google(audio_text)
punctuate(text)
