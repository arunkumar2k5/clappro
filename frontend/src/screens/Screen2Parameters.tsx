import React, { useState, useEffect } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import componentTypes from '@/data/component_types.json';
import parametersData from '@/data/parameters.json';
import { Parameter } from '@/types';
import { parseParameterJSON } from '@/utils/parameterParser';
import '../screens/SharedScreen.css';

interface Screen2ParametersProps {
  onParametersSelected: (params: Parameter[]) => void;
  onComponentTypeSelected: (type: string) => void;
}

export const Screen2Parameters: React.FC<Screen2ParametersProps> = ({
  onParametersSelected,
  onComponentTypeSelected,
}) => {
  const [selectedType, setSelectedType] = useState<string>('');
  const [parameterMode, setParameterMode] = useState<'builtin' | 'upload' | null>(null);
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [customParam, setCustomParam] = useState({ name: '', label: '', unit: '' });

  useEffect(() => {
    if (selectedType && parameterMode === 'builtin') {
      const params = (parametersData as Record<string, Parameter[]>)[selectedType] || [];
      setParameters(params);
      onParametersSelected(params);
    }
  }, [selectedType, parameterMode]);

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    onComponentTypeSelected(type);
    setParameterMode(null);
    setParameters([]);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const jsonContent = event.target?.result as string;
        const result = parseParameterJSON(jsonContent);
        
        if (result.success && result.parameters) {
          setParameters(result.parameters);
          onParametersSelected(result.parameters);
        } else {
          alert(`Failed to parse JSON file:\n\n${result.error}\n\nPlease ensure your JSON follows the format specified in PARAMETER_JSON_FORMAT.md`);
          e.target.value = '';
        }
      };
      reader.readAsText(file);
    }
  };

  const addCustomParameter = () => {
    if (customParam.name && customParam.label) {
      const newParams = [...parameters, customParam];
      setParameters(newParams);
      onParametersSelected(newParams);
      setCustomParam({ name: '', label: '', unit: '' });
    }
  };

  const removeParameter = (index: number) => {
    const newParams = parameters.filter((_, i) => i !== index);
    setParameters(newParams);
    onParametersSelected(newParams);
  };

  return (
    <div className="screen-container">
      <div className="screen-background"></div>
      <div className="screen-card">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Component Type & Parameters</h2>
            <p className="text-gray-300">Select the component type and configure parameters for extraction</p>
          </div>

      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Component Type
        </label>
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a component type...</option>
          {componentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {selectedType && !parameterMode && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Choose Parameter Source</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setParameterMode('builtin')}
              className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
            >
              <h4 className="font-semibold mb-2">Built-in Parameters</h4>
              <p className="text-sm text-gray-600">Use predefined parameters for {selectedType}</p>
            </button>
            <label className="p-6 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <h4 className="font-semibold mb-2">Upload Custom Parameters</h4>
              <p className="text-sm text-gray-600">Upload a JSON file with custom parameters</p>
              <input
                type="file"
                accept=".json"
                onChange={(e) => {
                  setParameterMode('upload');
                  handleFileUpload(e);
                }}
                className="hidden"
              />
            </label>
          </div>
        </div>
      )}

      {parameterMode && parameters.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Parameters</h3>
          <div className="max-h-96 overflow-y-auto space-y-2">
            {parameters.map((param, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div>
                    <span className="font-medium">{param.label || param.name}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({param.name}){param.unit && ` - ${param.unit}`}
                    </span>
                  </div>
                  {param.Symbol && (
                    <div className="text-xs text-gray-600 mt-1">
                      Symbol: {param.Symbol}
                    </div>
                  )}
                  {param.symbols && param.symbols.length > 1 && (
                    <div className="text-xs text-gray-600 mt-1">
                      Symbols: {param.symbols.join(', ')}
                    </div>
                  )}
                  {param.aliases && param.aliases.length > 0 && (
                    <div className="text-xs text-gray-600 mt-1">
                      Aliases: {param.aliases.join(', ')}
                    </div>
                  )}
                  {param.description && (
                    <div className="text-xs text-gray-500 mt-1 italic">
                      {param.description}
                    </div>
                  )}
                </div>
                {parameterMode === 'builtin' && (
                  <button
                    onClick={() => removeParameter(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {parameterMode === 'builtin' && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="font-medium mb-3">Add Custom Parameter</h4>
              <div className="grid grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Name (e.g., temp_range)"
                  value={customParam.name}
                  onChange={(e) => setCustomParam({ ...customParam, name: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Label (e.g., Temperature Range)"
                  value={customParam.label}
                  onChange={(e) => setCustomParam({ ...customParam, label: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Unit (e.g., °C)"
                  value={customParam.unit}
                  onChange={(e) => setCustomParam({ ...customParam, unit: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                />
                <button
                  onClick={addCustomParameter}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <Plus size={20} />
                  Add
                </button>
              </div>
            </div>
          )}
        </div>
      )}
        </div>
      </div>
    </div>
  );
};
