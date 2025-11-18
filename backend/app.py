import hashlib
from typing import Dict
from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from services.payperq_analyzer import analyze_resume
from services.pdf_parser import extract_text_from_pdf, validate_pdf_file

load_dotenv()

app = FastAPI(title="AI Resume Analyzer API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


sessions: Dict[str, "UserSession"] = {}
users: Dict[str, str] = {}


class LoginRequest(BaseModel):
    username: str
    password: str


class ResumeAnalysisRequest(BaseModel):
    resume_text: str


class UserSession(BaseModel):
    username: str
    is_authenticated: bool = True


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(password: str, hashed_password: str) -> bool:
    return hash_password(password) == hashed_password


@app.get("/")
async def root():
    return {"message": "AI Resume Analyzer API is running"}


@app.post("/signup")
async def signup(request: LoginRequest):
    if not request.username or not request.password:
        raise HTTPException(status_code=400, detail="Username and password required")

    if request.username in users:
        raise HTTPException(status_code=400, detail="Username already exists")

    users[request.username] = hash_password(request.password)

    session_token = f"session_{request.username}_{len(sessions)}"
    sessions[session_token] = UserSession(username=request.username)

    return {
        "message": "Account created successfully",
        "session_token": session_token,
        "username": request.username,
    }


@app.post("/login")
async def login(request: LoginRequest):
    if not request.username or not request.password:
        raise HTTPException(status_code=400, detail="Username and password required")

    if request.username not in users:
        raise HTTPException(status_code=401, detail="Invalid username or password")

    if not verify_password(request.password, users[request.username]):
        raise HTTPException(status_code=401, detail="Invalid username or password")

    session_token = f"session_{request.username}_{len(sessions)}"
    sessions[session_token] = UserSession(username=request.username)

    return {
        "message": "Login successful",
        "session_token": session_token,
        "username": request.username,
    }


@app.get("/verify-session")
async def verify_session(session_token: str):
    if session_token not in sessions:
        raise HTTPException(status_code=401, detail="Invalid session")

    return {
        "valid": True,
        "username": sessions[session_token].username,
    }


@app.post("/analyze_resume")
async def analyze_resume_endpoint(request: ResumeAnalysisRequest):
    if not request.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text is required")

    try:
        result = analyze_resume(request.resume_text)
        return {
            "success": True,
            "analysis": result,
            "message": "Resume analyzed successfully",
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}") from exc


@app.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    file_content = await file.read()
    is_valid, error_message = validate_pdf_file(file_content, file.filename)

    if not is_valid:
        raise HTTPException(status_code=400, detail=error_message)

    resume_text = extract_text_from_pdf(file_content)

    if not resume_text:
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")

    try:
        result = analyze_resume(resume_text)
        return {
            "success": True,
            "analysis": result,
            "extracted_text": resume_text,
            "filename": file.filename,
            "message": "PDF analyzed successfully",
        }
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {exc}") from exc


@app.post("/logout")
async def logout(session_token: str):
    sessions.pop(session_token, None)
    return {"message": "Logged out successfully"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

