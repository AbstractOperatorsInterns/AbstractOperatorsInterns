import os
from dotenv import load_dotenv, find_dotenv
import openai
from openai import OpenAI
# Do this once and it will work from then on ↓
# import nltk
# nltk.download('punkt')
# nltk.download('punkt_tab')
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
import matplotlib.pyplot as plt


from flask import Flask, jsonify, request
from flask_cors import CORS



<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
def ask_openai(user_response):
    global numAsks, memory, ratings
    if numAsks < 10:
        prompt = f"Critique this user's newest response based on the conversation you have had with them so far. Here is a transcript of prior responses and feedback: {memory}. The user's latest response is: {user_response}. Then rate their response out of 100. End the entire passage with text that states"
=======
>>>>>>> Stashed changes
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)

<<<<<<< Updated upstream
@app.route("/members", methods=['POST'])
def members():
    global scenario
    message = request.json.get('input_data')   
    print(message)
    social_bot = SocialBot(7)
    return jsonify({"result": "Social Situation: " + social_bot.socialSit + " ******** \n " + social_bot.ask_openai(message)})

if __name__ == "__main__":
    app.run(debug=True)
=======


>>>>>>> Stashed changes

class SocialBot:
    def __init__(self, difficulty):
        self.memory = self.generate_social_scenario(difficulty)
        self.socialSit = self.memory
        self.numAsks = 0
        self.ratings = []
        

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
                    temperature=0.7
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
        prompt = f"Create a social scenario for a person with social anxiety or autism. Make the scenario have a {difficulty}/10 level of difficulty."
<<<<<<< Updated upstream
=======
        try:
            client = OpenAI(api_key = os.environ.get("OPENAI_API_KEY"))
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a therapist who can give social scenarios to individuals working to improve social skills."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            scenario = response.choices[0].message.content
            return scenario
        except Exception as exception:
            return "ERROR W/ SCENARIO!!"
        
    def sendInfo(self):
        prompt = f"Send a quick summary of this user's prior responses and feedback to a parent. To start off, briefly, a few words, tell them each scenario, their child's response, and the overall rating out of 100. The ratings are in the array {self.ratings}. Additionally, explain to the parent their child's progress. Here is a transcript of prior responses and feedback: {self.memory}. Tell the parents what their child struggled on and need to improve. Finally, tell the parents what they could do with their child to help them overcome these struggles. Express everything as quick and easy to read."
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        try:
            client = OpenAI(api_key = os.environ.get("OPENAI_API_KEY"))
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a therapist who can give social scenarios to individuals working to improve social skills."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
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
<<<<<<< Updated upstream
=======
<<<<<<< Updated upstream
    else:
        memory = ""
        return "Out of responses! Either start a new session or reset the memory."

def tester():
    global memory
    difficulty = "medium"
    scenario = generate_social_scenario(difficulty)
    print("Scenario:", scenario)
    user_response = "I would quietly ask the librarian to help. \n"
    ai_feedback = ask_openai(user_response)
    print("MEMORY SO FAR (1): " + memory + "\n")
    print("User response: " + user_response + "AI Feedback:" + ai_feedback + "\n")
    new_response = "If they seem busy, I'll wait before asking. \n"
    ai_feedback2 = ask_openai(new_response)
    print("MEMORY SO FAR (2): " + memory + "\n")
    print("new response: " + new_response + "AI Feedback on new response: " + ai_feedback2 + "\n")

tester()

def sendInfo():
    global memory, ratings
    # ratings = []
    prompt = f"Send a quick summary of this user's prior responses and feedback to a parent. To start off, briefly, a few words, tell them each scenario, their child's response, and the overall rating out of 100. The ratings are in the array {ratings}. Additionally, explain to the parent their child's progress. Here is a transcript of prior responses and feedback: {memory}. Tell the parents what their child struggled on and need to improve. Finally, tell the parents what they could do with their child to help them overcome these struggles. Express everything as quick and easy to read."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a summarizer bot whose job it is to communicate the user's progress to their parents."},
                {"role": "user", "content": prompt}
            ],
        )
        ai_response = response.choices[0].message.content
        # print(ratings)
        visualize_ratings(ratings)
        return ai_response
    
    except Exception as e:
        return f"Error: {str(e)}"
    

def visualize_ratings(ratings):
    plt.figure(figsize=(8, 4))
    plt.plot(ratings, marker='o', color='b', label='Rating')
    plt.title("User's Rating Over Time")
    plt.xlabel("Scenario")
    plt.ylabel("Rating (Out of 100)")
    plt.xticks(range(len(ratings))) 
    plt.grid(True)
    plt.show()

print(sendInfo())
=======






@app.route("/members", methods=['POST'])
def members():
    global scenario
    message = request.json.get('input_data')   
    print(message)
    social_bot = SocialBot(7)
    return jsonify({"result": "Social Situation: " + social_bot.socialSit + " ******** \n " + social_bot.ask_openai(message)})

if __name__ == "__main__":
    app.run(debug=True)
<<<<<<< Updated upstream
>>>>>>> Stashed changes
>>>>>>> Stashed changes
=======
    
>>>>>>> Stashed changes
