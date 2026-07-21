from pydantic import BaseModel

class NotesInput(BaseModel):
    text:str
class  NotesSummary(NotesInput):
    explanation:str
    keypoints:list[str]
    
