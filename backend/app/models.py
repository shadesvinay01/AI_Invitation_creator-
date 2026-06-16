from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from .database import Base

class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(Text, nullable=False)
    title = Column(String, nullable=True)
    subtitle = Column(String, nullable=True)
    date = Column(String, nullable=True)
    venue = Column(String, nullable=True)
    theme_id = Column(String, default="royal_rajput")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
