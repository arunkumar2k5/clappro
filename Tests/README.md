# Xtract AI Integration Tests

This directory contains test scripts for validating the Xtract AI Docker integration with CLAP PRO.

## Files

- **`test_xtract_integration.py`** - Standalone test script for Xtract AI integration
- **`test_api_extraction.py`** - Reference implementation from Xtract AI
- **`parameters.json`** - Sample parameters in Xtract AI format

## Test Script Usage

### Prerequisites

1. **Xtract AI Docker service running on port 8000**
   ```bash
   # Make sure the Docker container is running
   docker ps | grep xtract
   ```

2. **Python dependencies installed**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

### Running the Test

#### Basic Test (with default EEPROM parameters)
```bash
python test_xtract_integration.py ../Datasheets/AT24C_EEPROM.pdf
```

#### Test with Custom Parameters
```bash
python test_xtract_integration.py datasheet.pdf --parameters parameters.json
```

#### Test with CLAP PRO Format Parameters
```bash
python test_xtract_integration.py datasheet.pdf --parameters clap_params.json
```

### What the Test Does

1. **Loads Parameters** - Either default EEPROM parameters or from a JSON file
2. **Converts Format** - Transforms CLAP PRO format to Xtract AI format
3. **Uploads to Xtract AI**:
   - Uploads parameters JSON
   - Uploads PDF file
   - Triggers extraction with 'ai' mode
4. **Displays Results** - Shows extracted values with confidence scores
5. **Saves Output** - Creates `xtract_results_<filename>.json` with results

### Expected Output

```
================================================================================
🧪 Testing Xtract AI Integration
================================================================================

================================================================================
Input Parameters (CLAP PRO Format)
================================================================================
#    Name                           Unit       Label                         
--------------------------------------------------------------------------------
1    supply_voltage                 V          Supply Voltage                
2    memory_size                    Kbit       Memory Size                   
...

================================================================================
Converted to Xtract AI Format
================================================================================
{
  "parameters": [
    {
      "name": "Supply Voltage",
      "value": null,
      "unit": "V",
      "Symbol": "",
      "confidence": 0
    },
    ...
  ]
}

📄 Reading PDF file: ../Datasheets/AT24C_EEPROM.pdf
   File size: 370,967 bytes

🚀 Starting Xtract AI extraction...

✅ Uploaded 8 parameters to Xtract AI
✅ PDF uploaded: 24 pages
✅ Extraction complete: 8 parameters processed

================================================================================
Extraction Results
================================================================================
Parameter                                Value                     Confidence
--------------------------------------------------------------------------------
supply_voltage                           2.5V to 5.5V              0.95      
memory_size                              256Kbit                   0.98      
...

📊 Statistics:
   Total Parameters:     8
   Extracted:            6
   Missing:              2
   Success Rate:         75.0%

💾 Results saved to: xtract_results_AT24C_EEPROM.json

✅ Test completed successfully!
```

## Parameter Format

### CLAP PRO Format (Input)
```json
[
  {
    "name": "supply_voltage",
    "label": "Supply Voltage",
    "unit": "V"
  }
]
```

### Xtract AI Format (Converted)
```json
{
  "parameters": [
    {
      "name": "Supply Voltage",
      "value": null,
      "unit": "V",
      "Symbol": "",
      "confidence": 0
    }
  ]
}
```

### Result Format (Output)
```json
{
  "supply_voltage": {
    "value": "2.5V to 5.5V",
    "confidence": 0.95
  }
}
```

## Troubleshooting

### Error: Cannot connect to Xtract AI
```
❌ Error during extraction: HTTPStatusError: 404 Not Found
```
**Solution:** Make sure Xtract AI Docker is running on port 8000

### Error: PDF file not found
```
❌ Error: PDF file not found: datasheet.pdf
```
**Solution:** Check the file path is correct (use absolute or relative paths)

### Error: No parameters loaded
```
❌ Error: No parameters loaded
```
**Solution:** Check your parameters JSON file format

## Integration with CLAP PRO

The test script uses the same `extract_with_xtract_ai()` function that CLAP PRO uses in production. This ensures:

- **Format compatibility** - Parameters are converted correctly
- **API workflow** - 3-step process matches Xtract AI expectations
- **Error handling** - Same error handling as production code
- **Result parsing** - Results are formatted consistently

## Environment Variables

Set these in your `.env` file:

```env
XTRACT_AI_BASE_URL=http://localhost:8000
XTRACT_AI_MODE=ai
```

Modes:
- `simple` - Regex/fuzzy matching (faster, less accurate)
- `ai` - GPT-4o powered extraction (slower, more accurate)
