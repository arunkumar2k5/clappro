#!/usr/bin/env python3
"""
Test script for Xtract AI integration in CLAP PRO

This script tests the Xtract AI integration by:
1. Converting CLAP PRO parameters to Xtract AI format
2. Uploading parameters and PDF to Xtract AI Docker service
3. Triggering extraction
4. Parsing and displaying results

Usage:
    python test_xtract_integration.py <pdf_file.pdf> [--parameters parameters.json]

Example:
    python test_xtract_integration.py ../Datasheets/AT24C_EEPROM.pdf
    python test_xtract_integration.py datasheet.pdf --parameters custom_params.json
"""

import sys
import json
import asyncio
import argparse
from pathlib import Path

# Add backend to path to import integration module
sys.path.insert(0, str(Path(__file__).parent.parent / "backend"))

from integrations.xtract_ai import extract_with_xtract_ai, convert_to_xtract_format


# Sample CLAP PRO parameters for EEPROM
SAMPLE_EEPROM_PARAMETERS = [
    {"name": "supply_voltage", "label": "Supply Voltage", "unit": "V"},
    {"name": "memory_size", "label": "Memory Size", "unit": "Kbit"},
    {"name": "operating_temp_min", "label": "Operating Temperature (Min)", "unit": "°C"},
    {"name": "operating_temp_max", "label": "Operating Temperature (Max)", "unit": "°C"},
    {"name": "write_cycle_time", "label": "Write Cycle Time", "unit": "ms"},
    {"name": "data_retention", "label": "Data Retention", "unit": "years"},
    {"name": "endurance", "label": "Endurance (Write Cycles)", "unit": "cycles"},
    {"name": "access_time", "label": "Access Time", "unit": "ns"},
]


def load_parameters_from_file(file_path: Path) -> list:
    """Load parameters from JSON file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    # If file is in Xtract AI format, convert to CLAP PRO format
    if "parameters" in data and isinstance(data["parameters"], list):
        params = data["parameters"]
        if params and "Symbol" in params[0]:
            # Convert from Xtract AI format to CLAP PRO format
            clap_params = []
            for p in params:
                clap_params.append({
                    "name": p.get("name", "").lower().replace(" ", "_"),
                    "label": p.get("name", ""),
                    "unit": p.get("unit", "")
                })
            return clap_params
        return params
    
    return data if isinstance(data, list) else []


def print_parameters(parameters: list, title: str = "Parameters"):
    """Print parameters in a formatted table."""
    print(f"\n{'='*80}")
    print(f"{title}")
    print(f"{'='*80}")
    print(f"{'#':<4} {'Name':<30} {'Unit':<10} {'Label':<30}")
    print(f"{'-'*80}")
    for idx, param in enumerate(parameters, 1):
        name = param.get("name", "")
        label = param.get("label", param.get("name", ""))
        unit = param.get("unit", "")
        print(f"{idx:<4} {name:<30} {unit:<10} {label:<30}")
    print(f"{'='*80}\n")


def print_xtract_format(parameters: list):
    """Print parameters in Xtract AI format."""
    xtract_params = convert_to_xtract_format(parameters)
    
    print(f"\n{'='*80}")
    print("Converted to Xtract AI Format")
    print(f"{'='*80}")
    print(json.dumps({"parameters": xtract_params}, indent=2))
    print(f"{'='*80}\n")


def print_results(results: dict):
    """Print extraction results in a formatted table."""
    print(f"\n{'='*80}")
    print("Extraction Results")
    print(f"{'='*80}")
    print(f"{'Parameter':<40} {'Value':<25} {'Confidence':<10}")
    print(f"{'-'*80}")
    
    for param_name, data in results.items():
        value = data.get("value", "N/A")
        confidence = data.get("confidence", 0.0)
        print(f"{param_name:<40} {str(value):<25} {confidence:<10.2f}")
    
    print(f"{'='*80}\n")
    
    # Statistics
    total = len(results)
    extracted = len([v for v in results.values() if v.get("value") != "N/A"])
    success_rate = (extracted / total * 100) if total > 0 else 0
    
    print(f"📊 Statistics:")
    print(f"   Total Parameters:     {total}")
    print(f"   Extracted:            {extracted}")
    print(f"   Missing:              {total - extracted}")
    print(f"   Success Rate:         {success_rate:.1f}%")
    print()


async def test_xtract_extraction(pdf_file: Path, parameters: list):
    """Test the Xtract AI extraction workflow."""
    
    print("\n" + "="*80)
    print("🧪 Testing Xtract AI Integration")
    print("="*80 + "\n")
    
    # Print input parameters
    print_parameters(parameters, "Input Parameters (CLAP PRO Format)")
    
    # Show converted format
    print_xtract_format(parameters)
    
    # Read PDF file
    print(f"📄 Reading PDF file: {pdf_file}")
    with open(pdf_file, 'rb') as f:
        pdf_bytes = f.read()
    print(f"   File size: {len(pdf_bytes):,} bytes\n")
    
    # Test extraction
    print("🚀 Starting Xtract AI extraction...\n")
    
    try:
        results = await extract_with_xtract_ai(
            parameters=parameters,
            datasheet_file=pdf_bytes,
            part_number=pdf_file.stem,
            manufacturer="Test"
        )
        
        # Print results
        print_results(results)
        
        # Save results to file
        output_file = Path(__file__).parent / f"xtract_results_{pdf_file.stem}.json"
        with open(output_file, 'w', encoding='utf-8') as f:
            json.dump({
                "pdf_file": str(pdf_file),
                "parameters_count": len(parameters),
                "results": results
            }, f, indent=2)
        
        print(f"💾 Results saved to: {output_file}\n")
        print("✅ Test completed successfully!")
        
        return results
        
    except Exception as e:
        print(f"\n❌ Error during extraction: {e}")
        import traceback
        traceback.print_exc()
        return None


def main():
    """Main entry point."""
    
    parser = argparse.ArgumentParser(
        description="Test Xtract AI integration with CLAP PRO",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Use default EEPROM parameters
  python test_xtract_integration.py ../Datasheets/AT24C_EEPROM.pdf
  
  # Use custom parameters file
  python test_xtract_integration.py datasheet.pdf --parameters parameters.json
  
  # Test with Xtract AI format parameters
  python test_xtract_integration.py datasheet.pdf --parameters xtract_params.json
        """
    )
    
    parser.add_argument(
        "pdf_file",
        type=Path,
        help="Path to PDF file to extract from"
    )
    
    parser.add_argument(
        "--parameters",
        "-p",
        type=Path,
        default=None,
        help="Path to parameters JSON file (CLAP PRO or Xtract AI format)"
    )
    
    args = parser.parse_args()
    
    # Validate PDF file
    if not args.pdf_file.exists():
        print(f"❌ Error: PDF file not found: {args.pdf_file}")
        sys.exit(1)
    
    # Load or use default parameters
    if args.parameters:
        if not args.parameters.exists():
            print(f"❌ Error: Parameters file not found: {args.parameters}")
            sys.exit(1)
        print(f"📋 Loading parameters from: {args.parameters}")
        parameters = load_parameters_from_file(args.parameters)
    else:
        print("📋 Using default EEPROM parameters")
        parameters = SAMPLE_EEPROM_PARAMETERS
    
    if not parameters:
        print("❌ Error: No parameters loaded")
        sys.exit(1)
    
    # Run test
    asyncio.run(test_xtract_extraction(args.pdf_file, parameters))


if __name__ == "__main__":
    main()
