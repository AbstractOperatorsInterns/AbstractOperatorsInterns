import os
from dotenv import load_dotenv, find_dotenv
import openai
from openai import OpenAI



load_dotenv(find_dotenv())
openai.api_key = os.getenv("API_KEY")

# aimemory = "Question: In a coffee shop, is it good to yell loudly"
# userMemory = "Yes it is appropriate if you need something very urgently"
memory = "AI: In a coffee shop, is it appropriate to yell loudly? User: Yes it is appropriate if you need something very urgently"
numAsks = 0

# def generateResponse(memory, prompt):
#     if numAsks < 10:
#         prompt = prompt + " Here are some past responses in 10 words: " + memory + " End your response with a 10 word summary of what happened in your response so that you can use it in the future."
#         response = llm.chat.completions.create(
#             model="gpt-3.5-turbo",
#             messages=[
#                 {
#                     {"role": "system", "content": "You are someone who can give social situations to socially awkward and autistic people, and then help critique their responses. All previous prompts and responses will be in the prompt you are given. "}, 
#                     {"role": "user", "content": prompt}  
#                 }
#             ]
#         )
#         return response.choices[0].message.content
#     else:
#         print("Out of responses! Either generate a new text thread or delete this one to start fresh.")


def ask_openai():
    global numAsks
    global memory
    if numAsks < 10:
        # try:
            prompt = "Help critique this user's response to the social situation found in what you asked previously. Either tell them to try again or say their response was satisfactory. Explain all of their errors. Here's a transcript of previous responses: " + memory
            response = openai.chat.completions.create(
                model="gpt-3.5-turbo", 
                messages=[
                    {"role": "system", "content": "You are someone who can give social situations to socially awkward and autistic people, and then help critique their responses. All previous prompts and responses will be in the prompt you are given. "}, 
                    {"role": "user", "content": prompt}  
                ],
                temperature=0.7  
            )
            numAsks = numAsks + 1
            return response.choices[0].message.content
        # except Exception as e:
        #     return f"Error: {str(e)}"
    else:
        print("Out of responses! Either generate a new text thread or delete this one to start fresh.")

def printEditResponse(res):
    global aimemory
    words = res.split(" ")
    aimemory += "Next response: "
    for y in range(len(words)-10, len(words)):
        aimemory = aimemory + words[y] + " "
    editResponse = ""
    for x in range(0, len(words) - 10):
        editResponse = editResponse + words[x] + " "
    return editResponse

response = ask_openai()
print("OG RESPONSE")
print(response)
# print("EDITED RESPONSE")
# print(printEditResponse(response))
print("*********************************************************************************")
memory = memory + "AI: " + response
memory += "User: But what if I really need to use the bathroom and there is a huge line?"
response2 = ask_openai()
print(response2)
# print("EDITED RESPONSE")
# print(printEditResponse(response2))
