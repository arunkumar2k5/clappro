import { 
  ExtractionResult, 
  Parameter, 
  TimingParameter, 
  TimingSectionResult, 
  TimingAnalysisResult,
  SectionVerdict,
  OverallVerdict,
  TimingStatus
} from '@/types';
import {
  parseNumericValue,
  extractUnit,
  getComparisonFormula,
  calculateMargin,
  generateRuleText,
  determineStatus,
  formatMargin,
  unitsMatch
} from './timingAnalysis';
import canonicalParameters from '@/data/../../../Datasheets/sram_canonical_parameters.json';

// READ cycle parameter names from Section 5 of requirement doc
const READ_PARAMETERS = [
  'read_cycle_time',
  'address_access_time',
  'chip_enable_access_time',
  'output_enable_access_time',
  'chip_disable_to_output_high_z',
  'output_disable_to_output_high_z',
  'chip_enable_to_output_low_z',
  'output_enable_to_output_low_z',
  'output_hold_after_address_change'
];

// WRITE cycle parameter names from Section 6 of requirement doc
const WRITE_PARAMETERS = [
  'write_cycle_time',
  'address_setup_to_write_enable',
  'address_setup_to_chip_enable',
  'write_enable_pulse_width',
  'chip_enable_write_pulse_width',
  'address_valid_to_write_enable_high',
  'address_valid_to_chip_enable_high',
  'write_enable_high_to_address_hold',
  'chip_enable_high_to_address_hold',
  'data_setup_to_write_enable_high',
  'data_setup_to_chip_enable_high',
  'data_hold_after_write_enable_high',
  'data_hold_after_chip_enable_high',
  'write_enable_low_to_output_high_z',
  'write_enable_high_to_output_active'
];

/**
 * Get canonical parameter definition by name
 */
function getCanonicalParameter(paramName: string): Parameter | null {
  const param = canonicalParameters.parameters.find(p => p.name === paramName);
  return param || null;
}

/**
 * Format display name from canonical name
 */
function formatDisplayName(paramName: string): string {
  const canonical = getCanonicalParameter(paramName);
  if (canonical?.description) {
    // Use first part of description as display name
    const firstSentence = canonical.description.split('.')[0];
    return firstSentence.length > 60 
      ? paramName.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      : firstSentence;
  }
  
  // Fallback: convert snake_case to Title Case
  return paramName.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

/**
 * Compare a single parameter between base and candidate
 */
function compareParameter(
  paramName: string,
  baseResult: ExtractionResult,
  candidateResult: ExtractionResult
): TimingParameter | null {
  const canonical = getCanonicalParameter(paramName);
  
  // If parameter doesn't exist in canonical library, skip it
  if (!canonical || !canonical.comparison_type) {
    return null;
  }

  const baseParam = baseResult.parameters[paramName];
  const candidateParam = candidateResult.parameters[paramName];

  // Get values and units
  const baseValueStr = baseParam?.value || 'N/A';
  const candidateValueStr = candidateParam?.value || 'N/A';
  const baseUnit = extractUnit(baseValueStr);
  const candidateUnit = extractUnit(candidateValueStr);

  // Parse numeric values
  const baseValue = parseNumericValue(baseValueStr);
  const candidateValue = parseNumericValue(candidateValueStr);

  // Check for unit mismatch
  if (baseValue !== null && candidateValue !== null && !unitsMatch(baseUnit, candidateUnit)) {
    return {
      name: paramName,
      displayName: formatDisplayName(paramName),
      baseValue: baseValueStr,
      candidateValue: candidateValueStr,
      baseUnit,
      candidateUnit,
      rule: 'Unit mismatch',
      margin: 'N/A - manual check required',
      status: 'UNVERIFIABLE',
      confidence: candidateParam?.confidence
    };
  }

  // Determine formula and calculate margin
  const formula = getComparisonFormula(canonical.comparison_type);
  const rule = generateRuleText(canonical.comparison_type);
  
  let margin: number | null = null;
  let passes = false;

  if (baseValue !== null && candidateValue !== null) {
    const result = calculateMargin(baseValue, candidateValue, formula);
    margin = result.margin;
    passes = result.passes;
  }

  // Determine status
  const status = determineStatus(
    baseValue,
    candidateValue,
    margin,
    candidateParam?.confidence
  );

  // Use the unit from base (or candidate if base is missing)
  const displayUnit = baseUnit || candidateUnit;

  return {
    name: paramName,
    displayName: formatDisplayName(paramName),
    baseValue: baseValueStr,
    candidateValue: candidateValueStr,
    baseUnit,
    candidateUnit,
    rule,
    margin: formatMargin(margin, displayUnit),
    status,
    confidence: candidateParam?.confidence
  };
}

/**
 * Calculate section verdict based on parameter statuses
 * Section 8 logic from requirement doc
 */
function calculateSectionVerdict(parameters: TimingParameter[]): SectionVerdict {
  const statuses = parameters.map(p => p.status);

  // If any parameter is NOT OK, section fails
  if (statuses.includes('NOT_OK')) {
    return 'FAIL';
  }

  // If any parameter is UNVERIFIABLE (and no NOT OK), section is unverifiable
  if (statuses.includes('UNVERIFIABLE')) {
    return 'UNVERIFIABLE';
  }

  // If any parameter is FLAGGED (and no NOT OK or UNVERIFIABLE), needs review
  if (statuses.includes('FLAGGED')) {
    return 'NEEDS_REVIEW';
  }

  // All parameters are OK
  return 'PASS';
}

/**
 * Calculate overall verdict from section verdicts
 * Section 9 logic from requirement doc
 */
function calculateOverallVerdict(
  readVerdict: SectionVerdict,
  writeVerdict: SectionVerdict
): OverallVerdict {
  // If either section fails, overall is NOT COMPATIBLE
  if (readVerdict === 'FAIL' || writeVerdict === 'FAIL') {
    return 'NOT_COMPATIBLE';
  }

  // If either section is UNVERIFIABLE or NEEDS REVIEW, overall needs review
  if (
    readVerdict === 'UNVERIFIABLE' || 
    writeVerdict === 'UNVERIFIABLE' ||
    readVerdict === 'NEEDS_REVIEW' ||
    writeVerdict === 'NEEDS_REVIEW'
  ) {
    return 'NEEDS_REVIEW';
  }

  // Both sections pass
  return 'COMPATIBLE';
}

/**
 * Perform complete timing analysis between base and candidate ICs
 */
export function performTimingAnalysis(
  baseResult: ExtractionResult,
  candidateResult: ExtractionResult
): TimingAnalysisResult {
  // Compare READ parameters
  const readParameters: TimingParameter[] = [];
  for (const paramName of READ_PARAMETERS) {
    const comparison = compareParameter(paramName, baseResult, candidateResult);
    if (comparison) {
      readParameters.push(comparison);
    }
  }

  // Compare WRITE parameters
  const writeParameters: TimingParameter[] = [];
  for (const paramName of WRITE_PARAMETERS) {
    const comparison = compareParameter(paramName, baseResult, candidateResult);
    if (comparison) {
      writeParameters.push(comparison);
    }
  }

  // Calculate verdicts
  const readVerdict = calculateSectionVerdict(readParameters);
  const writeVerdict = calculateSectionVerdict(writeParameters);
  const overallVerdict = calculateOverallVerdict(readVerdict, writeVerdict);

  return {
    overallVerdict,
    baseComponent: `${baseResult.partNumber} (${baseResult.manufacturer})`,
    candidateComponent: `${candidateResult.partNumber} (${candidateResult.manufacturer})`,
    readSection: {
      sectionName: 'READ',
      verdict: readVerdict,
      parameters: readParameters
    },
    writeSection: {
      sectionName: 'WRITE',
      verdict: writeVerdict,
      parameters: writeParameters
    }
  };
}
