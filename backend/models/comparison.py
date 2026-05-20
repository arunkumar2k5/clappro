from pydantic import BaseModel, Field
from typing import Dict, List, Optional
from enum import Enum

class MatchStatus(str, Enum):
    MATCH = "match"
    NO_MATCH = "no_match"
    NOT_AVAILABLE = "not_available"

class ComparisonCell(BaseModel):
    value: str
    status: MatchStatus

class ComponentComparison(BaseModel):
    part_number: str = Field(alias="partNumber", serialization_alias="partNumber")
    manufacturer: str
    parameters: Dict[str, ComparisonCell]
    match_count: int = Field(alias="matchCount", serialization_alias="matchCount")
    total_parameters: int = Field(alias="totalParameters", serialization_alias="totalParameters")
    match_percentage: float = Field(alias="matchPercentage", serialization_alias="matchPercentage")
    
    class Config:
        populate_by_name = True

class ComparisonRequest(BaseModel):
    base_component: Dict[str, str]
    components: List[Dict[str, str]]
    parameter_names: List[str]

class ComparisonResponse(BaseModel):
    base_component: str
    comparisons: List[ComponentComparison]
    justifications: Dict[str, str]
    recommendation: Optional[str] = None
    no_exact_match: bool = False
    best_partial_match: Optional[str] = None

class ExportRequest(BaseModel):
    parameter_names: List[str]
    base_component: Dict[str, str]
    comparisons: List[dict]
    justifications: Dict[str, str]
    recommendation: str
    confidence_scores: Dict[str, float]
