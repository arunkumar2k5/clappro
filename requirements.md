# CLAP PRO — Software Requirements Specification

## 1. Overview

CLAP PRO (Component Library Analysis Platform Pro) is a client-server web application
that enables engineers to compare passive electronic component specifications and identify
the best replacement component. It is a wizard-based tool with 5 screens guiding the user
from component selection through parameter extraction to final recommendation.

## 2. Tech Stack

| Layer     | Technology                                        |
|-----------|---------------------------------------------------|
| Frontend  | React 18+ with TypeScript                         |
| UI Style  | Wizard SPA — fixed footer nav, scrollable content |
| Backend   | Python 3.11+, FastAPI                             |
| AI        | OpenRouter API → Claude Sonnet                    |
| 3rd Party | Xtract AI (Docker-hosted REST service)            |
| Search    | Tavily API (datasheet URL lookup)                 |
| Export    | openpyxl (Excel .xlsx generation)                 |
| Config    | .env file — all secrets and URLs                  |

---

## 3. General UI/UX Requirements

- FR-UI-01: The application SHALL be a React-based Single Page Application (SPA).
- FR-UI-02: The application SHALL implement a multi-step wizard. Every screen has a fixed
  footer with a **Back** button (left) and a **Next** button (right).
- FR-UI-03: The main content area SHALL scroll independently. The footer SHALL remain
  fixed at the bottom at all times — this gives an app feel, not a website feel.
- FR-UI-04: The Back button SHALL be hidden on Screen 1. The Next button SHALL be
  hidden on Screen 5 (replaced by export action).
- FR-UI-05: A loading indicator SHALL be displayed during any API call.

---

## 4. Screen Requirements

### Screen 1 — Introduction

- FR-S1-01: Display the project name **CLAP PRO**.
- FR-S1-02: Display a brief project description — maximum 2 lines.
- FR-S1-03: Display the current application version (read from a config or package.json).
- FR-S1-04: Clicking **Next** navigates to Screen 2.

---

### Screen 2 — Component Type Selection & Parameter Setup

- FR-S2-01: Display a dropdown to select the component type.
- FR-S2-02: The component type list SHALL be loaded at startup from
  `frontend/src/data/component_types.json`. This file is human-editable offline.
- FR-S2-03: Once a component type is selected, prompt the user with two options:
  - **Option A**: Select parameters from the built-in list
  - **Option B**: Upload a custom `parameter.json` file
- FR-S2-04 (Option A): Display the built-in parameters for the selected component type
  in a scrollable list within the content area (not full-page scroll). Parameters are
  loaded from `frontend/src/data/parameters.json` keyed by component type.
- FR-S2-05 (Option A): Display an **Add Parameter** button at the bottom of the parameter
  list to allow the user to add a custom parameter inline.
- FR-S2-06 (Option B): Show a file upload control. Once a file is uploaded, the built-in
  parameter list SHALL be hidden and disabled. The uploaded file's parameters SHALL be
  used for all subsequent screens.
- FR-S2-07: Clicking **Next** passes the final parameter list (either built-in or uploaded)
  to subsequent screens.

---

### Screen 3 — Component Part Numbers & Datasheets

- FR-S3-01: Ask the user to enter the number of components to compare (numeric input).
- FR-S3-02: Dynamically render that many component sections in the scrollable content area,
  stacked vertically.
- FR-S3-03: Each component section SHALL contain:
  1. **Part Number** — text input
  2. **Manufacturer** — text input
  3. **Datasheet URL** — text input + **Search** button
  4. **PDF Datasheet** — file upload (accepts `.pdf` only)
- FR-S3-04: The **Search** button SHALL call `POST /api/search-datasheet` with the part
  number and manufacturer, and auto-populate the Datasheet URL field with the top result.
- FR-S3-05: Display a note at the bottom: *"The first component is the base component
  against which all others are compared."*

---

### Screen 4 — Extraction Method Selection

- FR-S4-01: Present the user with a choice of extraction method (radio buttons or toggle):
  - **AI Mode** (default) — uses Claude Sonnet via OpenRouter API
  - **3rd Party Tool** — uses Xtract AI running in Docker
- FR-S4-02: Clicking **Next** triggers the extraction process using the selected method
  for all components entered in Screen 3.
- FR-S4-03: Display a progress indicator while extraction runs (it may take several seconds
  per component).

---

### Screen 5 — Extraction Review, Comparison & Recommendation

This screen has two sub-phases, separated by a **Next** click.

#### Sub-phase 5a — Human-in-Loop Verification

- FR-S5-01: Display extraction results in a table:
  - **Rows** = parameters
  - **Columns** = components
- FR-S5-02: All cells SHALL be editable (inline text edit) for manual correction.
- FR-S5-03: Above each component column, display the extraction confidence as a percentage
  (e.g., *"Confidence: 87%"*).
- FR-S5-04: The first column (base component) SHALL have a distinct background color to
  visually indicate it is the reference.
- FR-S5-05: Clicking **Next** locks the table and triggers the comparison.

#### Sub-phase 5b — Comparison & Recommendation

- FR-S5-06: Each cell SHALL be color-coded:
  - **Green / tick** — parameter value matches the base component
  - **Red / cross** — parameter value does not match
- FR-S5-07: A final **Justification** column SHALL summarize, for each parameter row,
  which components are OK and which are not.
- FR-S5-08: A **Recommendation** section below the table SHALL state:
  - The component that is the closest match overall, OR
  - *"No exact match found"* with partial match details if no component matches all parameters.
- FR-S5-09: An **Export to Excel** button SHALL call `POST /api/export` and download an
  `.xlsx` file containing the full comparison table, confidence scores, justification
  column, and recommendation.

---

## 5. Backend Requirements

### 5.1 General

- FR-BE-01: The backend SHALL be a Python 3.11+ FastAPI application.
- FR-BE-02: All secrets and configuration SHALL be read from a `.env` file — never hardcoded.
- FR-BE-03: The backend SHALL be modular — each integration and domain in its own module.
- FR-BE-04: The backend SHALL serve a REST API consumed by the React frontend.
- FR-BE-05: All request/response models SHALL use Pydantic.

### 5.2 Environment Variables (.env)

```
OPENROUTER_API_KEY=
CLAUDE_API_KEY=
XTRACT_AI_BASE_URL=
XTRACT_AI_API_KEY=
TAVILY_API_KEY=
APP_PORT=8000
APP_VERSION=0.1.0
```

### 5.3 API Endpoints

| Method | Endpoint                    | Description                                               |
|--------|-----------------------------|-----------------------------------------------------------|
| GET    | `/api/component-types`      | Returns list of component types                           |
| GET    | `/api/parameters/{type}`    | Returns parameter list for a given component type         |
| POST   | `/api/search-datasheet`     | Accepts part number + manufacturer, returns datasheet URL |
| POST   | `/api/extract/ai`           | Extracts parameters using Claude via OpenRouter           |
| POST   | `/api/extract/xtract`       | Extracts parameters using Xtract AI Docker tool           |
| POST   | `/api/compare`              | Runs comparison and returns results with justification    |
| POST   | `/api/export`               | Generates and returns Excel file                          |

### 5.4 AI Extraction Module (`integrations/ai_extractor.py`)

- FR-BE-AI-01: Use the OpenRouter API with model `anthropic/claude-sonnet-4-5` (or latest).
- FR-BE-AI-02: Input: parameter list + datasheet (PDF file bytes or URL string).
- FR-BE-AI-03: Output: `{ "param_name": { "value": "...", "confidence": 0.92 }, ... }`
- FR-BE-AI-04: The prompt SHALL instruct the model to return a strict JSON object — no prose.
- FR-BE-AI-05: Handle both PDF file upload and URL-based datasheet as input modes.

### 5.5 Xtract AI Integration Module (`integrations/xtract_ai.py`)

- FR-BE-XA-01: POST to `XTRACT_AI_BASE_URL` with Bearer token auth.
- FR-BE-XA-02: Input: `{ "parameters": [...], "pdf": <file or url> }`
- FR-BE-XA-03: Output: parameter → value dictionary as returned by Xtract AI.

### 5.6 Datasheet Search Module (`integrations/datasheet_search.py`)

- FR-BE-DS-01: Use the Tavily API to search for datasheets.
- FR-BE-DS-02: Construct query from: `"{part_number} {manufacturer} datasheet filetype:pdf"`.
- FR-BE-DS-03: Return the top matching URL.

### 5.7 Comparison & Recommendation Module (`core/comparator.py`, `core/recommender.py`)

- FR-BE-CR-01: Compare each component's parameter values against the base component (index 0).
- FR-BE-CR-02: Each cell result SHALL be one of: `match`, `no_match`, or `not_available`.
- FR-BE-CR-03: The recommender SHALL score each component by the number of matching parameters
  and return the highest scorer as the recommendation.
- FR-BE-CR-04: If no component matches all parameters, return `"no_exact_match": true`
  with the best partial match details.

### 5.8 Export Module (`core/exporter.py`)

- FR-BE-EX-01: Generate an Excel `.xlsx` file using `openpyxl`.
- FR-BE-EX-02: The file SHALL include:
  - Parameter rows, component columns
  - Confidence scores in a header row
  - Comparison result color-coding (green/red cell fill)
  - Justification column
  - Recommendation section at the bottom

---

## 6. Data Files

### `frontend/src/data/component_types.json`
```json
["EEPROM", "Capacitor", "Resistor", "MOSFET"]
```
*Add new component types here — no code change required.*

### `frontend/src/data/parameters.json`
```json
{
  "EEPROM": [
    { "name": "size",             "label": "Memory Size",       "unit": "KB"      },
    { "name": "footprint",        "label": "Footprint",         "unit": ""        },
    { "name": "interface",        "label": "Interface",         "unit": ""        },
    { "name": "voltage",          "label": "Supply Voltage",    "unit": "V"       },
    { "name": "write_endurance",  "label": "Write Endurance",   "unit": "cycles"  }
  ],
  "Capacitor": [
    { "name": "capacitance",      "label": "Capacitance",       "unit": "uF"      },
    { "name": "voltage_rating",   "label": "Voltage Rating",    "unit": "V"       },
    { "name": "tolerance",        "label": "Tolerance",         "unit": "%"       },
    { "name": "esr",              "label": "ESR",               "unit": "mOhm"    },
    { "name": "package",          "label": "Package",           "unit": ""        }
  ],
  "Resistor": [
    { "name": "resistance",       "label": "Resistance",        "unit": "Ohm"     },
    { "name": "power_rating",     "label": "Power Rating",      "unit": "W"       },
    { "name": "tolerance",        "label": "Tolerance",         "unit": "%"       },
    { "name": "package",          "label": "Package",           "unit": ""        }
  ],
  "MOSFET": [
    { "name": "vds",              "label": "VDS",               "unit": "V"       },
    { "name": "vgs",              "label": "VGS",               "unit": "V"       },
    { "name": "rds_on",           "label": "RDS(on)",           "unit": "mOhm"    },
    { "name": "id",               "label": "Drain Current",     "unit": "A"       },
    { "name": "package",          "label": "Package",           "unit": ""        }
  ]
}
```

---

## 7. Project Structure

```
/clappro
  /frontend
    /src
      /screens
        Screen1Intro.tsx
        Screen2Parameters.tsx
        Screen3Components.tsx
        Screen4Extraction.tsx
        Screen5Results.tsx
      /components
        WizardShell.tsx       # Fixed footer + scrollable content wrapper
        ParameterList.tsx
        ComponentSection.tsx
        ComparisonTable.tsx
      /hooks
        useWizard.ts          # Step state management
      /data
        component_types.json
        parameters.json
    package.json
    tsconfig.json

  /backend
    /api
      routes.py               # FastAPI router — all endpoints
    /core
      comparator.py
      recommender.py
      exporter.py
    /integrations
      ai_extractor.py
      xtract_ai.py
      datasheet_search.py
    /models
      component.py            # Pydantic models
      extraction.py
      comparison.py
    main.py                   # FastAPI app entry point
    .env.example
    requirements.txt
```

---

## 8. Non-Functional Requirements

- NFR-01: The frontend SHALL respond to user interactions within 200ms (excluding API calls).
- NFR-02: The backend SHALL return meaningful, human-readable error messages for all failures.
- NFR-03: Data files (`component_types.json`, `parameters.json`) SHALL be plain JSON,
  human-readable and editable without any tooling.
- NFR-04: No API keys or secrets SHALL appear in frontend code or be committed to version control.
- NFR-05: The backend SHALL be runnable with a single command: `uvicorn main:app --reload`.
- NFR-06: The frontend SHALL be runnable with: `npm run dev`.
