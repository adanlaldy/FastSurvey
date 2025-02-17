import os

from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# Function to authorize to use the API requests for the origins ip array.
def authorize(app: FastAPI):
    origins = [
        "http://localhost:3000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


load_dotenv()  # Load environment variables from .env.

# Collect datas from environment variables.
DB_URI = os.getenv("MONGODB_URI")
DB_NAME = os.getenv("MONGODB_DATABASE")

# Create a new client and connect to the server
client = MongoClient(DB_URI, server_api=ServerApi('1'))

db = client.survey_db
collection = db["fast-survey_data"]
