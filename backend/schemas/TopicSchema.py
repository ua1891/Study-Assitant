# pyrefly: ignore [missing-import]
from pydantic import BaseModel
from typing import Optional

class CreateTopic(BaseModel):
    course_id: str
    title: str
    description: str
class TopicResponse(CreateTopic):
    id: str