import os
import sqlite3
from dotenv import load_dotenv, find_dotenv
import openai
from openai import OpenAI
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
import matplotlib.pyplot as plt

from flask import Flask, jsonify, request
from flask_cors import CORS

socialBotArr = []

connection = sqlite3.connect('user_information.db', check_same_thread=False)
cursor = connection.cursor()
command1 = """CREATE TABLE IF NOT EXISTS 
users(username TEXT PRIMARY KEY, socialind INTEGER)"""
cursor.execute(command1)
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")


class SocialBot:
    def __init__(self, difficulty, username):
        self.memory = self.generate_social_scenario(difficulty)
        self.socialSit = self.memory
        self.numAsks = 0
        self.ratings = []
        self.user = username
        
    def ask_openai(self, user_response):
        if self.numAsks < 10:
            prompt = f"Critique this user's newest response based on the conversation you have had with them so far. Here is a transcript of prior responses and feedback: {self.memory}. The user's latest response is: {user_response}. Then rate their response out of 100. Do not include a transcript of previous responses in your response."
            try:
                
                response = openai.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a therapist who can help socially awkward and autistic people and children. Provide constructive feedback on their responses based on the conversation you've had with them so far."},
                        {"role": "user", "content": prompt}
                    ],
                    temperature=0.3
                )
                self.numAsks += 1
                ai_response = response.choices[0].message.content
                self.memory += f"User: {user_response} AI: {ai_response} "
                return ai_response
            except Exception as e:
                return f"Error: {str(e)}"
        else:
            self.memory = ""
            return "Out of responses! Either start a new session or reset the memory."
    
    def generate_social_scenario(self, difficulty):
        prompt = f"Create a unique but applicable social scenario for a person with social anxiety or autism. Make the scenario have a {difficulty}/10 level of difficulty."
        try:
            client = OpenAI(api_key = os.environ.get("OPENAI_API_KEY"))
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a therapist who can give social scenarios to individuals working to improve social skills."},
                    {"role": "user", "content": prompt}
                ],
                temperature=1
            )
            scenario = response.choices[0].message.content
            return scenario
        except Exception as exception:
            return "ERROR W/ SCENARIO!!"
        
    def sendInfo(self):
        prompt = f"Send a quick summary of this user's prior responses and feedback to a parent. To start off, briefly, a few words, tell them each scenario, their child's response, and the overall rating out of 100. The ratings are in the array {self.ratings}. Additionally, explain to the parent their child's progress. Here is a transcript of prior responses and feedback: {self.memory}. Tell the parents what their child struggled on and need to improve. Finally, tell the parents what they could do with their child to help them overcome these struggles. Express everything as quick and easy to read."
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a summarizer bot whose job it is to communicate the user's progress to their parents."},
                    {"role": "user", "content": prompt}
                ],
            )
            ai_response = response.choices[0].message.content
            plt.figure(figsize=(8, 4))
            plt.plot(self.ratings, marker='o', color='b', label='Rating')
            plt.title("User's Rating Over Time")
            plt.xlabel("Scenario")
            plt.ylabel("Rating (Out of 100)")
            plt.xticks(range(len(self.ratings))) 
            plt.grid(True)
            plt.show()
            return ai_response
        
        except Exception as e:
            return f"Error: {str(e)}"


app = Flask(__name__)
CORS(app)

currentUser = None

@app.route("/members", methods=['POST'])
def members():
    global rows
    message = request.json.get('input_data')   
    social_bot = None
    for x in rows:
        if x[0] == currentUser:
            social_bot = socialBotArr[x[1]]
    return jsonify({"result": social_bot.ask_openai(message)})

@app.route("/signup", methods = ['POST'])
def signup():
    global currentUser, rows
    potUser = request.json.get('signup_data')
    for x in rows:
        if x[0] == potUser:
            return jsonify({"result": "That user already exists! Try again!"})
    currentUser = potUser
    cursor.execute(f"INSERT INTO users VALUES ('{currentUser}', {len(socialBotArr)})")
    cursor.execute("SELECT * FROM users")
    rows = cursor.fetchall()
    socialBotArr.append(SocialBot(7, request.json.get('signup_data')))
    return jsonify({"result": socialBotArr[len(socialBotArr)-1].socialSit})

@app.route("/login", methods = ['POST'])
def login():
    global currentUser, rows
    for x in rows:
        if x[0] == request.json.get('login_data'):
            currentUser = request.json.get('login_data')
            return jsonify({"result": f"Login successful! Current user: {currentUser}", "socialSit": socialBotArr[x[1]].socialSit})

    return jsonify({"result": "Login unsuccessful! No user found!"})

if __name__ == "__main__":
    app.run(debug=True)