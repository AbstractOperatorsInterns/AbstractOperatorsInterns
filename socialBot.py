import os
from dotenv import load_dotenv, find_dotenv
import openai
# Do this once and it will work from then on ↓
# import nltk
# nltk.download('punkt')
# nltk.download('punkt_tab')
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.text_rank import TextRankSummarizer
import matplotlib.pyplot as plt

load_dotenv(find_dotenv())
openai.api_key = os.getenv("API_KEY")

memory = ""
numAsks = 0
ratings = []

def summarize_text(text, sentence_count=2):
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = TextRankSummarizer()
    summary = summarizer(parser.document, sentence_count)
    return " ".join(str(sentence) for sentence in summary)

def generate_social_scenario(difficulty):
    global memory
    prompt = f"Create a social scenario for a person with social anxiety or autism. Make the scenario have a '{difficulty}' level of difficulty."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a therapist who can give social scenarios to individuals working to improve social skills."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )
        scenario = response.choices[0].message.content
        memory += f"Scenario: {summarize_text(scenario)}"
        return scenario
    except Exception as exception:
        return "ERROR W/ SCENARIO!!"

def ask_openai(user_response):
    global numAsks, memory, ratings
    if numAsks < 10:
        prompt = f"Critique this user's newest response based on the conversation you have had with them so far. Here is a transcript of prior responses and feedback: {memory}. The user's latest response is: {user_response}. Then rate their response out of 100. End the entire passage with text that states"
        try:
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a therapist who can help socially awkward and autistic people and children. Provide constructive feedback on their responses based on the conversation you've had with them so far."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7
            )
            numAsks += 1
            ai_response = response.choices[0].message.content
            both = ai_response.split("Rating: ")
            rating = both[1][:2]
            ratings.append(int(rating))
            print("RATINGSSSSSSSSS: " + str(ratings))
            memory += f"User: {user_response} AI: {summarize_text(ai_response)} "
            return ai_response
        except Exception as e:
            return f"Error: {str(e)}"
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
