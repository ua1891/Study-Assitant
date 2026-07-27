from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class NoteCreate(BaseModel):
    text: str

class NoteResponse(BaseModel):
    id: str
    text: str
    created_at: datetime