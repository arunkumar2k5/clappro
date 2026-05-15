import os
import json
import base64
from typing import Dict, List, Optional
from anthropic import Anthropic
from openai import OpenAI

async def extract_with_anthropic(
    parameters: List[Dict[str, str]],
    pdf_file: bytes,
    part_number: str,
    manufacturer: str
) -> Dict[str, Dict[str, any]]:
    """
    Extract parameters from PDF using Anthropic API directly.
    Used when datasheet is uploaded as a file.
    """
    client = Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    pdf_base64 = base64.standard_b64encode(pdf_file).decode("utf-8")
    
    param_list = "\n".join([f"- {p['label']} ({p['name']}): unit={p['unit']}" for p in parameters])
    
    prompt = f"""You are extracting electronic component specifications from a datasheet.

Component: {part_number} by {manufacturer}

Extract the following parameters:
{param_list}

Return a JSON object with this exact structure:
{{
  "parameter_name": {{"value": "extracted_value", "confidence": 0.95}},
  ...
}}

Rules:
- Use the parameter 'name' field as the key
- Include the unit in the value if applicable
- Confidence should be 0.0 to 1.0
- If a parameter is not found, use "N/A" with confidence 0.0
- Return ONLY valid JSON, no explanatory text"""

    message = client.messages.create(
        model="claude-sonnet-4-20250514",
        max_tokens=4096,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "document",
                        "source": {
                            "type": "base64",
                            "media_type": "application/pdf",
                            "data": pdf_base64,
                        },
                    },
                    {
                        "type": "text",
                        "text": prompt
                    }
                ],
            }
        ],
    )
    
    response_text = message.content[0].text
    result = json.loads(response_text)
    
    return result

async def extract_with_openrouter(
    parameters: List[Dict[str, str]],
    datasheet_url: str,
    part_number: str,
    manufacturer: str
) -> Dict[str, Dict[str, any]]:
    """
    Extract parameters from datasheet URL using OpenRouter API.
    Used when datasheet is provided as a URL.
    """
    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=os.getenv("OPENROUTER_API_KEY"),
    )
    
    param_list = "\n".join([f"- {p['label']} ({p['name']}): unit={p['unit']}" for p in parameters])
    
    prompt = f"""You are extracting electronic component specifications from a datasheet.

Component: {part_number} by {manufacturer}
Datasheet URL: {datasheet_url}

Extract the following parameters:
{param_list}

Return a JSON object with this exact structure:
{{
  "parameter_name": {{"value": "extracted_value", "confidence": 0.95}},
  ...
}}

Rules:
- Use the parameter 'name' field as the key
- Include the unit in the value if applicable
- Confidence should be 0.0 to 1.0
- If a parameter is not found, use "N/A" with confidence 0.0
- Return ONLY valid JSON, no explanatory text"""

    completion = client.chat.completions.create(
        model="anthropic/claude-sonnet-4",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
    )
    
    response_text = completion.choices[0].message.content
    result = json.loads(response_text)
    
    return result
