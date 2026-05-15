import os
import httpx
from typing import Dict, List, Optional

async def extract_with_xtract_ai(
    parameters: List[Dict[str, str]],
    datasheet_url: Optional[str] = None,
    datasheet_file: Optional[bytes] = None,
    part_number: str = "",
    manufacturer: str = ""
) -> Dict[str, Dict[str, any]]:
    """
    Extract parameters using Xtract AI Docker service.
    """
    base_url = os.getenv("XTRACT_AI_BASE_URL")
    api_key = os.getenv("XTRACT_AI_API_KEY")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "parameters": parameters,
        "part_number": part_number,
        "manufacturer": manufacturer
    }
    
    if datasheet_url:
        payload["datasheet_url"] = datasheet_url
    elif datasheet_file:
        payload["datasheet_file"] = datasheet_file.decode('latin-1')
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(
            f"{base_url}/extract",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        
        result = response.json()
        
        formatted_result = {}
        for param_name, value in result.get("parameters", {}).items():
            formatted_result[param_name] = {
                "value": str(value),
                "confidence": result.get("confidence", {}).get(param_name, 0.85)
            }
        
        return formatted_result
