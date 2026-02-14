from pydantic import BaseModel, Field
from typing import List, Optional


class PubMedDocument(BaseModel):
    title: str
    abstract: str
    mesh_terms: Optional[List[str]] = Field(default_factory=list)
    doi: Optional[str] = None
    journal: Optional[str] = None
    year: Optional[int] = None
    relevance_score: Optional[float] = Field(
        None, ge=0.0, le=1.0
    )