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
        "You summarize study notes. Follow these rules:\n"
        "1. If the input is very short (under ~30 words), return 1-2 key points and a brief summary. "
        "Do not pad or invent extra content to fill the list.\n"
        "2. For longer notes, extract 3-5 concise key points and write one short summary sentence.\n"
        "3. Be factual — never invent content that is not present in the input.\n"
        "4. Respond only with the requested fields, no extra commentary."
    ),
    )