import React, { useState } from 'react';
import { Check, X, Download, FileText } from 'lucide-react';
import axios from 'axios';
import { ExtractionResult, ComparisonResponse, Parameter } from '@/types';
import { BlobLoader } from '@/components/BlobLoader';
import '../screens/SharedScreen.css';

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
    
    // Create parameter object if it doesn't exist
    if (!updated[componentIndex].parameters[paramName]) {
      updated[componentIndex].parameters[paramName] = {
        value: newValue,
        confidence: 0
      };
    } else {
      updated[componentIndex].parameters[paramName].value = newValue;
    }
    
    setEditableResults(updated);
    onExtractionEdit(updated);
  };

  const handlePdfClick = (result: ExtractionResult) => {
    if (result.datasheetFile) {
      // Create blob URL for uploaded file
      const blobUrl = URL.createObjectURL(result.datasheetFile);
      window.open(blobUrl, '_blank');
    } else if (result.datasheetUrl) {
      // Open external URL
      window.open(result.datasheetUrl, '_blank');
    }
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

      console.log('Comparison response:', response.data);
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
    return <BlobLoader message={phase === 'review' ? 'Running comparison...' : 'Generating Excel file...'} />;
  }

  if (phase === 'review') {
    return (
      <div className="screen-container">
        <div className="screen-background"></div>
        <div className="screen-card">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Extraction Results - Review & Edit</h2>
              <p className="text-gray-300">Review and correct the extracted parameter values before comparison</p>
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
                  {editableResults.map((result, compIdx) => {
                    const currentValue = result.parameters[param.name]?.value || '';
                    const displayValue = currentValue === 'N/A' || !currentValue ? '' : currentValue;
                    
                    return (
                      <td key={compIdx} className={compIdx === 0 ? 'bg-blue-50' : ''}>
                        <input
                          type="text"
                          value={displayValue}
                          onChange={(e) => handleCellEdit(compIdx, param.name, e.target.value)}
                          placeholder="N/A"
                          className="w-full px-3 py-2 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
              
              {/* Datasheet Row */}
              <tr className="bg-gradient-to-r from-green-50 to-emerald-50 border-t-2 border-green-200">
                <td className="px-4 py-3 font-bold text-gray-900">
                  Datasheet
                </td>
                {editableResults.map((result, compIdx) => (
                  <td key={compIdx} className={`text-center ${compIdx === 0 ? 'bg-blue-50/50' : ''}`}>
                    <button
                      onClick={() => handlePdfClick(result)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                      title={`View ${result.partNumber} datasheet`}
                    >
                      <FileText size={18} />
                      View PDF
                    </button>
                  </td>
                ))}
              </tr>
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
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container">
      <div className="screen-background"></div>
      <div className="screen-card">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Comparison Results</h2>
              <p className="text-gray-300">Parameter comparison across all components</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              <Download size={20} />
              Export to Excel
            </button>
          </div>

      {!comparisonData && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800">No comparison data available. Please try again.</p>
        </div>
      )}

      {comparisonData && !comparisonData.comparisons && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Comparison data structure is invalid. Check console for details.</p>
          <pre className="mt-2 text-xs">{JSON.stringify(comparisonData, null, 2)}</pre>
        </div>
      )}

      {comparisonData && comparisonData.comparisons && (
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
      </div>
    </div>
  );
};
