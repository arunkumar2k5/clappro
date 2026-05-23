from typing import Dict, List
from models.comparison import MatchStatus, ComparisonCell, ComponentComparison
import os
import httpx
import json

def compare_components(
    base_component: Dict[str, str],
    components: List[Dict[str, str]],
    parameter_names: List[str]
) -> List[ComponentComparison]:
    """
    Compare each component against the base component using AI-powered semantic matching.
    """
    comparisons = []
    
    for comp in components:
        parameters_comparison = {}
        match_count = 0
        total_params = len(parameter_names)
        
        # Prepare all parameters for batch AI comparison
        comparison_pairs = []
        for param_name in parameter_names:
            base_value = base_component.get(param_name, "N/A")
            comp_value = comp.get(param_name, "N/A")
            comparison_pairs.append({
                "parameter": param_name,
                "base_value": base_value,
                "comp_value": comp_value
            })
        
        # Use AI to intelligently compare all parameters at once
        match_results = ai_compare_parameters(comparison_pairs)
        
        # Safety check: ensure match_results length matches parameter_names length
        if len(match_results) != len(parameter_names):
            print(f"⚠️  Warning: AI returned {len(match_results)} results but expected {len(parameter_names)}. Using fallback comparison.")
            match_results = [simple_compare(pair["base_value"], pair["comp_value"]) for pair in comparison_pairs]
        
        for i, param_name in enumerate(parameter_names):
            base_value = base_component.get(param_name, "N/A")
            comp_value = comp.get(param_name, "N/A")
            
            if base_value == "N/A" or comp_value == "N/A":
                status = MatchStatus.NOT_AVAILABLE
            elif match_results[i]:
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

def ai_compare_parameters(comparison_pairs: List[Dict]) -> List[bool]:
    """
    Use AI to intelligently compare parameter values, handling unit conversions,
    number formats, and semantic equivalence.
    """
    try:
        api_key = os.getenv("OPENROUTER_API_KEY")
        base_url = os.getenv("OPENROUTER_BASE_URL", "https://openrouter.ai/api/v1")
        model = os.getenv("OPENROUTER_MODEL", "anthropic/claude-sonnet-4")
        
        if not api_key:
            print("⚠️  No OpenRouter API key found, falling back to simple comparison")
            return [simple_compare(pair["base_value"], pair["comp_value"]) for pair in comparison_pairs]
        
        # Build comparison prompt
        prompt = """You are an expert in electronic component specifications. Compare the following parameter values and determine if they are equivalent OR if the comparison component meets or exceeds the base component's specifications.

Consider:
- Unit conversions (e.g., 64 Kbits = 65,536 bits, 64KB = 64,000 bytes)
- Number formats (e.g., 1000000 = 1,000,000 = 1 million)
- Voltage equivalents (e.g., 3.3V = 3.3 Volts)
- Temperature formats (e.g., -40°C to 85°C = -40 to 85 °C)
- Range formats (e.g., 2.7-5.5V = 2.7V to 5.5V)
- Approximate matches within engineering tolerance (±5%)

IMPORTANT - Better or Equal Specifications:
- Operating Temperature Min: Lower is BETTER (e.g., -40°C is better than 0°C)
- Operating Temperature Max: Higher is BETTER (e.g., 125°C is better than 85°C)
- Memory Size: Larger is BETTER or EQUAL (e.g., 128KB is acceptable for 64KB requirement)
- Voltage Range: Wider is BETTER (e.g., 2.5-5.5V is better than 3.0-5.0V)
- Speed/Access Time: Faster is BETTER (e.g., 50ns is better than 70ns)
- Endurance/Write Cycles: More is BETTER (e.g., 1,000,000 cycles is better than 100,000)
- Data Retention: Longer is BETTER (e.g., 100 years is better than 10 years)

Mark as MATCH (true) if:
1. Values are exactly equivalent (with unit/format conversion)
2. Comparison component meets or EXCEEDS the base component's specification
3. Comparison component is within acceptable engineering tolerance

Mark as NO MATCH (false) ONLY if:
- Comparison component is WORSE than base component
- Values are fundamentally incompatible (e.g., different interface types)

Parameters to compare:
"""
        
        for i, pair in enumerate(comparison_pairs):
            prompt += f"\n{i+1}. Parameter: {pair['parameter']}"
            prompt += f"\n   Base: {pair['base_value']}"
            prompt += f"\n   Compare: {pair['comp_value']}"
        
        prompt += """\n\nRespond with ONLY a JSON array of boolean values (true/false), one for each parameter comparison.
Example: [true, false, true, true, false]

JSON array:"""
        
        response = httpx.post(
            f"{base_url}/chat/completions",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json"
            },
            json={
                "model": model,
                "messages": [
                    {"role": "user", "content": prompt}
                ],
                "temperature": 0.1,
                "max_tokens": 500
            },
            timeout=30.0
        )
        
        response.raise_for_status()
        result = response.json()
        content = result["choices"][0]["message"]["content"].strip()
        
        # Parse JSON array from response
        # Handle cases where AI might wrap it in markdown code blocks
        if "```" in content:
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        content = content.strip()
        
        matches = json.loads(content)
        print(f"✅ AI comparison completed: {sum(matches)}/{len(matches)} matches")
        return matches
        
    except Exception as e:
        print(f"⚠️  AI comparison failed: {str(e)}, falling back to simple comparison")
        return [simple_compare(pair["base_value"], pair["comp_value"]) for pair in comparison_pairs]

def simple_compare(base_value: str, comp_value: str) -> bool:
    """
    Fallback simple comparison when AI is not available.
    """
    return normalize_value(base_value) == normalize_value(comp_value)

def normalize_value(value: str) -> str:
    """
    Normalize parameter values for simple comparison.
    """
    return value.strip().lower().replace(" ", "").replace(",", "")

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
