from pydantic import BaseModel

class NotesInput(BaseModel):
    text:str
class  NotesSummary(NotesInput):
    explanation:str
    keypoints:list[str]

class StudySession(BaseModel):
    day: str
    topic: str
    focus: str

class StudyPlan(BaseModel):
    sessions: list[StudySession]
    summary: str
#for Q&A section        
class AskInput(BaseModel):
    question: str
    notes: list[str]

class AskAnswer(BaseModel):
    answer: str
    used_notes: bool    