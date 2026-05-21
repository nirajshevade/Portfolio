import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
print(f"Checking models for API key starting with: {api_key[:10]}...")

try:
    client = genai.Client(api_key=api_key)
    models = list(client.models.list())
    print("\n✅ SUCCESS! Here are the models your API key has access to:")
    for m in models:
        print(f" - {m.name}")
except Exception as e:
    print(f"\n❌ ERROR: {e}")
