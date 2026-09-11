"""
main.py — AWAAZ SARPANCH FastAPI Backend
=========================================
Endpoints:
  POST /api/transcribe      — Audio → Text (Bhashini STT)
  POST /api/classify        — Text → Category (Gemini NLP)
  POST /api/complaints      — Save complaint to SQLite
  GET  /api/complaints      — List all complaints
  GET  /api/complaints/{id} — Get single complaint
  PATCH /api/complaints/{id}/status — Update status (Admin)
  GET  /api/stats           — Dashboard statistics

Run:  uvicorn main:app --reload --port 8000
Docs: http://localhost:8000/docs
"""

import os
import uuid
import tempfile
from datetime import datetime
from typing import Optional, List

from fastapi import FastAPI, File, UploadFile, Form, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from sqlalchemy.orm import Session
from dotenv import load_dotenv

import sys
from pathlib import Path
# Ensure backend directory is in sys.path whether run from root or backend/
sys.path.insert(0, str(Path(__file__).parent.resolve()))

from database import init_db, get_db, Complaint, generate_grv_id
from bhashini import transcribe_with_fallback
from classifier import classify_grievance

load_dotenv()

# ─── App Setup ─────────────────────────────────────────────────────────────────
app = FastAPI(
    title="AWAAZ SARPANCH API",
    description="Backend for civic grievance management — AWAAZ SARPANCH",
    version="1.0.0"
)

# CORS — explicitly allow production Vercel frontend and local development
allowed_origins = [
    "https://sih-lake-sigma.vercel.app",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "https://divya5623.github.io",
]
custom_frontend = os.getenv("FRONTEND_URL")
if custom_frontend and custom_frontend not in allowed_origins:
    allowed_origins.append(custom_frontend)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB on startup
@app.on_event("startup")
def startup_event():
    init_db()
    print("[STARTED] AWAAZ SARPANCH Backend started!")
    print("[DOCS] API docs: http://localhost:8000/docs")


# ─── Pydantic Models ────────────────────────────────────────────────────────────

class ClassifyRequest(BaseModel):
    text: str
    language: Optional[str] = "kn-IN"

class ComplaintCreate(BaseModel):
    description: str
    transcript: Optional[str] = None
    language: Optional[str] = "kn-IN"
    category: Optional[str] = "General"
    department: Optional[str] = "Gram Panchayat"
    priority: Optional[str] = "Medium Priority"
    confidence: Optional[int] = 70
    ward: Optional[str] = "Ward 5"
    gps: Optional[str] = ""
    mobile: Optional[str] = ""
    image_path: Optional[str] = None

class StatusUpdate(BaseModel):
    status: str  # Registered | In Progress | Resolved | Rejected

class ComplaintResponse(BaseModel):
    success: bool
    complaint: dict
    message: str = ""


# ─── Health Check ───────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {
        "app": "AWAAZ SARPANCH API",
        "status": "running",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": ["/api/transcribe", "/api/classify", "/api/complaints", "/api/stats"]
    }

@app.get("/health")
def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat()}


# ─── ENDPOINT 1: Transcribe Audio ───────────────────────────────────────────────

@app.post("/api/transcribe")
async def transcribe_audio(
    audio: UploadFile = File(..., description="Audio file (WAV or WebM)"),
    language: str = Form("kn-IN", description="Language code: kn-IN, hi-IN, te-IN, etc."),
    browser_text: str = Form("", description="Browser Web Speech API transcript as fallback")
):
    """
    Convert audio to text using Bhashini ULCA ASR API.
    Falls back to browser transcript if Bhashini is unavailable.
    """
    try:
        # Read audio bytes
        audio_bytes = await audio.read()
        
        if not audio_bytes and not browser_text:
            raise HTTPException(status_code=400, detail="No audio or text provided")
        
        # Call Bhashini (with fallback to browser_text)
        result = await transcribe_with_fallback(
            audio_bytes=audio_bytes,
            language_code=language,
            browser_text=browser_text
        )
        
        return {
            "success": result["success"],
            "text": result.get("text", browser_text),
            "language": result.get("language", language),
            "source": result.get("source", "browser_speech_api"),
            "error": result.get("error")
        }
    
    except HTTPException:
        raise
    except Exception as e:
        # On any error, return browser text if available
        if browser_text:
            return {
                "success": True,
                "text": browser_text,
                "language": language,
                "source": "browser_speech_api",
                "error": str(e)
            }
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")


# ─── ENDPOINT 2: Classify Text ──────────────────────────────────────────────────

@app.post("/api/classify")
async def classify_text(request: ClassifyRequest):
    """
    Classify grievance text into category using Gemini AI (with keyword fallback).
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text is required")
    
    result = await classify_grievance(request.text)
    
    return {
        "success": True,
        "text": request.text,
        "category": result["category"],
        "department": result["department"],
        "priority": result["priority"],
        "confidence": result["confidence"],
        "reason": result.get("reason", ""),
        "source": result.get("source", "keyword_fallback")
    }


# ─── ENDPOINT 3: Save Complaint ──────────────────────────────────────────────────

@app.post("/api/complaints", response_model=ComplaintResponse)
async def create_complaint(
    complaint_data: ComplaintCreate,
    db: Session = Depends(get_db)
):
    """
    Save a complaint to SQLite database. Returns GRV ID.
    """
    grv_id = generate_grv_id()
    
    complaint = Complaint(
        grv_id=grv_id,
        description=complaint_data.description,
        transcript=complaint_data.transcript or complaint_data.description,
        language=complaint_data.language or "kn-IN",
        category=complaint_data.category or "General",
        department=complaint_data.department or "Gram Panchayat",
        priority=complaint_data.priority or "Medium Priority",
        confidence=complaint_data.confidence or 70,
        ward=complaint_data.ward or "Ward 5",
        gps=complaint_data.gps or "",
        mobile=complaint_data.mobile or "",
        image_path=complaint_data.image_path,
        status="Registered"
    )
    
    db.add(complaint)
    db.commit()
    db.refresh(complaint)
    
    print(f"[NEW] Complaint saved: {grv_id} -- {complaint_data.category}")
    
    return ComplaintResponse(
        success=True,
        complaint=complaint.to_dict(),
        message=f"Complaint registered successfully with ID: {grv_id}"
    )


# ─── ENDPOINT 4: Get All Complaints ─────────────────────────────────────────────

@app.get("/api/complaints")
def list_complaints(
    status: Optional[str] = None,
    category: Optional[str] = None,
    ward: Optional[str] = None,
    limit: int = 100,
    db: Session = Depends(get_db)
):
    """
    Retrieve complaints from DB. Optionally filter by status, category, ward.
    """
    query = db.query(Complaint)
    
    if status:
        query = query.filter(Complaint.status == status)
    if category:
        query = query.filter(Complaint.category == category)
    if ward:
        query = query.filter(Complaint.ward == ward)
    
    complaints = query.order_by(Complaint.created_at.desc()).limit(limit).all()
    
    return {
        "success": True,
        "count": len(complaints),
        "complaints": [c.to_dict() for c in complaints]
    }


# ─── ENDPOINT 5: Get Single Complaint ───────────────────────────────────────────

@app.get("/api/complaints/{grv_id}")
def get_complaint(grv_id: str, db: Session = Depends(get_db)):
    """
    Get a single complaint by GRV ID (e.g., GRV-20260827-A1B2).
    """
    complaint = db.query(Complaint).filter(Complaint.grv_id == grv_id).first()
    
    if not complaint:
        # Try by numeric ID
        try:
            complaint = db.query(Complaint).filter(Complaint.id == int(grv_id)).first()
        except ValueError:
            pass
    
    if not complaint:
        raise HTTPException(status_code=404, detail=f"Complaint {grv_id} not found")
    
    return {"success": True, "complaint": complaint.to_dict()}


# ─── ENDPOINT 6: Update Complaint Status (Admin) ────────────────────────────────

@app.patch("/api/complaints/{grv_id}/status")
def update_status(
    grv_id: str,
    update: StatusUpdate,
    db: Session = Depends(get_db)
):
    """
    Update the status of a complaint. Used by admin dashboard.
    Valid statuses: Registered, In Progress, Resolved, Rejected
    """
    valid_statuses = ["Registered", "In Progress", "Resolved", "Rejected"]
    if update.status not in valid_statuses:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )
    
    complaint = db.query(Complaint).filter(Complaint.grv_id == grv_id).first()
    if not complaint:
        raise HTTPException(status_code=404, detail=f"Complaint {grv_id} not found")
    
    complaint.status = update.status
    complaint.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(complaint)
    
    print(f"[UPDATE] Status updated: {grv_id} -> {update.status}")
    
    return {
        "success": True,
        "grv_id": grv_id,
        "new_status": update.status,
        "complaint": complaint.to_dict()
    }


# ─── ENDPOINT 7: Dashboard Stats ────────────────────────────────────────────────

@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    """
    Real-time statistics for the admin dashboard.
    """
    all_complaints = db.query(Complaint).all()
    total = len(all_complaints)
    
    by_status = {}
    by_category = {}
    by_priority = {}
    
    for c in all_complaints:
        by_status[c.status] = by_status.get(c.status, 0) + 1
        by_category[c.category] = by_category.get(c.category, 0) + 1
        by_priority[c.priority] = by_priority.get(c.priority, 0) + 1
    
    resolved = by_status.get("Resolved", 0)
    
    return {
        "success": True,
        "stats": {
            "total": total,
            "registered": by_status.get("Registered", 0),
            "in_progress": by_status.get("In Progress", 0),
            "resolved": resolved,
            "rejected": by_status.get("Rejected", 0),
            "resolution_rate": round((resolved / total * 100) if total > 0 else 0, 1),
            "by_category": by_category,
            "by_priority": by_priority
        }
    }
