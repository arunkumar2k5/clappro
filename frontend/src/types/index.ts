export interface Parameter {
  name: string;
  label?: string;
  unit?: string;
  Symbol?: string;
  symbols?: string[];
  aliases?: string[];
  description?: string;
  value_type?: string;
  comparison_type?: string;
  notes?: string;
  confidence?: number;
  value?: any;
}

export interface ComponentData {
  partNumber: string;
  manufacturer: string;
  datasheetUrl?: string;
  datasheetFile?: File;
}

export interface ExtractionResult {
  partNumber: string;
  manufacturer: string;
  parameters: Record<string, ParameterValue>;
  overallConfidence: number;
  datasheetUrl?: string;
  datasheetFile?: File;
}

export interface ParameterValue {
  value: string;
  confidence: number;
}

export interface ComparisonCell {
  value: string;
  status: 'match' | 'no_match' | 'not_available';
}

export interface ComponentComparison {
  partNumber: string;
  manufacturer: string;
  parameters: Record<string, ComparisonCell>;
  matchCount: number;
  totalParameters: number;
  matchPercentage: number;
}

export interface ComparisonResponse {
  baseComponent: string;
  comparisons: ComponentComparison[];
  justifications: Record<string, string>;
  recommendation: string | null;
  noExactMatch: boolean;
  bestPartialMatch: string | null;
}

export type ExtractionMethod = 'ai' | 'xtract';

// Timing Analysis Types
export type TimingStatus = 'OK' | 'NOT_OK' | 'UNVERIFIABLE' | 'FLAGGED';
export type SectionVerdict = 'PASS' | 'FAIL' | 'UNVERIFIABLE' | 'NEEDS_REVIEW';
export type OverallVerdict = 'COMPATIBLE' | 'NOT_COMPATIBLE' | 'NEEDS_REVIEW';

export interface TimingParameter {
  name: string;
  displayName: string;
  baseValue: string;
  candidateValue: string;
  baseUnit: string;
  candidateUnit: string;
  rule: string;
  margin: string;
  status: TimingStatus;
  confidence?: number;
}

export interface TimingSectionResult {
  sectionName: 'READ' | 'WRITE';
  verdict: SectionVerdict;
  parameters: TimingParameter[];
}

export interface TimingAnalysisResult {
  overallVerdict: OverallVerdict;
  baseComponent: string;
  candidateComponent: string;
  readSection: TimingSectionResult;
  writeSection: TimingSectionResult;
}
