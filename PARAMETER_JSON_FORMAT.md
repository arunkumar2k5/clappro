# Parameter JSON Format Documentation

## Overview

This document describes the JSON format for parameter files used with the PDF Parameter Extraction Backend API. External applications should use this format when calling the `/api/upload-parameters` endpoint.

---

## Basic Format

### Simple Format (Recommended for Basic Use)

```json
{
  "parameters": [
    {
      "name": "Input Voltage",
      "value": null,
      "unit": "V",
      "Symbol": "VI",
      "confidence": 0
    },
    {
      "name": "Output Current",
      "value": null,
      "unit": "A",
      "Symbol": "IO",
      "confidence": 0
    }
  ]
}
```

### Advanced Format (For Canonical Parameters with Aliases)

```json
{
  "parameters": [
    {
      "name": "supply_voltage",
      "description": "Operating DC supply voltage range",
      "symbols": ["VCC", "VDD", "VS", "VSUPPLY"],
      "aliases": [
        "supply voltage",
        "operating voltage",
        "power supply voltage"
      ],
      "unit": "V",
      "value_type": "range",
      "comparison_type": "range_must_cover",
      "notes": "Additional notes about the parameter",
      "confidence": 0
    }
  ]
}
```

---

## Field Descriptions

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `parameters` | Array | Root array containing all parameter objects | `[{...}, {...}]` |
| `name` | String | Parameter name to search for in the PDF | `"Input Voltage"` |

### Optional Fields (Simple Format)

| Field | Type | Description | Example | Default |
|-------|------|-------------|---------|---------|
| `value` | Number/null | Pre-filled value (usually `null` for extraction) | `null` or `5.0` | `null` |
| `unit` | String | Expected unit of measurement | `"V"`, `"A"`, `"°C"` | `""` |
| `Symbol` | String | Technical symbol for the parameter | `"VI"`, `"IO"` | `""` |
| `confidence` | Number | Confidence score (0-100) | `0` | `0` |

### Optional Fields (Advanced Format)

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `description` | String | Detailed parameter description | `"Operating DC supply voltage range"` |
| `symbols` | Array | List of possible symbols | `["VCC", "VDD", "VS"]` |
| `aliases` | Array | Alternative names for the parameter | `["supply voltage", "operating voltage"]` |
| `value_type` | String | Type of value expected | `"range"`, `"min"`, `"max"`, `"typical"` |
| `comparison_type` | String | How to compare values | `"range_must_cover"`, `"min_threshold"` |
| `notes` | String | Additional notes or requirements | `"Candidate must support 4.75-5.5V"` |

---

## Examples

### Example 1: Basic Parameter List

```json
{
  "parameters": [
    {
      "name": "Input Voltage",
      "unit": "V",
      "Symbol": "VI"
    },
    {
      "name": "Output Current",
      "unit": "A",
      "Symbol": "IO"
    },
    {
      "name": "Junction Temperature",
      "unit": "°C",
      "Symbol": "TJ"
    }
  ]
}
```

### Example 2: Parameters with Pre-filled Values

```json
{
  "parameters": [
    {
      "name": "Input Voltage",
      "value": 5.0,
      "unit": "V",
      "Symbol": "VI",
      "confidence": 95
    },
    {
      "name": "Output Current",
      "value": null,
      "unit": "A",
      "Symbol": "IO",
      "confidence": 0
    }
  ]
}
```

### Example 3: Canonical Parameters with Aliases

```json
{
  "parameters": [
    {
      "name": "supply_voltage",
      "description": "Operating DC supply voltage range",
      "symbols": ["VCC", "VDD", "VSUPPLY"],
      "aliases": [
        "supply voltage",
        "operating voltage",
        "power supply voltage"
      ],
      "unit": "V",
      "value_type": "range",
      "confidence": 0
    },
    {
      "name": "input_high_voltage",
      "description": "Minimum voltage for logic HIGH",
      "symbols": ["VIH", "VIN_H", "VINH"],
      "aliases": [
        "input high voltage",
        "logic high input voltage",
        "high level input voltage"
      ],
      "unit": "V",
      "value_type": "min",
      "confidence": 0
    }
  ]
}
```

---

## Usage with API

### Step 1: Prepare JSON File

Create a JSON file with your parameters following the format above.

**File:** `my_parameters.json`

```json
{
  "parameters": [
    {
      "name": "Input Voltage",
      "unit": "V",
      "Symbol": "VI"
    },
    {
      "name": "Output Current",
      "unit": "A",
      "Symbol": "IO"
    }
  ]
}
```

### Step 2: Upload to Backend

**Using Python:**

```python
import requests

# Upload parameters
with open('my_parameters.json', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/api/upload-parameters',
        files={'file': ('my_parameters.json', f, 'application/json')}
    )

print(response.json())
# Output: {"success": true, "parameters": [...], "count": 2}
```

**Using cURL:**

```bash
curl -X POST http://localhost:8000/api/upload-parameters \
  -F "file=@my_parameters.json"
```

### Step 3: Upload PDF and Extract

```python
# Upload PDF
with open('datasheet.pdf', 'rb') as f:
    response = requests.post(
        'http://localhost:8000/api/upload-pdf',
        files={'file': ('datasheet.pdf', f, 'application/pdf')}
    )

# Extract parameters
response = requests.post(
    'http://localhost:8000/api/extract',
    json={'mode': 'ai'}  # or 'simple'
)

results = response.json()
print(results['results'])
```

---

## Field Guidelines

### Parameter Names

- Use clear, descriptive names
- Be consistent with terminology
- Include aliases for better matching (advanced format)
- Examples: `"Input Voltage"`, `"Output Current"`, `"Junction Temperature"`

### Units

- Use standard abbreviations
- Common units: `"V"`, `"A"`, `"W"`, `"°C"`, `"Hz"`, `"Ω"`
- Use `null` or empty string if unit is not applicable
- Be consistent across all parameters

### Symbols

- Use standard electrical/engineering symbols
- Examples: `"VI"`, `"VO"`, `"IO"`, `"TJ"`, `"VCC"`
- Can be empty if not applicable
- Helps with precise matching in PDFs

### Value Types (Advanced)

- `"range"` - Min/max range (e.g., 4.5V - 5.5V)
- `"min"` - Minimum value
- `"max"` - Maximum value
- `"typical"` - Typical/nominal value
- `"exact"` - Exact value

---

## Validation Rules

### Required Structure

✅ **Valid:**
```json
{
  "parameters": [
    {"name": "Input Voltage"}
  ]
}
```

❌ **Invalid (missing parameters array):**
```json
{
  "name": "Input Voltage"
}
```

### Parameter Name

✅ **Valid:**
```json
{"name": "Input Voltage", "unit": "V"}
```

❌ **Invalid (missing name):**
```json
{"unit": "V", "Symbol": "VI"}
```

### Array Format

✅ **Valid:**
```json
{
  "parameters": [
    {"name": "Voltage"},
    {"name": "Current"}
  ]
}
```

❌ **Invalid (not an array):**
```json
{
  "parameters": {"name": "Voltage"}
}
```

---

## Supported File Formats

The backend accepts parameter files in the following formats:

1. **JSON** (`.json`) - Recommended
2. **CSV** (`.csv`) - First column should contain parameter names
3. **Excel** (`.xlsx`, `.xls`) - First column should contain parameter names

**Note:** JSON format provides the most flexibility and supports all features.

---

## Response Format

After uploading parameters, the API returns:

```json
{
  "success": true,
  "parameters": [
    "Input Voltage",
    "Output Current",
    "Junction Temperature"
  ],
  "count": 3
}
```

After extraction, the API returns:

```json
{
  "results": [
    {
      "name": "Input Voltage",
      "value": "4.5 - 5.5",
      "unit": "V",
      "Symbol": "VI",
      "confidence": 95,
      "page": 1,
      "context": "Operating voltage range: 4.5V to 5.5V"
    },
    {
      "name": "Output Current",
      "value": "500",
      "unit": "mA",
      "Symbol": "IO",
      "confidence": 90,
      "page": 3,
      "context": "Maximum output current: 500mA"
    }
  ]
}
```

---

## Best Practices

### 1. Use Descriptive Names
```json
✅ Good: "Input Voltage Range"
❌ Avoid: "V1", "Param1"
```

### 2. Include Units
```json
✅ Good: {"name": "Temperature", "unit": "°C"}
❌ Avoid: {"name": "Temperature"}
```

### 3. Add Symbols for Precision
```json
✅ Good: {"name": "Supply Voltage", "Symbol": "VCC"}
❌ Avoid: {"name": "Supply Voltage"}
```

### 4. Use Aliases for Better Matching (Advanced)
```json
✅ Good: {
  "name": "supply_voltage",
  "aliases": ["VCC", "supply voltage", "operating voltage"]
}
```

### 5. Keep JSON Valid
- Use double quotes for strings
- Use `null` instead of `NaN`
- Validate JSON before uploading

---

## Common Issues

### Issue 1: NaN Values

❌ **Invalid:**
```json
{"name": "Voltage", "value": NaN}
```

✅ **Valid:**
```json
{"name": "Voltage", "value": null}
```

### Issue 2: Missing Parameters Array

❌ **Invalid:**
```json
[
  {"name": "Voltage"},
  {"name": "Current"}
]
```

✅ **Valid:**
```json
{
  "parameters": [
    {"name": "Voltage"},
    {"name": "Current"}
  ]
}
```

### Issue 3: Single Quotes

❌ **Invalid:**
```json
{'name': 'Voltage'}
```

✅ **Valid:**
```json
{"name": "Voltage"}
```

---

## Quick Reference

### Minimal Valid JSON
```json
{
  "parameters": [
    {"name": "Parameter Name"}
  ]
}
```

### Complete Example
```json
{
  "parameters": [
    {
      "name": "Input Voltage",
      "value": null,
      "unit": "V",
      "Symbol": "VI",
      "confidence": 0
    }
  ]
}
```

### With Aliases (Advanced)
```json
{
  "parameters": [
    {
      "name": "supply_voltage",
      "description": "Operating voltage range",
      "symbols": ["VCC", "VDD"],
      "aliases": ["supply voltage", "operating voltage"],
      "unit": "V",
      "value_type": "range",
      "confidence": 0
    }
  ]
}
```

---

## Support

For questions or issues with the JSON format:
- Check the validation rules above
- Verify JSON syntax using a JSON validator
- Refer to the example files in the `tests/` directory
- Contact the backend API support team

---

**Last Updated:** May 23, 2026  
**API Version:** 1.017
