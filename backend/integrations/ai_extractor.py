import os
import json
import base64
import httpx
import io
import fitz  # PyMuPDF
from PIL import Image
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

    model = os.getenv("ANTHROPIC_MODEL", "claude-sonnet-4-6")
    max_tokens = int(os.getenv("ANTHROPIC_MAX_TOKENS", "4096"))

    message = client.messages.create(
        model=model,
        max_tokens=max_tokens,
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
    
    # Strip markdown code blocks if present
    if response_text.startswith("```"):
        # Remove ```json or ``` at the start and ``` at the end
        lines = response_text.split('\n')
        if lines[0].startswith("```"):
            lines = lines[1:]  # Remove first line with ```json
        if lines[-1].strip() == "```":
            lines = lines[:-1]  # Remove last line with ```
        response_text = '\n'.join(lines).strip()
    
    result = json.loads(response_text)
    
    return result

async def extract_with_openrouter(
    parameters: List[Dict[str, str]],
    datasheet_url: str,
    part_number: str,
    manufacturer: str,
    pdf_bytes: Optional[bytes] = None
) -> Dict[str, Dict[str, any]]:
    """
    Extract parameters using OpenRouter API.
    Can handle both datasheet URLs and PDF files.
    """
    base_url = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
    model = os.getenv("OPENROUTER_MODEL", "anthropic/claude-sonnet-4")
    
    client = OpenAI(
        base_url=base_url,
        api_key=os.getenv("OPENROUTER_API_KEY"),
    )
    
    param_list = "\n".join([f"- {p['label']} ({p['name']}): unit={p['unit']}" for p in parameters])
    
    if pdf_bytes:
        # Handle PDF file upload via OpenRouter - convert to images
        # OpenRouter doesn't support PDFs, so we convert pages to images
        pdf_document = fitz.open(stream=pdf_bytes, filetype="pdf")
        
        # Convert first 5 pages to images (most datasheets have specs in first few pages)
        image_contents = []
        max_pages = min(5, len(pdf_document))
        
        for page_num in range(max_pages):
            page = pdf_document[page_num]
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))  # 2x zoom for better quality
            img_bytes = pix.tobytes("png")
            img_base64 = base64.standard_b64encode(img_bytes).decode("utf-8")
            
            image_contents.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{img_base64}"
                }
            })
        
        pdf_document.close()
        
        prompt = f"""You are extracting electronic component specifications from a datasheet.

Component: {part_number} by {manufacturer}

Extract the following parameters from the datasheet images:
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

        # Send images to OpenRouter
        message_content = [{"type": "text", "text": prompt}] + image_contents
        
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": message_content
                }
            ],
        )
    else:
        # Handle datasheet URL - download the PDF and convert to images
        async with httpx.AsyncClient(timeout=60.0) as http_client:
            response = await http_client.get(datasheet_url)
            response.raise_for_status()
            pdf_bytes_from_url = response.content
        
        # Convert PDF to images
        pdf_document = fitz.open(stream=pdf_bytes_from_url, filetype="pdf")
        
        image_contents = []
        max_pages = min(5, len(pdf_document))
        
        for page_num in range(max_pages):
            page = pdf_document[page_num]
            pix = page.get_pixmap(matrix=fitz.Matrix(2, 2))
            img_bytes = pix.tobytes("png")
            img_base64 = base64.standard_b64encode(img_bytes).decode("utf-8")
            
            image_contents.append({
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/png;base64,{img_base64}"
                }
            })
        
        pdf_document.close()
        
        prompt = f"""You are extracting electronic component specifications from a datasheet.

Component: {part_number} by {manufacturer}
Source: {datasheet_url}

Extract the following parameters from the datasheet images:
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

        message_content = [{"type": "text", "text": prompt}] + image_contents
        
        completion = client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "user",
                    "content": message_content
                }
            ],
        )
    
    response_text = completion.choices[0].message.content
    result = json.loads(response_text)
    
    return result
