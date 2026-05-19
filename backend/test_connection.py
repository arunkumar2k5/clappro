import httpx
import asyncio

async def test_xtract_connection():
    """Test connection to Xtract AI Docker"""
    base_url = "http://localhost:8000"
    
    print(f"Testing connection to {base_url}...")
    
    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            # Test root endpoint
            response = await client.get(base_url)
            print(f"✅ Root endpoint: {response.status_code}")
            print(f"   Response: {response.json()}")
            
            # Test upload-parameters endpoint
            test_params = {
                "parameters": [
                    {"name": "Test", "value": None, "unit": "V", "Symbol": "", "confidence": 0}
                ]
            }
            import json
            params_json = json.dumps(test_params, indent=2)
            files = {"file": ("test.json", params_json.encode('utf-8'), "application/json")}
            
            response = await client.post(f"{base_url}/api/upload-parameters", files=files)
            print(f"✅ Upload parameters: {response.status_code}")
            print(f"   Response: {response.json()}")
            
    except httpx.ConnectError as e:
        print(f"❌ Connection failed: {e}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_xtract_connection())
