from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import dotenv

from app.database import engine, Base, get_db
from app.models import Event
from app.schemas import GenerateRequest, GenerateResponse
from app.ai_service import parse_prompt

dotenv.load_dotenv()

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Invitation Creator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/generate", response_model=GenerateResponse)
def generate_event(req: GenerateRequest, db: Session = Depends(get_db)):
    # 1. Parse prompt with AI
    parsed_data = parse_prompt(req.prompt)
    
    # 2. Save to Database
    db_event = Event(
        prompt=req.prompt,
        title=parsed_data.get("title", ""),
        subtitle=parsed_data.get("subtitle", ""),
        date=parsed_data.get("date", ""),
        venue=parsed_data.get("venue", ""),
        theme_id=parsed_data.get("theme_id", "royal_rajput")
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    
    # 3. Return JSON
    return GenerateResponse(
        id=db_event.id,
        title=db_event.title,
        subtitle=db_event.subtitle,
        date=db_event.date,
        venue=db_event.venue,
        theme_id=db_event.theme_id
    )

@app.get("/")
def health_check():
    return {"status": "ok", "message": "AI Studio Backend is running!"}
