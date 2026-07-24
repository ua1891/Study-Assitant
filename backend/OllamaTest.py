from Agent.Study_Agent import Prepare_Study_Plan

prompt_text = (
    "Course: Prompt Engineering\n"
    "Today's date: 2026-07-22\n"
    "Deadline: 2026-08-06 09:29:06\n"
    "Topics to cover: Intro, Improve existing Prompt"
)

result = Prepare_Study_Plan.run_sync(prompt_text)
print(result.output)