# CLAP PRO - Component Library Analysis Platform Pro

A wizard-based web application for comparing passive electronic component specifications and identifying the best replacement component.

## Overview

CLAP PRO enables engineers to:
- Select component types and parameters
- Upload or search for component datasheets
- Extract specifications using AI (Anthropic/OpenRouter) or Xtract AI
- Compare components against a base reference
- Get intelligent recommendations
- Export results to Excel

## Tech Stack

**Frontend:**
- React 18 + TypeScript
- Vite
- TailwindCSS
- Axios
- Lucide Icons

**Backend:**
- Python 3.11+
- FastAPI
- Anthropic API (PDF extraction)
- OpenRouter API (URL-based extraction)
- Xtract AI (optional 3rd party)
- Tavily API (datasheet search)
- openpyxl (Excel export)

## Project Structure

```
/clappro
  /frontend          - React TypeScript SPA
    /src
      /screens       - 5 wizard screens
      /components    - Reusable UI components
      /hooks         - Custom React hooks
      /data          - Component types & parameters JSON
      /types         - TypeScript type definitions
  /backend           - FastAPI REST API
    /api             - API routes
    /core            - Business logic (comparator, recommender, exporter)
    /integrations    - External API integrations
    /models          - Pydantic models
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Python 3.11+
- pip

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Create `.env` file from example:
```bash
copy .env.example .env
```

6. Edit `.env` and add your API keys:
```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
XTRACT_AI_BASE_URL=http://localhost:8080
XTRACT_AI_API_KEY=your_xtract_ai_api_key_here
TAVILY_API_KEY=your_tavily_api_key_here
APP_PORT=8000
APP_VERSION=0.1.0
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Start Backend Server

```bash
cd backend
uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3000`

## Usage Guide

### Screen 1: Introduction
- View application name, description, and version

### Screen 2: Component Type & Parameters
- Select component type (EEPROM, Capacitor, Resistor, MOSFET)
- Choose built-in parameters or upload custom JSON
- Add custom parameters if needed

### Screen 3: Component Details
- Specify number of components to compare
- Enter part number and manufacturer for each
- Search for datasheets or upload PDF files
- First component is the BASE component

### Screen 4: Extraction Method
- **AI Mode**: Uses Anthropic API for PDF uploads, OpenRouter for URLs
- **3rd Party Tool**: Uses Xtract AI Docker service

### Screen 5: Results & Comparison
- **Phase 1**: Review and edit extracted parameters
- **Phase 2**: View color-coded comparison results
  - Green = Match
  - Red = No match
  - Justification column explains matches/mismatches
- Get recommendation for best replacement
- Export to Excel

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/component-types` | List component types |
| GET | `/api/parameters/{type}` | Get parameters for component type |
| POST | `/api/search-datasheet` | Search for datasheet URL |
| POST | `/api/extract/ai` | Extract using AI (Anthropic/OpenRouter) |
| POST | `/api/extract/xtract` | Extract using Xtract AI |
| POST | `/api/compare` | Compare components |
| POST | `/api/export` | Export to Excel |

## AI Extraction Logic

**PDF File Upload** → Anthropic API (native PDF handling)
- Uses Claude Sonnet 4 with document vision
- Direct PDF processing without URL

**Datasheet URL** → OpenRouter API (Claude Sonnet via proxy)
- Uses OpenRouter's Claude Sonnet 4 endpoint
- URL-based extraction

## Configuration Files

### Component Types
Edit `frontend/src/data/component_types.json` to add new component types.

### Parameters
Edit `frontend/src/data/parameters.json` to modify parameter definitions per component type.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| ANTHROPIC_API_KEY | Anthropic API key for PDF extraction | Yes |
| OPENROUTER_API_KEY | OpenRouter API key for URL extraction | Yes |
| XTRACT_AI_BASE_URL | Xtract AI service URL | Optional |
| XTRACT_AI_API_KEY | Xtract AI API key | Optional |
| TAVILY_API_KEY | Tavily search API key | Yes |
| APP_PORT | Backend server port | No (default: 8000) |
| APP_VERSION | Application version | No (default: 0.1.0) |

## Development

### Build Frontend for Production
```bash
cd frontend
npm run build
```

### Run Frontend Linter
```bash
cd frontend
npm run lint
```

## Troubleshooting

**Issue**: Extraction fails
- Verify API keys in `.env`
- Check API rate limits
- Ensure PDF files are valid

**Issue**: Datasheet search returns no results
- Verify Tavily API key
- Try manual URL entry
- Upload PDF directly

**Issue**: Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check CORS configuration in `main.py`

## License

Proprietary - All rights reserved

## Version

0.1.0
This is a clappro a calp project for the active Electronics component


## command to run Backend and front end. 

## backend
uvicorn main:app --reload --port 8001

## frontend
npm run dev