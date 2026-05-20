from fastapi import APIRouter, HTTPException, UploadFile, File, Form
from fastapi.responses import StreamingResponse
from typing import List, Optional
import json
import os
from io import BytesIO

from models.component import DatasheetSearchRequest, DatasheetSearchResponse
from models.extraction import ExtractionRequest, ExtractionResponse, ParameterValue
from models.comparison import ComparisonRequest, ComparisonResponse, ExportRequest

from integrations.ai_extractor import extract_with_anthropic, extract_with_openrouter
from integrations.xtract_ai import extract_with_xtract_ai
from integrations.datasheet_search import search_datasheet

from core.comparator import compare_components, generate_justifications
from core.recommender import get_recommendation
from core.exporter import generate_excel_export

router = APIRouter()

@router.get("/component-types")
async def get_component_types():
    """
    Returns list of component types.
    In production, this would read from frontend data file.
    """
    return ["EEPROM", "Capacitor", "Resistor", "MOSFET"]

@router.get("/parameters/{component_type}")
async def get_parameters(component_type: str):
    """
    Returns parameter list for a given component type.
    """
    parameters_map = {
        "EEPROM": [
            {"name": "size", "label": "Memory Size", "unit": "KB"},
            {"name": "footprint", "label": "Footprint", "unit": ""},
            {"name": "interface", "label": "Interface", "unit": ""},
            {"name": "voltage", "label": "Supply Voltage", "unit": "V"},
            {"name": "write_endurance", "label": "Write Endurance", "unit": "cycles"}
        ],
        "Capacitor": [
            {"name": "capacitance", "label": "Capacitance", "unit": "uF"},
            {"name": "voltage_rating", "label": "Voltage Rating", "unit": "V"},
            {"name": "tolerance", "label": "Tolerance", "unit": "%"},
            {"name": "esr", "label": "ESR", "unit": "mOhm"},
            {"name": "package", "label": "Package", "unit": ""}
        ],
        "Resistor": [
            {"name": "resistance", "label": "Resistance", "unit": "Ohm"},
            {"name": "power_rating", "label": "Power Rating", "unit": "W"},
            {"name": "tolerance", "label": "Tolerance", "unit": "%"},
            {"name": "package", "label": "Package", "unit": ""}
        ],
        "MOSFET": [
            {"name": "vds", "label": "VDS", "unit": "V"},
            {"name": "vgs", "label": "VGS", "unit": "V"},
            {"name": "rds_on", "label": "RDS(on)", "unit": "mOhm"},
            {"name": "id", "label": "Drain Current", "unit": "A"},
            {"name": "package", "label": "Package", "unit": ""}
        ]
    }
    
    if component_type not in parameters_map:
        raise HTTPException(status_code=404, detail="Component type not found")
    
    return parameters_map[component_type]

@router.post("/search-datasheet", response_model=DatasheetSearchResponse)
async def search_datasheet_endpoint(request: DatasheetSearchRequest):
    """
    Search for datasheet URL using Tavily API.
    """
    try:
        url = await search_datasheet(request.part_number, request.manufacturer)
        if not url:
            raise HTTPException(status_code=404, detail="Datasheet not found")
        return DatasheetSearchResponse(url=url)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Search failed: {str(e)}")

@router.post("/extract/ai", response_model=ExtractionResponse)
async def extract_ai(
    parameters: str = Form(...),
    part_number: str = Form(...),
    manufacturer: str = Form(...),
    datasheet_url: Optional[str] = Form(None),
    datasheet_file: Optional[UploadFile] = File(None)
):
    """
    Extract parameters using AI.
    - PDF file upload → Anthropic API
    - Datasheet URL → OpenRouter API
    """
    try:
        params_list = json.loads(parameters)
        
        ai_provider = os.getenv("AI_PROVIDER", "openrouter").lower()
        
        if datasheet_file:
            pdf_bytes = await datasheet_file.read()
            
            if ai_provider == "anthropic":
                result = await extract_with_anthropic(
                    params_list,
                    pdf_bytes,
                    part_number,
                    manufacturer
                )
            else:
                result = await extract_with_openrouter(
                    params_list,
                    datasheet_url or "",
                    part_number,
                    manufacturer,
                    pdf_bytes=pdf_bytes
                )
        elif datasheet_url:
            result = await extract_with_openrouter(
                params_list,
                datasheet_url,
                part_number,
                manufacturer
            )
        else:
            raise HTTPException(status_code=400, detail="Either datasheet_url or datasheet_file must be provided")
        
        parameters_dict = {}
        total_confidence = 0.0
        count = 0
        
        for param_name, data in result.items():
            parameters_dict[param_name] = ParameterValue(
                value=data.get("value", "N/A"),
                confidence=data.get("confidence", 0.0)
            )
            total_confidence += data.get("confidence", 0.0)
            count += 1
        
        overall_confidence = total_confidence / count if count > 0 else 0.0
        
        return ExtractionResponse(
            part_number=part_number,
            manufacturer=manufacturer,
            parameters=parameters_dict,
            overall_confidence=overall_confidence
        )
    
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        print(f"\n{'='*60}")
        print(f"ERROR in /extract/ai endpoint:")
        print(f"{'='*60}")
        print(error_traceback)
        print(f"{'='*60}\n")
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")

@router.post("/extract/xtract", response_model=ExtractionResponse)
async def extract_xtract(
    parameters: str = Form(...),
    part_number: str = Form(...),
    manufacturer: str = Form(...),
    datasheet_url: Optional[str] = Form(None),
    datasheet_file: Optional[UploadFile] = File(None)
):
    """
    Extract parameters using Xtract AI Docker service.
    """
    try:
        params_list = json.loads(parameters)
        
        pdf_bytes = None
        pdf_filename = ""
        if datasheet_file:
            pdf_bytes = await datasheet_file.read()
            pdf_filename = datasheet_file.filename
        
        result = await extract_with_xtract_ai(
            params_list,
            datasheet_url,
            pdf_bytes,
            part_number,
            manufacturer,
            pdf_filename
        )
        
        parameters_dict = {}
        total_confidence = 0.0
        count = 0
        
        for param_name, data in result.items():
            parameters_dict[param_name] = ParameterValue(
                value=data.get("value", "N/A"),
                confidence=data.get("confidence", 0.85)
            )
            total_confidence += data.get("confidence", 0.85)
            count += 1
        
        overall_confidence = total_confidence / count if count > 0 else 0.0
        
        return ExtractionResponse(
            part_number=part_number,
            manufacturer=manufacturer,
            parameters=parameters_dict,
            overall_confidence=overall_confidence
        )
    
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        print(f"\n{'='*60}")
        print(f"ERROR in /extract/xtract endpoint:")
        print(f"{'='*60}")
        print(error_traceback)
        print(f"{'='*60}\n")
        raise HTTPException(status_code=500, detail=f"Extraction failed: {str(e)}")

@router.post("/compare", response_model=ComparisonResponse)
async def compare(request: ComparisonRequest):
    """
    Compare components and generate recommendation.
    """
    try:
        comparisons = compare_components(
            request.base_component,
            request.components,
            request.parameter_names
        )
        
        justifications = generate_justifications(
            request.parameter_names,
            request.base_component,
            comparisons
        )
        
        recommendation, no_exact_match, best_partial = get_recommendation(comparisons)
        
        return ComparisonResponse(
            base_component=f"{request.base_component.get('part_number', 'Unknown')} by {request.base_component.get('manufacturer', 'Unknown')}",
            comparisons=comparisons,
            justifications=justifications,
            recommendation=recommendation,
            no_exact_match=no_exact_match,
            best_partial_match=best_partial
        )
    
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        print(f"\n{'='*60}")
        print(f"ERROR in /compare endpoint:")
        print(f"{'='*60}")
        print(error_traceback)
        print(f"{'='*60}\n")
        raise HTTPException(status_code=500, detail=f"Comparison failed: {str(e)}")

@router.post("/export")
async def export_excel(request: ExportRequest):
    """
    Generate and download Excel file with comparison results.
    """
    try:
        from models.comparison import ComponentComparison, ComparisonCell, MatchStatus
        
        # Extract data from request
        parameter_names = request.parameter_names
        base_component = request.base_component
        comparisons = request.comparisons
        justifications = request.justifications
        recommendation = request.recommendation
        confidence_scores = request.confidence_scores
        
        comp_objects = []
        for comp_data in comparisons:
            params = {}
            for param_name, cell_data in comp_data.get("parameters", {}).items():
                params[param_name] = ComparisonCell(
                    value=cell_data.get("value", "N/A"),
                    status=MatchStatus(cell_data.get("status", "not_available"))
                )
            
            # Handle both camelCase (from frontend) and snake_case (from backend)
            comp_objects.append(ComponentComparison(
                part_number=comp_data.get("partNumber") or comp_data.get("part_number", "Unknown"),
                manufacturer=comp_data.get("manufacturer", "Unknown"),
                parameters=params,
                match_count=comp_data.get("matchCount") or comp_data.get("match_count", 0),
                total_parameters=comp_data.get("totalParameters") or comp_data.get("total_parameters", 0),
                match_percentage=comp_data.get("matchPercentage") or comp_data.get("match_percentage", 0.0)
            ))
        
        excel_bytes = generate_excel_export(
            parameter_names,
            base_component,
            comp_objects,
            justifications,
            recommendation,
            confidence_scores
        )
        
        return StreamingResponse(
            BytesIO(excel_bytes),
            media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            headers={"Content-Disposition": "attachment; filename=component_comparison.xlsx"}
        )
    
    except Exception as e:
        import traceback
        error_traceback = traceback.format_exc()
        print(f"\n{'='*60}")
        print(f"ERROR in /export endpoint:")
        print(f"{'='*60}")
        print(f"Request data types:")
        print(f"  parameter_names: {type(parameter_names)}")
        print(f"  base_component: {type(base_component)}")
        print(f"  comparisons: {type(comparisons)}")
        print(f"  justifications: {type(justifications)}")
        print(f"  recommendation: {type(recommendation)}")
        print(f"  confidence_scores: {type(confidence_scores)}")
        print(error_traceback)
        print(f"{'='*60}\n")
        raise HTTPException(status_code=500, detail=f"Export failed: {str(e)}")
