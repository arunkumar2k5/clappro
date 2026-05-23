import { TimingStatus } from '@/types';

/**
 * Parse numeric value from a string that may contain units or ranges
 * Examples: "70 ns" -> 70, "4.75 to 5.5 V" -> 4.75, "0" -> 0
 */
export function parseNumericValue(valueStr: string): number | null {
  if (!valueStr || valueStr === 'N/A') {
    return null;
  }

  // Remove common units and trim
  const cleaned = valueStr
    .replace(/\s*(ns|ms|us|μs|ps|V|mA|A|degC|°C)\s*/gi, '')
    .trim();

  // Handle ranges - take the first number (minimum value)
  if (cleaned.includes('to') || cleaned.includes('-')) {
    const parts = cleaned.split(/\s+to\s+|-/).map(p => p.trim());
    const firstNum = parseFloat(parts[0]);
    return isNaN(firstNum) ? null : firstNum;
  }

  // Handle parenthetical variants like "4.75 to 5.5 (M48Z58) / 4.5 to 5.5 (M48Z58Y)"
  if (cleaned.includes('/')) {
    const parts = cleaned.split('/')[0].trim();
    return parseNumericValue(parts);
  }

  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Extract unit from value string
 * Examples: "70 ns" -> "ns", "4.75 V" -> "V"
 */
export function extractUnit(valueStr: string): string {
  if (!valueStr || valueStr === 'N/A') {
    return '';
  }

  const unitMatch = valueStr.match(/\s*(ns|ms|us|μs|ps|V|mA|A|degC|°C)\s*$/i);
  return unitMatch ? unitMatch[1] : '';
}

/**
 * Determine which formula to use based on comparison_type
 * Formula A: margin = base - candidate (Candidate must be <= Base)
 * Formula B: margin = candidate - base (Candidate must be >= Base)
 */
export function getComparisonFormula(comparisonType: string): 'A' | 'B' {
  const formulaATypes = ['chip_performance_max', 'system_requirement_min'];
  const formulaBTypes = ['chip_guarantee_min', 'chip_guarantee_max'];

  if (formulaATypes.includes(comparisonType)) {
    return 'A';
  } else if (formulaBTypes.includes(comparisonType)) {
    return 'B';
  }

  // Default to Formula A for unknown types
  console.warn(`Unknown comparison_type: ${comparisonType}, defaulting to Formula A`);
  return 'A';
}

/**
 * Calculate margin based on formula type
 * Returns margin value and whether it passes (margin >= 0)
 */
export function calculateMargin(
  baseValue: number,
  candidateValue: number,
  formula: 'A' | 'B'
): { margin: number; passes: boolean } {
  const margin = formula === 'A' 
    ? baseValue - candidateValue  // Formula A: base - candidate
    : candidateValue - baseValue;  // Formula B: candidate - base

  return {
    margin,
    passes: margin >= 0
  };
}

/**
 * Generate human-readable rule text based on comparison type
 */
export function generateRuleText(comparisonType: string): string {
  const formula = getComparisonFormula(comparisonType);
  
  if (formula === 'A') {
    return 'Candidate ≤ Base';
  } else {
    return 'Candidate ≥ Base';
  }
}

/**
 * Determine parameter status based on margin, confidence, and data availability
 */
export function determineStatus(
  baseValue: number | null,
  candidateValue: number | null,
  margin: number | null,
  confidence: number | undefined
): TimingStatus {
  // If base value is missing, we can't compare
  if (baseValue === null) {
    return 'UNVERIFIABLE';
  }

  // If candidate value is missing
  if (candidateValue === null) {
    return 'UNVERIFIABLE';
  }

  // If confidence is below threshold (must be > 0.70 for clean OK)
  if (confidence !== undefined && confidence <= 0.70) {
    return 'FLAGGED';
  }

  // Check margin
  if (margin === null) {
    return 'UNVERIFIABLE';
  }

  return margin >= 0 ? 'OK' : 'NOT_OK';
}

/**
 * Format margin for display with unit
 */
export function formatMargin(margin: number | null, unit: string): string {
  if (margin === null) {
    return 'N/A';
  }

  const sign = margin >= 0 ? '+' : '';
  return `${sign}${margin.toFixed(2)} ${unit}`;
}

/**
 * Check if units match between base and candidate
 */
export function unitsMatch(baseUnit: string, candidateUnit: string): boolean {
  if (!baseUnit || !candidateUnit) {
    return true; // If either is missing, don't flag as mismatch
  }

  // Normalize units for comparison
  const normalize = (unit: string) => unit.toLowerCase().replace(/\s+/g, '');
  
  return normalize(baseUnit) === normalize(candidateUnit);
}
