from pymongo import MongoClient


client = MongoClient("mongodb://localhost:27017")

db=client["Study_Assitant"]
Course_collection=db["courses"]
Topics_Collection=db["Topics"]