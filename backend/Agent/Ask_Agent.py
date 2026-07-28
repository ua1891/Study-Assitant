from dataclasses import dataclass, field
from schemas.AgentSchema import AskAnswer
from pydantic_ai import Agent, RunContext, PromptedOutput
from pydantic_ai.models.google import GoogleModel
from pathlib import Path
from dotenv import load_dotenv
import os

# Load .env from project root (two levels up from Agent/)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

model = GoogleModel('gemini-3.5-flash-lite')

@dataclass
class AskDeps:
    notes: list[str]
    found_matches: list[str] = field(default_factory=list)

Ask_Notes = Agent(
    model,
    deps_type=AskDeps,
    output_type=PromptedOutput(AskAnswer),
    retries=3,
    system_prompt=(
        "You are a strict study assistant that answers questions based on notes. "
        "CRITICAL SAFETY RULE: You MUST ONLY answer questions that are purely study-related or educational. "
        "Do NOT answer any questions containing adult, unsafe, violent, or inappropriate content; instead, politely decline and remind the user of your educational purpose. "
        "CRITICAL INSTRUCTION: You MUST ALWAYS call the 'search_notes' tool first using a keyword from the question! "
        "Do NOT generate an answer until you have called the 'search_notes' tool. "
        "If the tool returns matches, base your answer on them and set used_notes to true. "
        "If the tool returns nothing, use general knowledge (if study-related), and set used_notes to false. "
        "You must return ONLY a JSON object with two keys: 'answer' (string) and 'used_notes' (boolean)."
    ),
)
@Ask_Notes.tool(retries=3)
def search_notes(ctx: RunContext[AskDeps], keyword: str) -> list[str]:
    """Search the student's notes for the given keyword and return matching notes."""
    matches = [n for n in ctx.deps.notes if keyword.lower() in n.lower()]
    ctx.deps.found_matches.extend(matches)
    return matches