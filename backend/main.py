from fastapi import FastAPI
from utilies import greet
app = FastAPI()


@app.get("/{item_id}")
def read_item(item_id: int):
    return {"item_id": item_id, "message": greet("study-assistant")}