from pymongo import MongoClient
import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from project root (one level up from backend/)
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

mongo_uri = os.environ.get("MONGO_URI", "mongodb://localhost:27017")
client = MongoClient(mongo_uri)

db=client["Study_Assitant"]
Course_collection=db["courses"]
Topics_Collection=db["Topics"]
Note_collection = db["notes"]

if __name__ == "__main__":
    try:
        client.admin.command('ping')
        print("[SUCCESS] Successfully connected to MongoDB!")
    except Exception as e:
        print("[ERROR] Failed to connect to MongoDB.")
        print("Error:", e)
