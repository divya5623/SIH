"""
database.py — SQLite database setup for AWAAZ SARPANCH
Uses SQLAlchemy ORM with SQLite (complaints.db)
"""

import os
import uuid
from datetime import datetime
from sqlalchemy import create_engine, Column, String, Text, DateTime, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Create complaints.db in the backend folder
DB_PATH = os.path.join(os.path.dirname(__file__), "complaints.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False}  # needed for SQLite + FastAPI
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def generate_grv_id():
    """Generate a unique grievance ID like GRV-20260827-0001"""
    date_str = datetime.now().strftime("%Y%m%d")
    unique = str(uuid.uuid4())[:4].upper()
    return f"GRV-{date_str}-{unique}"


class Complaint(Base):
    """Complaint model stored in SQLite"""
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, autoincrement=True)
    grv_id = Column(String(32), unique=True, nullable=False, default=generate_grv_id)
    
    # Complaint content
    description = Column(Text, nullable=False)           # Original text (Kannada/Hindi/English)
    transcript = Column(Text, nullable=True)             # Bhashini transcription
    language = Column(String(10), default="kn-IN")       # Language code
    
    # AI classification
    category = Column(String(64), default="General")
    department = Column(String(128), default="Gram Panchayat")
    priority = Column(String(32), default="Medium Priority")
    confidence = Column(Integer, default=70)
    
    # Location
    ward = Column(String(32), default="Ward 5")
    gps = Column(String(64), default="")
    
    # Status tracking
    status = Column(String(32), default="Registered")   # Registered, In Progress, Resolved, Rejected
    
    # Media
    image_path = Column(String(256), nullable=True)
    
    # User
    mobile = Column(String(15), default="")
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        """Convert to JSON-serializable dict"""
        return {
            "id": self.id,
            "grv_id": self.grv_id,
            "description": self.description,
            "transcript": self.transcript,
            "language": self.language,
            "category": self.category,
            "department": self.department,
            "priority": self.priority,
            "confidence": self.confidence,
            "ward": self.ward,
            "gps": self.gps,
            "status": self.status,
            "image_path": self.image_path,
            "mobile": self.mobile,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }


def init_db():
    """Create all tables if they don't exist"""
    Base.metadata.create_all(bind=engine)
    print(f"[OK] Database initialized at: {DB_PATH}")


def get_db():
    """FastAPI dependency — yields a DB session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
