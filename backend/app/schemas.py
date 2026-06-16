from pydantic import BaseModel
from typing import Optional

class GenerateRequest(BaseModel):
    prompt: str

class GenerateResponse(BaseModel):
    id: int
    title: str
    subtitle: str
    date: str
    venue: str
    theme_id: str
