from Agent.Ask_Agent import Ask_Notes, AskDeps

notes = [
    "React uses a virtual DOM to optimize rendering performance.",
    "FastAPI uses Pydantic models for request validation.",
]

# Should find a match -> used_notes should end up True
deps1 = AskDeps(notes=notes)
r1 = Ask_Notes.run_sync("What does React use for performance?", deps=deps1)
print("Q1 answer:", r1.output.answer)
print("Q1 used_notes:", r1.output.used_notes)
print("Q1 found_matches:", deps1.found_matches)

# Should find nothing -> should fall back to general knowledge, but stay on-topic
deps2 = AskDeps(notes=notes)
r2 = Ask_Notes.run_sync("What is MongoDB used for?", deps=deps2)
print("Q2 answer:", r2.output.answer)
print("Q2 used_notes:", r2.output.used_notes)
print("Q2 found_matches:", deps2.found_matches)