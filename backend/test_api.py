"""
Test script to verify API connections independently
"""
import os
from dotenv import load_dotenv
import asyncio

load_dotenv()

async def test_anthropic():
    """Test Anthropic API connection"""
    print("\n=== Testing Anthropic API ===")
    api_key = os.getenv("ANTHROPIC_API_KEY")
    
    if not api_key or api_key == "your_anthropic_api_key_here":
        print("❌ ANTHROPIC_API_KEY not configured")
        return False
    
    print(f"✓ API Key found: {api_key[:20]}...")
    
    try:
        from anthropic import Anthropic
        client = Anthropic(api_key=api_key)
        
        # Simple test message
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=100,
            messages=[{"role": "user", "content": "Say 'API test successful'"}]
        )
        
        response = message.content[0].text
        print(f"✓ Anthropic API Response: {response}")
        return True
        
    except Exception as e:
        print(f"❌ Anthropic API Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

async def test_openrouter():
    """Test OpenRouter API connection"""
    print("\n=== Testing OpenRouter API ===")
    api_key = os.getenv("OPENROUTER_API_KEY")
    
    if not api_key or api_key == "your_openrouter_api_key_here":
        print("❌ OPENROUTER_API_KEY not configured")
        return False
    
    print(f"✓ API Key found: {api_key[:20]}...")
    
    try:
        from openai import OpenAI
        base_url = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
        
        client = OpenAI(
            base_url=base_url,
            api_key=api_key,
        )
        
        # Simple test message
        completion = client.chat.completions.create(
            model="anthropic/claude-sonnet-4",
            messages=[{"role": "user", "content": "Say 'API test successful'"}]
        )
        
        response = completion.choices[0].message.content
        print(f"✓ OpenRouter API Response: {response}")
        return True
        
    except Exception as e:
        print(f"❌ OpenRouter API Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

async def test_pdf_extraction():
    """Test PDF extraction with a simple test"""
    print("\n=== Testing PDF Extraction Logic ===")
    
    try:
        # Create a minimal test PDF in memory
        import fitz
        import base64
        
        # Create a simple PDF
        doc = fitz.open()
        page = doc.new_page()
        page.insert_text((100, 100), "Test Component\nVoltage: 5V\nCapacitance: 10uF")
        
        pdf_bytes = doc.tobytes()
        doc.close()
        
        print(f"✓ Created test PDF ({len(pdf_bytes)} bytes)")
        
        # Test base64 encoding
        pdf_base64 = base64.standard_b64encode(pdf_bytes).decode("utf-8")
        print(f"✓ Base64 encoding successful ({len(pdf_base64)} chars)")
        
        return True
        
    except Exception as e:
        print(f"❌ PDF Processing Error: {str(e)}")
        import traceback
        traceback.print_exc()
        return False

async def main():
    print("=" * 60)
    print("CLAP PRO - API Connection Test")
    print("=" * 60)
    
    ai_provider = os.getenv("AI_PROVIDER", "openrouter").lower()
    print(f"\nConfigured AI Provider: {ai_provider}")
    
    results = {}
    
    # Test based on provider
    if ai_provider == "anthropic":
        results['anthropic'] = await test_anthropic()
    else:
        results['openrouter'] = await test_openrouter()
    
    # Test PDF processing
    results['pdf'] = await test_pdf_extraction()
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    all_passed = all(results.values())
    
    for test_name, passed in results.items():
        status = "✓ PASSED" if passed else "❌ FAILED"
        print(f"{test_name.upper()}: {status}")
    
    if all_passed:
        print("\n✓ All tests passed! API should work.")
    else:
        print("\n❌ Some tests failed. Please fix the issues above.")
    
    return all_passed

if __name__ == "__main__":
    asyncio.run(main())
