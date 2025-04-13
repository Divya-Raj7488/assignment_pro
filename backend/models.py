# models.py

from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

# For returning data from MongoDB (with _id)
class Transaction(BaseModel):
    id: Optional[str] = Field(alias="_id")  # MongoDB ObjectId as string
    transaction_id: str
    description: str
    category: str
    amount: float

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
