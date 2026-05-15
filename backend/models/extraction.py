from pydantic import BaseModel
from typing import Dict, Optional, List
from enum import Enum

class ExtractionMethod(str, Enum):
    AI = "ai"
    XTRACT = "xtract"

class ParameterValue(BaseModel):
    value: str
    confidence: float

class ExtractionRequest(BaseModel):
    parameters: List[Dict[str, str]]
    datasheet_url: Optional[str] = None
    datasheet_file: Optional[bytes] = None
    part_number: str
    manufacturer: str

class ExtractionResponse(BaseModel):
    part_number: str
    manufacturer: str
    parameters: Dict[str, ParameterValue]
    overall_confidence: float
