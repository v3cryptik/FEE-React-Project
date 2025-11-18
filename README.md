# AI Resume Analyzer (Vite + FastAPI)

This repository hosts the migrated Create-React-App frontend inside a modern Vite toolchain together with the FastAPI backend that powers resume analysis. The UI is the same Tailwind-based experience from the CRA project, but it now benefits from Vite's faster dev server and build pipeline plus environment-based API configuration.

## Tech Stack
- **Frontend:** React 19, Vite, React Router, Tailwind CSS
- **Backend:** FastAPI, Uvicorn, PyPDF2, Requests

## Project Structure
```
.
├── backend/               # FastAPI service
│   ├── app.py
│   ├── services/
│   ├── requirements.txt
│   └── env.example
├── src/                   # Vite React app
│   ├── components/
│   ├── pages/
│   ├── styles/
│   └── config/api.js
├── env.example            # Frontend environment template
├── package.json
└── vite.config.js
```

## 1. Prerequisites
- Node.js 18+
- Python 3.11+

## 2. Environment Variables
Copy the sample files and adjust values as needed:
```bash
cp env.example .env                  # Frontend (VITE_API_URL defaults to http://localhost:8000)
cp backend/env.example backend/.env  # Backend (PayperQ API key, optional)
```

## 3. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
```

## 4. Run Locally
In one terminal start the backend:
```bash
cd backend
uvicorn app:app --reload --port 8000
```

In another terminal start the Vite dev server (configured for port 3000 to match the CRA experience):
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). All API calls target `VITE_API_URL`, so you can point the frontend to any deployment without touching the code.

## 5. Optional: Docker
The backend ships with a `backend/Dockerfile`. Build and run it locally:
```bash
cd backend
docker build -t resume-backend .
docker run -p 8000:8000 --env-file backend/.env resume-backend
```

You can wire up your preferred Docker workflow for the frontend as well (e.g., `docker run` around `npm run dev` or a static build served via nginx).

## 6. Linting & Formatting
```bash
npm run lint
```

## 7. Features
- Responsive landing, about, login, and dashboard pages using Tailwind utility classes
- Drag-and-drop PDF uploads with server-side parsing
- Text-based resume submission with AI-powered mock analysis (PayperQ integration ready)
- Session-aware routing with protected dashboard view

Enjoy building on the new Vite + FastAPI foundation!
