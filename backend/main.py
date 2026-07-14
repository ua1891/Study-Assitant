from fastapi import FastAPI
from routers import Courses,Topic
app = FastAPI(
    title="Study Assistant API",
    description="This is a Study Assistant API that provides information about courses and allows users to manage their courses.",
    version="1.0.0"
)
app.include_router(Courses.router)
app.include_router(Topic.router)

@app.get("/")
async def root():
    return {"message": "Welcome to the Study Assistant API!"}