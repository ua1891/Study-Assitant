from typing import Optional
from pydantic import BaseModel

class CreateCourse(BaseModel):
    title: str
    description: str
    duration: str
    rating: str

class CourseResponse(CreateCourse):
    id: str

class UpdateCourse(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    rating: Optional[str] = None

class DeleteCourse(BaseModel):
    id: int 