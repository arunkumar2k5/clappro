import React, { useState, useEffect } from 'react';
import { ArrowLeft, Download, AlertCircle, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { ExtractionResult } from '@/types';
import { performTimingAnalysis } from '@/utils/timingComparison';
import { TimingAnalysisResult, TimingParameter, SectionVerdict, OverallVerdict } from '@/types';
import '../screens/SharedScreen.css';

interface Screen6TimingAnalysisProps {
  baseResult: ExtractionResult;
  candidateResult: ExtractionResult;
  onBack: () => void;
}

export const Screen6TimingAnalysis: React.FC<Screen6TimingAnalysisProps> = ({
  baseResult,
  candidateResult,
  onBack,
}) => {
  const [analysisResult, setAnalysisResult] = useState<TimingAnalysisResult | null>(null);
  const [editableParams, setEditableParams] = useState<{
    read: TimingParameter[];
    write: TimingParameter[];
  }>({ read: [], write: [] });

  useEffect(() => {
    const result = performTimingAnalysis(baseResult, candidateResult);
    setAnalysisResult(result);
    setEditableParams({
      read: result.readSection.parameters,
      write: result.writeSection.parameters,
    });
  }, [baseResult, candidateResult]);

  const handleCellEdit = (
    section: 'read' | 'write',
    paramIndex: number,
    field: 'baseValue' | 'candidateValue',
    newValue: string
  ) => {
    setEditableParams(prev => {
      const updated = { ...prev };
      updated[section][paramIndex][field] = newValue;
      return updated;
    });
  };

  const handleExportToExcel = () => {
    if (!analysisResult) return;

    const workbook = XLSX.utils.book_new();

    // Sheet 1: Overall Summary
    const summaryData = [
      ['AC Timing Analysis Report'],
      [''],
      ['Base Component:', analysisResult.baseComponent],
      ['Candidate Component:', analysisResult.candidateComponent],
      [''],
      ['Overall Verdict:', analysisResult.overallVerdict],
      ['READ Cycle Verdict:', analysisResult.readSection.verdict],
      ['WRITE Cycle Verdict:', analysisResult.writeSection.verdict],
      [''],
      ['Legend:'],
      ['OK', 'Margin ≥ 0, passes requirement'],
      ['NOT OK', 'Margin < 0, fails requirement'],
      ['FLAGGED', 'Confidence ≤ 70%, verify manually'],
      ['UNVERIFIABLE', 'Missing data or unit mismatch'],
    ];
    const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
    XLSX.utils.book_append_sheet(workbook, summarySheet, 'Summary');

    // Sheet 2: READ Cycle
    const readHeaders = ['Parameter', 'Base Value', 'Candidate Value', 'Rule', 'Margin', 'Status', 'Confidence'];
    const readData = editableParams.read.map(param => [
      param.displayName,
      param.baseValue,
      param.candidateValue,
      param.rule,
      param.margin,
      param.status,
      param.confidence !== undefined ? `${(param.confidence * 100).toFixed(0)}%` : 'N/A'
    ]);
    const readSheet = XLSX.utils.aoa_to_sheet([
      ['READ CYCLE ANALYSIS'],
      ['Verdict:', analysisResult.readSection.verdict],
      [],
      readHeaders,
      ...readData
    ]);
    XLSX.utils.book_append_sheet(workbook, readSheet, 'READ Cycle');

    // Sheet 3: WRITE Cycle
    const writeHeaders = ['Parameter', 'Base Value', 'Candidate Value', 'Rule', 'Margin', 'Status', 'Confidence'];
    const writeData = editableParams.write.map(param => [
      param.displayName,
      param.baseValue,
      param.candidateValue,
      param.rule,
      param.margin,
      param.status,
      param.confidence !== undefined ? `${(param.confidence * 100).toFixed(0)}%` : 'N/A'
    ]);
    const writeSheet = XLSX.utils.aoa_to_sheet([
      ['WRITE CYCLE ANALYSIS'],
      ['Verdict:', analysisResult.writeSection.verdict],
      [],
      writeHeaders,
      ...writeData
    ]);
    XLSX.utils.book_append_sheet(workbook, writeSheet, 'WRITE Cycle');

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);
    const filename = `Timing_Analysis_${timestamp}.xlsx`;
    XLSX.writeFile(workbook, filename);
  };

  const getVerdictColor = (verdict: SectionVerdict | OverallVerdict): string => {
    switch (verdict) {
      case 'PASS':
      case 'COMPATIBLE':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'FAIL':
      case 'NOT_COMPATIBLE':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'UNVERIFIABLE':
      case 'NEEDS_REVIEW':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getVerdictIcon = (verdict: SectionVerdict | OverallVerdict) => {
    switch (verdict) {
      case 'PASS':
      case 'COMPATIBLE':
        return <CheckCircle className="inline-block mr-2" size={20} />;
      case 'FAIL':
      case 'NOT_COMPATIBLE':
        return <XCircle className="inline-block mr-2" size={20} />;
      case 'UNVERIFIABLE':
      case 'NEEDS_REVIEW':
        return <AlertTriangle className="inline-block mr-2" size={20} />;
      default:
        return <AlertCircle className="inline-block mr-2" size={20} />;
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'OK':
        return 'bg-green-100 text-green-800';
      case 'NOT_OK':
        return 'bg-red-100 text-red-800';
      case 'FLAGGED':
        return 'bg-yellow-100 text-yellow-800';
      case 'UNVERIFIABLE':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderParameterTable = (
    sectionName: 'READ' | 'WRITE',
    parameters: TimingParameter[],
    verdict: SectionVerdict
  ) => {
    const section = sectionName.toLowerCase() as 'read' | 'write';

    return (
      <div className="bg-white rounded-lg shadow mb-6">
        <div className={`px-6 py-4 border-b-2 ${getVerdictColor(verdict)}`}>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              {getVerdictIcon(verdict)}
              {sectionName} CYCLE
            </h3>
            <span className="px-4 py-2 rounded-lg border-2 font-semibold">
              Verdict: {verdict}
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Parameter</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Base Value</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Candidate Value</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Rule</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Margin</th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {parameters.map((param, idx) => (
                <tr key={param.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {param.displayName}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="text"
                      value={param.baseValue}
                      onChange={(e) => handleCellEdit(section, idx, 'baseValue', e.target.value)}
                      className="w-full px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="N/A"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <input
                      type="text"
                      value={param.candidateValue}
                      onChange={(e) => handleCellEdit(section, idx, 'candidateValue', e.target.value)}
                      className="w-full px-2 py-1 text-center border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="N/A"
                    />
                  </td>
                  <td className="px-4 py-3 text-center text-sm text-gray-700">
                    {param.rule}
                  </td>
                  <td className="px-4 py-3 text-center text-sm font-medium text-gray-900">
                    {param.margin}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(param.status)}`}>
                      {param.status}
                    </span>
                    {param.confidence !== undefined && param.confidence <= 0.70 && (
                      <div className="text-xs text-yellow-600 mt-1">
                        Conf: {(param.confidence * 100).toFixed(0)}%
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!analysisResult) {
    return (
      <div className="screen-container">
        <div className="screen-background"></div>
        <div className="screen-card">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-500">Loading timing analysis...</div>
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
          {/* Header */}
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">AC Timing Analysis</h2>
            <p className="text-gray-300">
              Comparing {analysisResult.baseComponent} vs {analysisResult.candidateComponent}
            </p>
          </div>

          {/* Overall Verdict Banner */}
          <div className={`rounded-lg border-2 p-6 ${getVerdictColor(analysisResult.overallVerdict)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getVerdictIcon(analysisResult.overallVerdict)}
                <div>
                  <h3 className="text-2xl font-bold">Overall Compatibility</h3>
                  <p className="text-sm mt-1">
                    {analysisResult.overallVerdict === 'COMPATIBLE' && 
                      'The candidate IC meets all timing requirements and is compatible with the base IC.'}
                    {analysisResult.overallVerdict === 'NOT_COMPATIBLE' && 
                      'The candidate IC fails one or more timing requirements and is NOT compatible.'}
                    {analysisResult.overallVerdict === 'NEEDS_REVIEW' && 
                      'Some parameters could not be verified or have low confidence. Manual review required.'}
                  </p>
                </div>
              </div>
              <div className="text-4xl font-bold">
                {analysisResult.overallVerdict}
              </div>
            </div>
          </div>

          {/* READ Cycle Section */}
          {renderParameterTable(
            'READ',
            editableParams.read,
            analysisResult.readSection.verdict
          )}

          {/* WRITE Cycle Section */}
          {renderParameterTable(
            'WRITE',
            editableParams.write,
            analysisResult.writeSection.verdict
          )}

          {/* Legend */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Status Legend</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">OK</span>
                <span className="text-gray-700">Margin ≥ 0, passes requirement</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">NOT OK</span>
                <span className="text-gray-700">Margin &lt; 0, fails requirement</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">FLAGGED</span>
                <span className="text-gray-700">Confidence ≤ 70%, verify manually</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">UNVERIFIABLE</span>
                <span className="text-gray-700">Missing data or unit mismatch</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
            >
              <ArrowLeft size={20} />
              Back to Results
            </button>
            <button
              onClick={handleExportToExcel}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
            >
              <Download size={20} />
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
