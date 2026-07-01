from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class ClientBriefBase(BaseModel):
    client_name: str = Field(..., min_length=2, max_length=100)
    client_email: str = Field(..., max_length=150) # EmailStr would require email-validator package, using string validation for simplicity
    company_name: Optional[str] = Field(None, max_length=150)
    project_description: str = Field(..., min_length=10)

class ClientBriefCreate(ClientBriefBase):
    pass

class ClientBriefResponse(ClientBriefBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
