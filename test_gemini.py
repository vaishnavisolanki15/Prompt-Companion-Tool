import google.generativeai as genai
from config import GEMINI_API_KEY

print("Key loaded:", GEMINI_API_KEY[:10])

genai.configure(api_key="YOUR_API_KEY")

model = genai.GenerativeModel("gemini-2.0-flash")

response = model.generate_content(
    "Give me a business idea"
)

print(response.text)