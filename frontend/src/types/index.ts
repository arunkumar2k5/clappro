export interface Parameter {
  name: string;
  label: string;
  unit: string;
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
