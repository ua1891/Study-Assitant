# Study Assistant AI

An AI-powered learning platform designed for university and college students. Manage courses, generate intelligent study plans, summarize notes, and interactively question your study material using cutting-edge Generative AI.

## About This Project
This project was developed as part of an initiative at **Netsol** to demonstrate the practical application of Generative AI in modern full-stack web development. The goal was to build a robust, end-to-end application that solves real-world productivity challenges for students by combining strict data validation, seamless UI/UX, and intelligent AI agents.

## Features

- **Course Management:** Add courses, define topics, and track study deadlines.
- **Intelligent Study Plans:** Generate daily study schedules automatically using AI based on your course topics and deadlines.
- **Smart Note Summarization:** Draft or paste notes and let AI extract key points and provide a concise summary.
- **Ask AI (Q&A):** Query your saved notes interactively. Built-in guardrails ensure the AI focuses solely on educational material and filters out unsafe content.
- **Fully Responsive UI:** A dark-mode cyber aesthetic that looks stunning on desktops, tablets, and smartphones.

## Tech Stack

- **Frontend:** React, Vite, Framer Motion (Deployed on Vercel)
- **Backend:** FastAPI, Python (Deployed on Render)
- **Database:** MongoDB Atlas
- **AI Integration:** PydanticAI using Google Gemini (`gemini-3.5-flash-lite`)

## Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/ua1891/Study-Assitant.git
cd Study-Assitant
```

### 2. Environment Variables
Create a `.env` file in the root directory using the provided template:
```bash
cp .env.example .env
```
Fill in your `MONGO_URI` and `GOOGLE_API_KEY` in the `.env` file.

### 3. Start the Backend
You can use the provided `run.py` script to start the backend locally, or run it manually:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
The API will run at `http://localhost:8000`.

### 4. Start the Frontend
In a new terminal window:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Make sure to check `frontend/.env` and update `VITE_API_BASE_URL` if your backend is running on a different port or server. The React app will be available at `http://localhost:5173`.

## Deployment

### Backend (Render)
This repository includes a `render.yaml` file for Infrastructure-as-Code deployment on Render.
1. Connect your GitHub repository to Render.
2. Select **Blueprint** to deploy based on `render.yaml`.
3. Fill in your environment variables (`MONGO_URI`, `GOOGLE_API_KEY`) securely in the Render dashboard.

### Frontend (Vercel)
1. Import the project into Vercel.
2. Set the Framework Preset to **Vite**.
3. Ensure the Root Directory is set to `frontend`.
4. In the Vercel Dashboard, go to Settings -> Environment Variables and add `VITE_API_BASE_URL` pointing to your deployed Render backend (e.g., `https://your-backend.onrender.com`).
5. Deploy!
