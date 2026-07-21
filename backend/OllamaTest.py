from pydantic_ai import Agent
from pydantic_ai.models.openai import OpenAIChatModel as OpenAIModel
from pydantic_ai.providers.openai import OpenAIProvider

model = OpenAIModel(
    model_name="gemma3",
    provider=OpenAIProvider(base_url="http://localhost:11434/v1", api_key="ollama"),
)

agent = Agent(model, system_prompt="You are a helpful assistant.")

result = agent.run_sync("Summarize this in one sentence: React is a JavaScript library for building UIs.")
print(result.output)