from typing import Optional
from pydantic import BaseModel
from datetime import datetime

class CreateCourse(BaseModel):
    title: str
    description: str
    duration: str
    rating: str
    deadline: Optional[datetime] = None

class CourseResponse(CreateCourse):
    id: str

class UpdateCourse(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    rating: Optional[str] = None
    deadline: Optional[datetime] = None

class DeleteCourse(BaseModel):
    id: int 