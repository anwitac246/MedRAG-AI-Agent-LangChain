from pydantic import BaseModel, Field
from typing import List, Optional, Dict


class StructuredSymptoms(BaseModel):
    symptoms: List[str] = Field(
        ..., description="List of extracted symptom keywords"
    )
    duration: Optional[str] = Field(
        None, description="Duration of symptoms (e.g., 3 days, 2 weeks)"
    )
    severity: Optional[str] = Field(
        None, description="Severity level if mentioned (mild/moderate/severe)"
    )
    age: Optional[int] = Field(
        None, ge=0, le=120
    )
    sex: Optional[str] = Field(
        None, description="Patient sex (male/female/other)"
    )
    medical_history: Optional[List[str]] = Field(
        default_factory=list
    )
    lab_values: Optional[Dict[str, float]] = Field(
        default_factory=dict,
        description="Structured lab test values extracted from reports"
    )