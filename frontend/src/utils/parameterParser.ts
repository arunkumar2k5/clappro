import { Parameter } from '@/types';

interface UploadedParameter {
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

function convertSnakeCaseToTitleCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

function sanitizeValue(value: any): any {
  if (value === 'NaN' || (typeof value === 'number' && isNaN(value))) {
    return null;
  }
  return value;
}

export function parseParameterJSON(jsonContent: string): { 
  success: boolean; 
  parameters?: Parameter[]; 
  error?: string;
} {
  try {
    const parsed = JSON.parse(jsonContent);
    
    if (!parsed || typeof parsed !== 'object') {
      return {
        success: false,
        error: 'Invalid JSON: Root must be an object'
      };
    }

    let parametersArray: UploadedParameter[];

    if (Array.isArray(parsed)) {
      return {
        success: false,
        error: 'Invalid format: JSON must have a "parameters" array wrapper. Expected: {"parameters": [...]}'
      };
    }

    if (!parsed.parameters) {
      return {
        success: false,
        error: 'Missing "parameters" array in JSON. Expected format: {"parameters": [...]}'
      };
    }

    if (!Array.isArray(parsed.parameters)) {
      return {
        success: false,
        error: '"parameters" must be an array'
      };
    }

    parametersArray = parsed.parameters;

    if (parametersArray.length === 0) {
      return {
        success: false,
        error: 'Parameters array is empty'
      };
    }

    const transformedParameters: Parameter[] = parametersArray.map((param, index) => {
      if (!param.name) {
        throw new Error(`Parameter at index ${index} is missing required "name" field`);
      }

      const isAdvancedFormat = !!(param.symbols || param.aliases || param.description);
      
      let label = param.label;
      if (!label) {
        label = isAdvancedFormat 
          ? convertSnakeCaseToTitleCase(param.name)
          : param.name;
      }

      const transformed: Parameter = {
        name: param.name,
        label: label,
        unit: param.unit || '',
        Symbol: param.Symbol || (param.symbols && param.symbols.length > 0 ? param.symbols[0] : ''),
        value: sanitizeValue(param.value),
        confidence: param.confidence || 0
      };

      if (param.symbols && param.symbols.length > 0) {
        transformed.symbols = param.symbols;
      }

      if (param.aliases && param.aliases.length > 0) {
        transformed.aliases = param.aliases;
      }

      if (param.description) {
        transformed.description = param.description;
      }

      if (param.value_type) {
        transformed.value_type = param.value_type;
      }

      if (param.comparison_type) {
        transformed.comparison_type = param.comparison_type;
      }

      if (param.notes) {
        transformed.notes = param.notes;
      }

      return transformed;
    });

    return {
      success: true,
      parameters: transformedParameters
    };

  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: `Invalid JSON syntax: ${error.message}`
      };
    }
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error parsing JSON'
    };
  }
}
