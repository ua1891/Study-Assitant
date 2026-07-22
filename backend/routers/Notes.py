from tkinter import N

from fastapi import HTTPException,APIRouter
from Agent.Notes_Agent import Summarize_Notes
from schemas.AgentSchema import NotesInput,NotesSummary

router=APIRouter(prefix="/agent",tags=["Agent"])    

@router.post("/summarize", response_model=NotesSummary)
def summarize_note(note: NotesInput):
    try:
        result = Summarize_Notes.run_sync(note.text)
        return result.output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {e}")
    