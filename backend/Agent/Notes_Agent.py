from pydantic_ai import Agent, PromptedOutput
from pydantic_ai.models.google import GoogleModel
from schemas.AgentSchema import NotesSummary
from dotenv import load_dotenv
import os

load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("Gemini_Key", "")

model = GoogleModel('gemini-3.5-flash-lite')
Summarize_Notes=Agent(
    model,
    output_type=PromptedOutput(NotesSummary),
    system_prompt=(
        "You summarize study notes. Extract 3-5 concise key points "
        "and write one short summary sentence. Be factual, don't invent content. "
        "Respond only with the requested fields, no extra commentary."
    ),
    )