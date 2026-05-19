import os
import json
import tempfile
import httpx
from typing import Dict, List, Optional
from pathlib import Path
from dotenv import load_dotenv

# Ensure .env is loaded
load_dotenv()

def convert_to_xtract_format(parameters: List[Dict[str, str]]) -> List[Dict[str, any]]:
    """
    Convert CLAP PRO parameter format to Xtract AI format.
    
    CLAP PRO format: {"name": "voltage", "label": "Voltage", "unit": "V"}
    Xtract AI format: {"name": "Voltage", "value": null, "unit": "V", "Symbol": "", "confidence": 0}
    """
    xtract_params = []
    for param in parameters:
        xtract_params.append({
            "name": param.get("label", param.get("name", "")),
            "value": None,
            "unit": param.get("unit", ""),
            "Symbol": param.get("symbol", ""),
            "confidence": 0
        })
    return xtract_params

async def extract_with_xtract_ai(
    parameters: List[Dict[str, str]],
    datasheet_url: Optional[str] = None,
    datasheet_file: Optional[bytes] = None,
    part_number: str = "",
    manufacturer: str = ""
) -> Dict[str, Dict[str, any]]:
    """
    Extract parameters using Xtract AI Docker service.
    
    Workflow:
    1. Upload parameters JSON file
    2. Upload PDF file
    3. Trigger extraction with mode
    4. Parse and return results
    """
    base_url = os.getenv("XTRACT_AI_BASE_URL", "http://localhost:8000")
    
    # Convert parameters to Xtract AI format
    xtract_params = convert_to_xtract_format(parameters)
    params_json = {"parameters": xtract_params}
    
    # Create HTTP client with longer timeout and retries
    timeout = httpx.Timeout(120.0, connect=30.0)
    async with httpx.AsyncClient(timeout=timeout) as client:
        # Step 1: Upload parameters JSON
        params_json_str = json.dumps(params_json, indent=2)
        params_file = ("parameters.json", params_json_str.encode('utf-8'), "application/json")
        
        print(f"📤 Uploading parameters to {base_url}/api/upload-parameters")
        try:
            response = await client.post(
                f"{base_url}/api/upload-parameters",
                files={"file": params_file}
            )
            response.raise_for_status()
            upload_result = response.json()
            print(f"✅ Uploaded {upload_result.get('count', 0)} parameters to Xtract AI")
        except httpx.ConnectError as e:
            raise ValueError(f"Cannot connect to Xtract AI at {base_url}. Make sure Docker is running and accessible. Error: {str(e)}")
        except Exception as e:
            raise ValueError(f"Failed to upload parameters to Xtract AI: {str(e)}")
        
        # Step 2: Upload PDF file
        if datasheet_file:
            pdf_content = datasheet_file
        elif datasheet_url:
            # Download PDF from URL
            pdf_response = await client.get(datasheet_url, timeout=60.0)
            pdf_response.raise_for_status()
            pdf_content = pdf_response.content
        else:
            raise ValueError("Either datasheet_url or datasheet_file must be provided")
        
        pdf_file = (f"{part_number}.pdf", pdf_content, "application/pdf")
        response = await client.post(
            f"{base_url}/api/upload-pdf",
            files={"file": pdf_file}
        )
        response.raise_for_status()
        pdf_result = response.json()
        print(f"✅ PDF uploaded: {pdf_result.get('pages', 0)} pages")
        
        # Step 3: Extract parameters (using 'ai' mode for better results)
        extraction_mode = os.getenv("XTRACT_AI_MODE", "ai")
        response = await client.post(
            f"{base_url}/api/extract",
            json={"mode": extraction_mode}
        )
        response.raise_for_status()
        extraction_result = response.json()
        
        # Step 4: Parse results
        results = extraction_result.get("results", [])
        print(f"✅ Extraction complete: {len(results)} parameters processed")
        
        # Convert Xtract AI format back to CLAP PRO format
        formatted_result = {}
        for param in results:
            param_name = param.get("name", "")
            # Find original parameter name from CLAP PRO format
            original_param = next(
                (p for p in parameters if p.get("label") == param_name or p.get("name") == param_name),
                None
            )
            
            if original_param:
                key = original_param.get("name", param_name)
            else:
                key = param_name
            
            formatted_result[key] = {
                "value": param.get("value", "N/A") if param.get("value") else "N/A",
                "confidence": param.get("confidence", 0.0)
            }
        
        return formatted_result
