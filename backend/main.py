import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env from project root (one level up from backend/)
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(env_path)

from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from routers import Courses,Topic,Notes

app = FastAPI(
    title="Study Assistant API",
    description="This is a Study Assistant API that provides information about courses and allows users to manage their courses.",
    version="1.1.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://study-assitant.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(Courses.router)
app.include_router(Topic.router)
app.include_router(Notes.router)
app.include_router(Notes.notes_crud_router)


@app.get("/")
async def root():
    return {"message": "Welcome to the Study Assistant API!"}

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    error = exc.errors()[0]
    field = error.get("loc", [""])[-1]
    msg = error.get("msg", "Invalid input")
    return JSONResponse(
        status_code=422,
        content={"detail": f"{field.capitalize()}: {msg}" if field else msg}
    )