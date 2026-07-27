from dataclasses import dataclass, field
from schemas.AgentSchema import AskAnswer
from pydantic_ai import Agent, RunContext, PromptedOutput
from pydantic_ai.models.google import GoogleModel
from dotenv import load_dotenv
import os

load_dotenv()
os.environ["GOOGLE_API_KEY"] = os.getenv("Gemini_Key", "")


model = GoogleModel('gemini-3.5-flash')

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
        "You are a study assistant that answers questions based on notes. "
        "CRITICAL INSTRUCTION: You MUST ALWAYS call the 'search_notes' tool first using a keyword from the question! "
        "Do NOT generate an answer until you have called the 'search_notes' tool. "
        "If the tool returns matches, base your answer on them and set used_notes to true. "
        "If the tool returns nothing, use general knowledge, and set used_notes to false. "
        "You must return ONLY a JSON object with two keys: 'answer' (string) and 'used_notes' (boolean)."
    ),
)
@Ask_Notes.tool(retries=3)
def search_notes(ctx: RunContext[AskDeps], keyword: str) -> list[str]:
    """Search the student's notes for the given keyword and return matching notes."""
    matches = [n for n in ctx.deps.notes if keyword.lower() in n.lower()]
    ctx.deps.found_matches.extend(matches)
    return matches