from platform import system

from schemas.AgentSchema import StudyPlan,StudySession
from pydantic_ai import Agent, PromptedOutput
from pydantic_ai import Agent, RunContext, PromptedOutput
from pydantic_ai.models.google import GoogleModel
from pathlib import Path
from dotenv import load_dotenv
import os

# Load .env from project root (two levels up from Agent/)
env_path = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(env_path)

model = GoogleModel('gemini-3.5-flash-lite')

Prepare_Study_Plan=Agent(
    model,
    output_type=PromptedOutput(StudyPlan),  
    system_prompt=(
        "You are a study scheduling assistant. You will be given a course title, "
        "today's date, a deadline date, and a list of topics.\n\n"
        "Follow these steps exactly:\n"
        "1. Calculate the number of whole days remaining between today's date and the deadline.\n"
        "2. Distribute ALL the given topics evenly across those remaining days, one topic per day. "
        "If there are more topics than days, put more than one topic on a day rather than skipping any. "
        "If there are more days than topics, add short review or practice sessions for extra days.\n"
        "3. Do not invent topics that were not given to you. Do not omit any given topic.\n"
        "4. Assign each session a specific calendar date (not 'Day 1'), starting from tomorrow's date "
        "and ending on or before the deadline.\n"
        "5. Write a one or two sentence overall summary of the plan.\n\n"
        "Respond only with the requested fields, no extra commentary."
    ),
)