from pydantic import BaseModel
from typing import Optional

class Topic(BaseModel):
    id: Optional[int] = None
    course_id: int
    title: str
    description: str