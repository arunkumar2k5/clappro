import React, { useState } from 'react';
import axios from 'axios';
import { WizardShell } from './components/WizardShell';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Screen1Intro } from './screens/Screen1Intro';
import { Screen2Parameters } from './screens/Screen2Parameters';
import { Screen3Components } from './screens/Screen3Components';
import { Screen4Extraction } from './screens/Screen4Extraction';
import { Screen5Results } from './screens/Screen5Results';
import { useWizard } from './hooks/useWizard';
import { Parameter, ComponentData, ExtractionMethod, ExtractionResult } from './types';

function App() {
  const { currentStep, goNext, goBack, isFirstStep } = useWizard(5);
  
  const [componentType, setComponentType] = useState<string>('');
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [components, setComponents] = useState<ComponentData[]>([]);
  const [extractionMethod, setExtractionMethod] = useState<ExtractionMethod>('ai');
  const [extractionResults, setExtractionResults] = useState<ExtractionResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleNextClick = async () => {
    if (currentStep === 4) {
      await performExtraction();
    } else {
      goNext();
    }
  };

  const performExtraction = async () => {
    setLoading(true);
    try {
      const results: ExtractionResult[] = [];

      for (const component of components) {
        const formData = new FormData();
        formData.append('parameters', JSON.stringify(parameters));
        formData.append('part_number', component.partNumber);
        formData.append('manufacturer', component.manufacturer);

        if (component.datasheetFile) {
          formData.append('datasheet_file', component.datasheetFile);
        } else if (component.datasheetUrl) {
          formData.append('datasheet_url', component.datasheetUrl);
        }

        const endpoint = extractionMethod === 'ai' ? '/api/extract/ai' : '/api/extract/xtract';
        const response = await axios.post(endpoint, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        results.push({
          partNumber: response.data.part_number,
          manufacturer: response.data.manufacturer,
          parameters: response.data.parameters,
          overallConfidence: response.data.overall_confidence,
        });
      }

      setExtractionResults(results);
      goNext();
    } catch (error) {
      alert('Extraction failed. Please check your API keys and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return true;
      case 2:
        return componentType && parameters.length > 0;
      case 3:
        return components.length >= 2 && components.every(c => 
          c.partNumber && c.manufacturer && (c.datasheetUrl || c.datasheetFile)
        );
      case 4:
        return true;
      case 5:
        return false;
      default:
        return false;
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingSpinner message="Extracting parameters from datasheets..." />
      </div>
    );
  }

  return (
    <WizardShell
      currentStep={currentStep}
      totalSteps={5}
      onNext={handleNextClick}
      onBack={goBack}
      showBack={!isFirstStep}
      showNext={currentStep !== 5}
      nextDisabled={!canProceed()}
      nextLabel={currentStep === 4 ? 'Extract Parameters' : 'Next'}
    >
      {currentStep === 1 && <Screen1Intro />}
      
      {currentStep === 2 && (
        <Screen2Parameters
          onParametersSelected={setParameters}
          onComponentTypeSelected={setComponentType}
        />
      )}
      
      {currentStep === 3 && (
        <Screen3Components onComponentsConfigured={setComponents} />
      )}
      
      {currentStep === 4 && (
        <Screen4Extraction onMethodSelected={setExtractionMethod} />
      )}
      
      {currentStep === 5 && (
        <Screen5Results
          extractionResults={extractionResults}
          parameters={parameters}
          onExtractionEdit={setExtractionResults}
        />
      )}
    </WizardShell>
  );
}

export default App;
