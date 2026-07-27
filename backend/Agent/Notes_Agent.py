from pydantic_ai import Agent, PromptedOutput
from pydantic_ai.models.google import GoogleModel
from schemas.AgentSchema import NotesSummary
from pathlib import Path
from dotenv import load_dotenv
import os

# Load .env from project root (two levels up from Agent/)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

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