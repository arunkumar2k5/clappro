import os
import httpx
from typing import Optional

async def search_datasheet(part_number: str, manufacturer: str) -> Optional[str]:
    """
    Search for datasheet URL using Tavily API.
    """
    api_key = os.getenv("TAVILY_API_KEY")
    base_url = os.getenv("TAVILY_BASE_URL", "https://api.tavily.com")
    
    query = f"{part_number} {manufacturer} datasheet filetype:pdf"
    
    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(
            f"{base_url}/search",
            headers={
                "Content-Type": "application/json"
            },
            json={
                "api_key": api_key,
                "query": query,
                "search_depth": "basic",
                "max_results": 5
            }
        )
        response.raise_for_status()
        
        data = response.json()
        results = data.get("results", [])
        
        for result in results:
            url = result.get("url", "")
            if url.lower().endswith(".pdf") or "datasheet" in url.lower():
                return url
        
        if results:
            return results[0].get("url")
        
        return None
