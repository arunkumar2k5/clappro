import React, { useState } from 'react';
import { Check, X, Download } from 'lucide-react';
import axios from 'axios';
import { ExtractionResult, ComparisonResponse, Parameter } from '@/types';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface Screen5ResultsProps {
  extractionResults: ExtractionResult[];
  parameters: Parameter[];
  onExtractionEdit: (results: ExtractionResult[]) => void;
}

export const Screen5Results: React.FC<Screen5ResultsProps> = ({
  extractionResults,
  parameters,
  onExtractionEdit,
}) => {
  const [phase, setPhase] = useState<'review' | 'comparison'>('review');
  const [editableResults, setEditableResults] = useState(extractionResults);
  const [comparisonData, setComparisonData] = useState<ComparisonResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCellEdit = (componentIndex: number, paramName: string, newValue: string) => {
    const updated = [...editableResults];
    updated[componentIndex].parameters[paramName].value = newValue;
    setEditableResults(updated);
    onExtractionEdit(updated);
  };

  const handleCompare = async () => {
    setLoading(true);
    try {
      const baseComponent: Record<string, string> = {
        part_number: editableResults[0].partNumber,
        manufacturer: editableResults[0].manufacturer,
      };
      parameters.forEach(param => {
        baseComponent[param.name] = editableResults[0].parameters[param.name]?.value || 'N/A';
      });

      const components = editableResults.slice(1).map(result => {
        const comp: Record<string, string> = {
          part_number: result.partNumber,
          manufacturer: result.manufacturer,
        };
        parameters.forEach(param => {
          comp[param.name] = result.parameters[param.name]?.value || 'N/A';
        });
        return comp;
      });

      const response = await axios.post('/api/compare', {
        base_component: baseComponent,
        components: components,
        parameter_names: parameters.map(p => p.name),
      });

      setComparisonData(response.data);
      setPhase('comparison');
    } catch (error) {
      alert('Comparison failed');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!comparisonData) return;

    setLoading(true);
    try {
      const confidenceScores: Record<string, number> = {
        base: editableResults[0].overallConfidence,
      };
      editableResults.slice(1).forEach(result => {
        confidenceScores[result.partNumber] = result.overallConfidence;
      });

      const response = await axios.post('/api/export', {
        parameter_names: parameters.map(p => p.name),
        base_component: {
          part_number: editableResults[0].partNumber,
          manufacturer: editableResults[0].manufacturer,
          ...Object.fromEntries(
            parameters.map(p => [p.name, editableResults[0].parameters[p.name]?.value || 'N/A'])
          ),
        },
        comparisons: comparisonData.comparisons,
        justifications: comparisonData.justifications,
        recommendation: comparisonData.recommendation || comparisonData.bestPartialMatch || 'No match found',
        confidence_scores: confidenceScores,
      }, {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'component_comparison.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      alert('Export failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message={phase === 'review' ? 'Running comparison...' : 'Generating Excel file...'} />;
  }

  if (phase === 'review') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Extraction Results - Review & Edit</h2>
          <p className="text-gray-600">Review and correct the extracted parameter values before comparison</p>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Parameter</th>
                {editableResults.map((result, idx) => (
                  <th key={idx} className={`px-4 py-3 text-center text-sm font-semibold ${idx === 0 ? 'bg-blue-100 text-blue-900' : 'text-gray-700'}`}>
                    <div>{result.partNumber}</div>
                    <div className="text-xs font-normal mt-1">
                      Confidence: {(result.overallConfidence * 100).toFixed(1)}%
                    </div>
                    {idx === 0 && (
                      <div className="text-xs font-normal text-blue-600 mt-1">BASE</div>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, paramIdx) => (
                <tr key={param.name} className={paramIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {param.label}
                    {param.unit && <span className="text-sm text-gray-500 ml-1">({param.unit})</span>}
                  </td>
                  {editableResults.map((result, compIdx) => (
                    <td key={compIdx} className={compIdx === 0 ? 'bg-blue-50' : ''}>
                      <input
                        type="text"
                        value={result.parameters[param.name]?.value || 'N/A'}
                        onChange={(e) => handleCellEdit(compIdx, param.name, e.target.value)}
                        className="w-full px-3 py-2 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleCompare}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Lock & Compare
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Comparison Results</h2>
          <p className="text-gray-600">Component parameter comparison and recommendation</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
        >
          <Download size={20} />
          Export to Excel
        </button>
      </div>

      {comparisonData && (
        <>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Parameter</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold bg-blue-100 text-blue-900">
                    {editableResults[0].partNumber}
                    <div className="text-xs font-normal text-blue-600 mt-1">BASE</div>
                  </th>
                  {comparisonData.comparisons.map((comp, idx) => (
                    <th key={idx} className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                      {comp.partNumber}
                      <div className="text-xs font-normal mt-1">
                        Match: {comp.matchCount}/{comp.totalParameters} ({comp.matchPercentage.toFixed(1)}%)
                      </div>
                    </th>
                  ))}
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Justification</th>
                </tr>
              </thead>
              <tbody>
                {parameters.map((param, paramIdx) => (
                  <tr key={param.name} className={paramIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {param.label}
                      {param.unit && <span className="text-sm text-gray-500 ml-1">({param.unit})</span>}
                    </td>
                    <td className="px-4 py-3 text-center bg-blue-50 font-medium">
                      {editableResults[0].parameters[param.name]?.value || 'N/A'}
                    </td>
                    {comparisonData.comparisons.map((comp, compIdx) => {
                      const cell = comp.parameters[param.name];
                      const isMatch = cell?.status === 'match';
                      const isNoMatch = cell?.status === 'no_match';
                      
                      return (
                        <td
                          key={compIdx}
                          className={`px-4 py-3 text-center ${
                            isMatch ? 'bg-green-100' : isNoMatch ? 'bg-red-100' : ''
                          }`}
                        >
                          <div className="flex items-center justify-center gap-2">
                            {isMatch && <Check className="text-green-600" size={16} />}
                            {isNoMatch && <X className="text-red-600" size={16} />}
                            <span>{cell?.value || 'N/A'}</span>
                          </div>
                        </td>
                      );
                    })}
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {comparisonData.justifications[param.name]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3">Recommendation</h3>
            {comparisonData.noExactMatch ? (
              <div>
                <p className="text-red-700 font-semibold mb-2">No exact match found</p>
                {comparisonData.bestPartialMatch && (
                  <p className="text-gray-700">{comparisonData.bestPartialMatch}</p>
                )}
              </div>
            ) : (
              <p className="text-green-700 font-semibold text-lg">{comparisonData.recommendation}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
