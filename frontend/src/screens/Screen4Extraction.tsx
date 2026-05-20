import React, { useState } from 'react';
import { Brain, Server } from 'lucide-react';
import { ExtractionMethod } from '@/types';
import '../screens/SharedScreen.css';

interface Screen4ExtractionProps {
  onMethodSelected: (method: ExtractionMethod) => void;
}

export const Screen4Extraction: React.FC<Screen4ExtractionProps> = ({ onMethodSelected }) => {
  const [selectedMethod, setSelectedMethod] = useState<ExtractionMethod>('ai');

  const handleMethodChange = (method: ExtractionMethod) => {
    setSelectedMethod(method);
    onMethodSelected(method);
  };

  return (
    <div className="screen-container">
      <div className="screen-background"></div>
      <div className="screen-card">
        <div className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Extraction Method</h2>
            <p className="text-gray-300">Choose how to extract parameters from datasheets</p>
          </div>

      <div className="grid grid-cols-2 gap-6">
        <button
          onClick={() => handleMethodChange('ai')}
          className={`p-8 border-2 rounded-lg transition-all ${
            selectedMethod === 'ai'
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <Brain className={`w-16 h-16 mb-4 ${selectedMethod === 'ai' ? 'text-blue-600' : 'text-gray-600'}`} />
            <h3 className="text-xl font-semibold mb-2">AI Mode</h3>
            <p className="text-sm text-gray-600 mb-4">
              Uses Claude Sonnet AI for intelligent parameter extraction
            </p>
            <div className="space-y-1 text-xs text-left w-full">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>PDF Upload → Anthropic API (native PDF handling)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>URL → OpenRouter API (Claude Sonnet)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>High accuracy with confidence scores</span>
              </div>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleMethodChange('xtract')}
          className={`p-8 border-2 rounded-lg transition-all ${
            selectedMethod === 'xtract'
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
          }`}
        >
          <div className="flex flex-col items-center text-center">
            <Server className={`w-16 h-16 mb-4 ${selectedMethod === 'xtract' ? 'text-blue-600' : 'text-gray-600'}`} />
            <h3 className="text-xl font-semibold mb-2">3rd Party Tool</h3>
            <p className="text-sm text-gray-600 mb-4">
              Uses Xtract AI Docker service for parameter extraction
            </p>
            <div className="space-y-1 text-xs text-left w-full">
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Specialized extraction engine</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600">✓</span>
                <span>Supports both PDF and URL inputs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-blue-600">ℹ</span>
                <span>Requires Xtract AI Docker service running</span>
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Clicking "Next" will start the extraction process. This may take several seconds per component.
        </p>
      </div>
        </div>
      </div>
    </div>
  );
};
