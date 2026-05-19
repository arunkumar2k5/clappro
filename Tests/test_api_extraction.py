#!/usr/bin/env python3
"""
API Extraction Test Script

This script tests the complete parameter extraction workflow via API calls.
It takes a parameters JSON file and a PDF file as input, and outputs the extracted results.

Usage:
    python test_api_extraction.py <parameters.json> <pdf_file.pdf> [--mode simple|ai] [--output results.json]

Example:
    python test_api_extraction.py parameters.json datasheet.pdf --mode ai --output extracted.json
"""

import requests
import json
import sys
import argparse
import time
import threading
from pathlib import Path
from typing import Dict, Any, Optional


class APIExtractor:
    """Handles API calls to the parameter extraction backend."""
    
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.session = requests.Session()
        self.progress_thread = None
        self.stop_progress = False
    
    def upload_parameters(self, parameters_file: Path) -> Dict[str, Any]:
        """Upload parameters JSON file to the backend."""
        print(f"📤 Uploading parameters from: {parameters_file}")
        
        # Upload as file (backend expects UploadFile)
        with open(parameters_file, 'rb') as f:
            files = {'file': (parameters_file.name, f, 'application/json')}
            response = self.session.post(
                f"{self.base_url}/api/upload-parameters",
                files=files
            )
        
        response.raise_for_status()
        result = response.json()
        
        print(f"✅ Uploaded {result.get('count', 0)} parameters")
        return result
    
    def upload_pdf(self, pdf_file: Path) -> Dict[str, Any]:
        """Upload PDF file to the backend."""
        print(f"📄 Uploading PDF: {pdf_file}")
        
        with open(pdf_file, 'rb') as f:
            files = {'file': (pdf_file.name, f, 'application/pdf')}
            response = self.session.post(
                f"{self.base_url}/api/upload-pdf",
                files=files
            )
        
        response.raise_for_status()
        result = response.json()
        
        # Backend returns 'pages' not 'total_pages'
        pages = result.get('pages', 0)
        markdown_length = result.get('markdown_length', 0)
        
        print(f"✅ PDF uploaded: {pages} pages")
        print(f"   Markdown length: {markdown_length} characters")
        return result
    
    def extract_parameters(self, mode: str = "simple") -> Dict[str, Any]:
        """Extract parameters using specified mode (simple or ai)."""
        print(f"🔍 Extracting parameters using '{mode}' mode...")
        
        response = self.session.post(
            f"{self.base_url}/api/extract",
            json={"mode": mode}
        )
        response.raise_for_status()
        result = response.json()
        
        # Backend returns 'results' not 'parameters'
        results = result.get('results', [])
        extracted_count = len([p for p in results if p.get('value') and p.get('value') != 'NF'])
        total_count = len(results)
        
        print(f"✅ Extraction complete: {extracted_count}/{total_count} parameters found")
        return result
    
    def get_markdown(self) -> Dict[str, Any]:
        """Get markdown content and page mapping."""
        print("📝 Fetching markdown content...")
        
        response = self.session.get(f"{self.base_url}/api/markdown")
        response.raise_for_status()
        result = response.json()
        
        print(f"✅ Markdown retrieved: {len(result.get('markdown', ''))} characters")
        return result
    
    def monitor_progress(self):
        """Monitor SSE progress stream in background thread."""
        try:
            response = requests.get(
                f"{self.base_url}/api/progress-stream",
                stream=True,
                timeout=None
            )
            
            for line in response.iter_lines(decode_unicode=True):
                if self.stop_progress:
                    break
                    
                if line and line.startswith('data: '):
                    try:
                        data = json.loads(line[6:])  # Remove 'data: ' prefix
                        message = data.get('message', '')
                        if message:
                            print(f"  {message}", flush=True)  # Force immediate flush
                    except json.JSONDecodeError:
                        pass
        except Exception as e:
            # Silently ignore progress stream errors
            pass
    
    def start_progress_monitor(self):
        """Start background thread to monitor progress."""
        self.stop_progress = False
        self.progress_thread = threading.Thread(target=self.monitor_progress, daemon=True)
        self.progress_thread.start()
        time.sleep(0.1)  # Minimal delay to connect
    
    def stop_progress_monitor(self):
        """Stop progress monitoring thread."""
        self.stop_progress = True
        if self.progress_thread:
            self.progress_thread.join(timeout=1)
    
    def save_results(self, results: Dict[str, Any], output_file: Path):
        """Save extraction results to JSON file."""
        print(f"💾 Saving results to: {output_file}")
        
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Results saved successfully")
    
    def run_extraction(
        self,
        parameters_file: Path,
        pdf_file: Path,
        mode: str = "simple",
        output_file: Optional[Path] = None
    ) -> Dict[str, Any]:
        """Run the complete extraction workflow."""
        
        print("\n" + "="*70)
        print("🚀 Starting Parameter Extraction Workflow")
        print("="*70 + "\n")
        
        # Start progress monitoring
        print("📡 Connecting to progress stream...")
        self.start_progress_monitor()
        print()
        
        start_time = time.time()
        
        try:
            # Step 1: Upload parameters
            param_result = self.upload_parameters(parameters_file)
            print()
            
            # Step 2: Upload PDF
            pdf_result = self.upload_pdf(pdf_file)
            print()
            
            # Step 3: Extract parameters
            extraction_result = self.extract_parameters(mode)
            print()
            
            # Step 4: Get markdown (optional, for verification)
            markdown_result = self.get_markdown()
            print()
            
            # Combine results - backend returns 'results' not 'parameters'
            extracted_params = extraction_result.get("results", [])
            
            final_result = {
                "metadata": {
                    "parameters_file": str(parameters_file),
                    "pdf_file": str(pdf_file),
                    "extraction_mode": mode,
                    "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
                    "processing_time_seconds": round(time.time() - start_time, 2),
                    "total_pages": pdf_result.get("pages", 0),
                    "markdown_length": pdf_result.get("markdown_length", 0),
                    "total_markdown_lines": markdown_result.get("page_mapping", {}) and len(markdown_result.get("page_mapping", {}))
                },
                "parameters": extracted_params,
                "page_mapping": markdown_result.get("page_mapping", {}),
                "statistics": {
                    "total_parameters": len(extracted_params),
                    "extracted_parameters": len([p for p in extracted_params if p.get("value") and p.get("value") != "NF"]),
                    "missing_parameters": len([p for p in extracted_params if not p.get("value") or p.get("value") == "NF"])
                }
            }
            
            # Save results if output file specified
            if output_file:
                self.save_results(final_result, output_file)
            
            # Print summary
            print("="*70)
            print("📊 Extraction Summary")
            print("="*70)
            print(f"Total Parameters:     {final_result['statistics']['total_parameters']}")
            print(f"Extracted:            {final_result['statistics']['extracted_parameters']}")
            print(f"Missing:              {final_result['statistics']['missing_parameters']}")
            
            # Calculate success rate safely
            if final_result['statistics']['total_parameters'] > 0:
                success_rate = final_result['statistics']['extracted_parameters']/final_result['statistics']['total_parameters']*100
                print(f"Success Rate:         {success_rate:.1f}%")
            else:
                print(f"Success Rate:         N/A (no parameters)")
            
            print(f"Processing Time:      {final_result['metadata']['processing_time_seconds']}s")
            print("="*70 + "\n")
            
            # Stop progress monitoring
            self.stop_progress_monitor()
            
            return final_result
            
        except requests.exceptions.ConnectionError:
            self.stop_progress_monitor()
            print("\n❌ Error: Cannot connect to backend server")
            print("   Make sure the backend is running on http://localhost:8000")
            print("   Start it with: cd backend && python -m uvicorn src.main:app --reload")
            sys.exit(1)
        except requests.exceptions.HTTPError as e:
            self.stop_progress_monitor()
            print(f"\n❌ HTTP Error: {e}")
            print(f"   Response: {e.response.text if e.response else 'No response'}")
            sys.exit(1)
        except Exception as e:
            self.stop_progress_monitor()
            print(f"\n❌ Unexpected error: {e}")
            import traceback
            traceback.print_exc()
            sys.exit(1)


def main():
    """Main entry point for the script."""
    
    parser = argparse.ArgumentParser(
        description="Extract parameters from PDF using API calls",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Simple extraction
  python test_api_extraction.py parameters.json datasheet.pdf
  
  # AI-powered extraction with custom output
  python test_api_extraction.py parameters.json datasheet.pdf --mode ai --output results.json
  
  # Using absolute paths
  python test_api_extraction.py C:/data/params.json C:/data/spec.pdf --mode ai
        """
    )
    
    parser.add_argument(
        "parameters_file",
        type=Path,
        help="Path to parameters JSON file"
    )
    
    parser.add_argument(
        "pdf_file",
        type=Path,
        help="Path to PDF file to extract from"
    )
    
    parser.add_argument(
        "--mode",
        choices=["simple", "ai"],
        default="simple",
        help="Extraction mode: 'simple' (regex/fuzzy) or 'ai' (GPT-4o) (default: simple)"
    )
    
    parser.add_argument(
        "--output",
        "-o",
        type=Path,
        default=None,
        help="Output JSON file path (default: extracted_results.json)"
    )
    
    parser.add_argument(
        "--base-url",
        default="http://localhost:8000",
        help="Backend API base URL (default: http://localhost:8000)"
    )
    
    args = parser.parse_args()
    
    # Validate input files
    if not args.parameters_file.exists():
        print(f"❌ Error: Parameters file not found: {args.parameters_file}")
        sys.exit(1)
    
    if not args.pdf_file.exists():
        print(f"❌ Error: PDF file not found: {args.pdf_file}")
        sys.exit(1)
    
    # Set default output file if not specified
    if args.output is None:
        args.output = Path("extracted_results.json")
    
    # Run extraction
    extractor = APIExtractor(base_url=args.base_url)
    results = extractor.run_extraction(
        parameters_file=args.parameters_file,
        pdf_file=args.pdf_file,
        mode=args.mode,
        output_file=args.output
    )
    
    print(f"✅ Extraction complete! Results saved to: {args.output}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
