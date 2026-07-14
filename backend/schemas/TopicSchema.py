from pydantic import BaseModel

class Topic(BaseModel):
    id: int
    title: str
    description: str