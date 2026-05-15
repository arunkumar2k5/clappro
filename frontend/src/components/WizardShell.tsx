import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface WizardShellProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack: () => void;
  showBack?: boolean;
  showNext?: boolean;
  nextDisabled?: boolean;
  nextLabel?: string;
}

export const WizardShell: React.FC<WizardShellProps> = ({
  children,
  currentStep,
  totalSteps,
  onNext,
  onBack,
  showBack = true,
  showNext = true,
  nextDisabled = false,
  nextLabel = 'Next',
}) => {
  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-medium text-gray-500">
                Step {currentStep} of {totalSteps}
              </h2>
              <div className="flex gap-1">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-8 rounded-full transition-colors ${
                      i + 1 === currentStep
                        ? 'bg-blue-600'
                        : i + 1 < currentStep
                        ? 'bg-blue-300'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
          {children}
        </div>
      </div>

      <div className="border-t border-gray-200 bg-white px-8 py-4 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {showBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft size={20} />
              Back
            </button>
          ) : (
            <div />
          )}

          {showNext && (
            <button
              onClick={onNext}
              disabled={nextDisabled}
              className="flex items-center gap-2 px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {nextLabel}
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
