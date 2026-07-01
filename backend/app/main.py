from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from .database import engine, Base, get_db
from . import models, schemas

# Initialize database tables on startup
# In a production environment, database migrations (e.g., Alembic) are preferred
try:
    Base.metadata.create_all(bind=engine)
except Exception as e:
    print(f"Warning: Could not create tables on startup. Ensure MySQL is running. Error: {e}")

app = FastAPI(
    title="buildlyone API",
    description="Backend service for buildlyone software engineering agency",
    version="1.0.0"
)

# CORS middleware to allow connections from Vite dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", status_code=status.HTTP_200_OK)
def read_root():
    return {
        "status": "online",
        "service": "buildlyone backend API",
        "database": "MySQL (SQLAlchemy)"
    }

@app.post("/api/briefs", response_model=schemas.ClientBriefResponse, status_code=status.HTTP_201_CREATED)
def create_brief(brief: schemas.ClientBriefCreate, db: Session = Depends(get_db)):
    try:
        db_brief = models.ClientBrief(
            client_name=brief.client_name,
            client_email=brief.client_email,
            company_name=brief.company_name,
            project_description=brief.project_description
        )
        db.add(db_brief)
        db.commit()
        db.refresh(db_brief)
        return db_brief
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Database error: Could not save brief. Ensure MySQL is online and database 'buildlyone' exists. Details: {str(e)}"
        )

@app.get("/api/briefs", response_model=List[schemas.ClientBriefResponse], status_code=status.HTTP_200_OK)
def get_briefs(db: Session = Depends(get_db)):
    # Simple endpoint to retrieve submitted briefs (mostly for validation/admin use)
    return db.query(models.ClientBrief).order_by(models.ClientBrief.created_at.desc()).all()
