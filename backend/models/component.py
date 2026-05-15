from pydantic import BaseModel
from typing import Optional, List

class Parameter(BaseModel):
    name: str
    label: str
    unit: str

class ComponentInput(BaseModel):
    part_number: str
    manufacturer: str
    datasheet_url: Optional[str] = None
    datasheet_file: Optional[bytes] = None

class DatasheetSearchRequest(BaseModel):
    part_number: str
    manufacturer: str

class DatasheetSearchResponse(BaseModel):
    url: str
