# main.py
from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from io import BytesIO
import PyPDF2
import re
import openai
import os
from dotenv import load_dotenv
from models import Transaction
from cors import add_cors_middleware
from pydantic import BaseModel

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")
mongo_uri = os.getenv("MONGODB_URI")

app = FastAPI()
add_cors_middleware(app)
client = AsyncIOMotorClient(mongo_uri)
db = client["expense_db"]
collection = db["transactions"]


def categorize(description: str) -> str:
    desc = description.lower()
    if any(
        word in desc
        for word in ["zomato", "restaurant", "dominos", "kfc", "starbucks", "food"]
    ):
        return "Food"
    elif any(word in desc for word in ["amazon", "flipkart", "myntra", "shopping"]):
        return "Shopping"
    elif any(word in desc for word in ["bigbasket", "grofers", "grocery"]):
        return "Grocery"
    elif any(word in desc for word in ["electricity", "rent", "bill", "credit card"]):
        return "Bill Payment"
    else:
        return "Others"


@app.get("/")
async def root():
    return {"message": "Welcome to the Expense Tracker API!"}


@app.post("/upload-pdf/")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        file_content = await file.read()
        pdf_reader = PyPDF2.PdfReader(BytesIO(file_content))
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()

        lines = text.split("\n")
        transactions = []
        current_txn = {}

        for line in lines:
            if re.search(r"TXN\d+", line):
                if "transaction_id" in current_txn:
                    await collection.insert_one(current_txn)
                    transactions.append(current_txn)
                    current_txn = {}

                txn_id_match = re.search(r"(TXN\d+)", line)
                amount_match = re.search(r"(\d+\.\d{2})", line)
                current_txn["transaction_id"] = (
                    txn_id_match.group(1) if txn_id_match else ""
                )
                current_txn["amount"] = (
                    float(amount_match.group(1)) if amount_match else 0.0
                )
                current_txn["description"] = line
            else:
                if "description" in current_txn:
                    current_txn["description"] += " " + line.strip()
        if "transaction_id" in current_txn:
            current_txn["category"] = categorize(current_txn["description"])
            await collection.insert_one(current_txn)
            transactions.append(current_txn)

        return {"status": "success", "inserted": len(transactions)}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


class ChatInput(BaseModel):
    message: str


@app.post("/chat/")
async def chat_with_openai(input: ChatInput):
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=input.message,
            max_tokens=150,
            temperature=0.7,
        )

        openai_response = response.choices[0].text.strip()
        return {"response": openai_response}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
