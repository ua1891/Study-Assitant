from Agent.Notes_Agent import Summarize_Notes

Result=Summarize_Notes.run_sync("React is a JavaScript library for building UIs. It uses components, "
    "a virtual DOM for performance, and one-way data binding via props and state."
)
print(Result)
print(type(Result))