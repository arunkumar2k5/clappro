from typing import Dict, List
from models.comparison import MatchStatus, ComparisonCell, ComponentComparison

def compare_components(
    base_component: Dict[str, str],
    components: List[Dict[str, str]],
    parameter_names: List[str]
) -> List[ComponentComparison]:
    """
    Compare each component against the base component.
    """
    comparisons = []
    
    for comp in components:
        parameters_comparison = {}
        match_count = 0
        total_params = len(parameter_names)
        
        for param_name in parameter_names:
            base_value = base_component.get(param_name, "N/A")
            comp_value = comp.get(param_name, "N/A")
            
            if base_value == "N/A" or comp_value == "N/A":
                status = MatchStatus.NOT_AVAILABLE
            elif normalize_value(base_value) == normalize_value(comp_value):
                status = MatchStatus.MATCH
                match_count += 1
            else:
                status = MatchStatus.NO_MATCH
            
            parameters_comparison[param_name] = ComparisonCell(
                value=comp_value,
                status=status
            )
        
        match_percentage = (match_count / total_params * 100) if total_params > 0 else 0
        
        comparisons.append(ComponentComparison(
            part_number=comp.get("part_number", "Unknown"),
            manufacturer=comp.get("manufacturer", "Unknown"),
            parameters=parameters_comparison,
            match_count=match_count,
            total_parameters=total_params,
            match_percentage=match_percentage
        ))
    
    return comparisons

def normalize_value(value: str) -> str:
    """
    Normalize parameter values for comparison.
    """
    return value.strip().lower().replace(" ", "")

def generate_justifications(
    parameter_names: List[str],
    base_component: Dict[str, str],
    comparisons: List[ComponentComparison]
) -> Dict[str, str]:
    """
    Generate justification text for each parameter row.
    """
    justifications = {}
    
    for param_name in parameter_names:
        base_value = base_component.get(param_name, "N/A")
        matching = []
        not_matching = []
        
        for comp in comparisons:
            param_cell = comp.parameters.get(param_name)
            if param_cell:
                if param_cell.status == MatchStatus.MATCH:
                    matching.append(comp.part_number)
                elif param_cell.status == MatchStatus.NO_MATCH:
                    not_matching.append(f"{comp.part_number} ({param_cell.value})")
        
        parts = []
        if matching:
            parts.append(f"Match: {', '.join(matching)}")
        if not_matching:
            parts.append(f"Mismatch: {', '.join(not_matching)}")
        
        justifications[param_name] = " | ".join(parts) if parts else "No data available"
    
    return justifications
