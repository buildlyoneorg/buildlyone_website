from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from .database import Base

class ClientBrief(Base):
    __tablename__ = "client_briefs"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String(100), nullable=False)
    client_email = Column(String(150), nullable=False, index=True)
    company_name = Column(String(150), nullable=True)
    project_description = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
