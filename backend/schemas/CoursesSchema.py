from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class CreateCourse(BaseModel):
    title: str = Field(..., min_length=1, max_length=150)
    description: str = Field(..., min_length=1, max_length=1000)
    duration: str = Field(..., min_length=1, max_length=50)
    rating: str = Field(..., min_length=1, max_length=10)
    deadline: Optional[datetime] = None

class CourseResponse(CreateCourse):
    id: str

class UpdateCourse(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=150)
    description: Optional[str] = Field(None, min_length=1, max_length=1000)
    duration: Optional[str] = Field(None, min_length=1, max_length=50)
    rating: Optional[str] = Field(None, min_length=1, max_length=10)
    deadline: Optional[datetime] = None

class DeleteCourse(BaseModel):
    id: int 