from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class NoteCreate(BaseModel):
    text: str = Field(..., min_length=1, max_length=5000)

class NoteResponse(BaseModel):
    id: str
    text: str
    created_at: datetime