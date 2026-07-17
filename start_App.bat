@echo off
title Study Assistant Launcher
color 0B

echo ========================================================
echo             Study Assistant - Startup System
echo ========================================================
echo.

:: Check if Python is installed
where python >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Python is not installed or not in your system PATH!
    echo Please download and install Python from: https://www.python.org/
    pause
    exit /b
)

:: Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js is not installed or not in your system PATH!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b
)

echo Python and Node.js detected successfully! Starting setup...
echo.

:: Start Backend (FastAPI) in a new window
echo [SERVER] Initializing Backend API...
start "Study Assistant - Backend API" cmd /k "cd backend && (if not exist venv (echo Creating virtual environment... && python -m venv venv)) && call venv\Scripts\activate && (if not exist venv\Lib\site-packages\fastapi (echo Installing backend dependencies... && pip install -r requirements.txt)) && echo Starting FastAPI server... && uvicorn main:app --reload"

:: Start Frontend (Vite) in a new window
echo [UI FRONTEND] Initializing the Frontend...
start "Study Assistant - Frontend" cmd /k "cd frontend && (if not exist node_modules (echo Installing frontend dependencies... && call npm install)) && echo Starting Vite dev server... && npm run dev"

echo.
echo Waiting 8 seconds for the servers to boot up fully...
timeout /t 8 /nobreak >nul

:: Automatically open browser
echo [BROWSER] Opening Study Assistant...
start http://localhost:5173
start http://127.0.0.1:8000/docs

echo.
echo ========================================================
echo Study Assistant is now running!
echo.
echo IMPORTANT: Please keep the TWO new black command windows
echo open - one runs the backend (FastAPI), the other the
echo frontend (Vite).
echo.
echo You can safely close this launcher window.
echo ========================================================
pause