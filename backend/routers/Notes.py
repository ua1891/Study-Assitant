from fastapi import HTTPException, APIRouter
from Agent.Notes_Agent import Summarize_Notes
from Agent.Study_Agent import Prepare_Study_Plan
from schemas.AgentSchema import StudyPlan, StudySession, NotesInput, NotesSummary
from datetime import date
from data.CoursesQueries import GetCourseByID
from data.TopicsQueries import GetTopicsByCourseID
from data.NotesQueries import Insert_Note, GetAllNotes, DeleteNote
from schemas.NotesSchema import NoteCreate, NoteResponse
from Agent.Ask_Agent import Ask_Notes, AskDeps
from schemas.AgentSchema import AskAnswer, AskInput


router = APIRouter(prefix="/agent", tags=["Agent"])

@router.post("/summarize", response_model=NotesSummary)
def summarize_note(note: NotesInput):
    if len(note.text.strip()) < 10:
        raise HTTPException(
            status_code=400,
            detail="Your note is too short to summarize. Please write at least a couple of sentences."
        )
    try:
        result = Summarize_Notes.run_sync(note.text)
        return result.output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {e}")

@router.post("/plan", response_model=StudyPlan)
def generate_Study_plan(courseID: str):
    course = GetCourseByID(courseID)
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # Guard: reject plan generation if the deadline has already passed
    raw_deadline = course.get("deadline")
    if raw_deadline:
        from datetime import datetime
        deadline_date = raw_deadline if isinstance(raw_deadline, date) else datetime.fromisoformat(str(raw_deadline)).date()
        if deadline_date < date.today():
            raise HTTPException(
                status_code=400,
                detail="The deadline for this course has already passed. Please update the deadline to generate a plan."
            )

    Topics = GetTopicsByCourseID(courseID)
    topic_titles = [t["title"] for t in Topics] or ["General review"]

    prompt_text = (
        f"Course: {course['title']}\n"
        f"Today's date: {date.today().isoformat()}\n"
        f"Deadline: {course.get('deadline') or '1 week from today'}\n"
        f"Topics to cover: {', '.join(topic_titles)}"
    )

    try:
        result = Prepare_Study_Plan.run_sync(prompt_text)
        return result.output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {e}")
@router.post("/ask", response_model=AskAnswer)
def ask_notes(payload: AskInput):
    try:
        all_notes = GetAllNotes()
        note_texts = [n["text"] for n in all_notes]

        deps = AskDeps(notes=note_texts)
        result = Ask_Notes.run_sync(
            payload.question,
            deps=deps,
        )
        return result.output
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {e}")

#writing quries for  saving and getting the notes which student paste in box for saving it in db and the on 
# server side model get them and process them
notes_crud_router = APIRouter(prefix="/notes", tags=["Notes CRUD"])

@notes_crud_router.post("/")
def create_note(note: NoteCreate):
    note_id = Insert_Note(note.model_dump())
    return {"id": note_id}

@notes_crud_router.get("/")
def get_notes():
    return GetAllNotes()

@notes_crud_router.delete("/{note_id}")
def delete_note(note_id: str):
    DeleteNote(note_id)
    return {"deleted": True}    
