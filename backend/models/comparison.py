from pydantic import BaseModel
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
    part_number: str
    manufacturer: str
    parameters: Dict[str, ComparisonCell]
    match_count: int
    total_parameters: int
    match_percentage: float

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
