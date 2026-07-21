from pydantic_ai import Agent, PromptedOutput
from pydantic_ai.models.openai import OpenAIChatModel
from pydantic_ai.providers.openai import OpenAIProvider
from schemas.AgentSchema import NotesSummary

model = OpenAIChatModel(
    model_name="gemma3",
    provider=OpenAIProvider(base_url="http://localhost:11434/v1", api_key="ollama"),
)
Summarize_Notes=Agent(
    model,
    output_type=PromptedOutput(NotesSummary),
    system_prompt=(
        "You summarize study notes. Extract 3-5 concise key points "
        "and write one short summary sentence. Be factual, don't invent content. "
        "Respond only with the requested fields, no extra commentary."
    ),
    )