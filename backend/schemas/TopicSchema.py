# pyrefly: ignore [missing-import]
from pydantic import BaseModel, Field
from typing import Optional

class CreateTopic(BaseModel):
    course_id: str = Field(..., pattern=r'^[a-fA-F0-9]{24}$')
    title: str = Field(..., min_length=1, max_length=150)
    description: str = Field(..., min_length=1, max_length=1000)

class TopicResponse(CreateTopic):
    id: str