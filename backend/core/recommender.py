from typing import List, Optional, Tuple
from models.comparison import ComponentComparison

def get_recommendation(comparisons: List[ComponentComparison]) -> Tuple[Optional[str], bool, Optional[str]]:
    """
    Determine the best replacement component.
    
    Returns:
        (recommendation, no_exact_match, best_partial_match)
    """
    if not comparisons:
        return None, True, None
    
    exact_matches = [c for c in comparisons if c.match_count == c.total_parameters]
    
    if exact_matches:
        best = max(exact_matches, key=lambda c: c.match_percentage)
        return (
            f"{best.part_number} by {best.manufacturer} - Perfect match with {best.match_count}/{best.total_parameters} parameters matching",
            False,
            None
        )
    
    best_partial = max(comparisons, key=lambda c: c.match_percentage)
    
    if best_partial.match_count == 0:
        return (
            None,
            True,
            f"{best_partial.part_number} by {best_partial.manufacturer} - No parameters match"
        )
    
    return (
        None,
        True,
        f"{best_partial.part_number} by {best_partial.manufacturer} - Partial match with {best_partial.match_count}/{best_partial.total_parameters} parameters matching ({best_partial.match_percentage:.1f}%)"
    )
