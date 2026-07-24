from fastapi import HTTPException, APIRouter
from Agent.Notes_Agent import Summarize_Notes
from Agent.Study_Agent import Prepare_Study_Plan
from schemas.AgentSchema import StudyPlan, StudySession, NotesInput, NotesSummary
from datetime import date
from data.CoursesQueries import GetCourseByID
from data.TopicsQueries import GetTopicsByCourseID

router = APIRouter(prefix="/agent", tags=["Agent"])

@router.post("/summarize", response_model=NotesSummary)
def summarize_note(note: NotesInput):
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