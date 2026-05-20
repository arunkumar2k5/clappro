import React, { useState } from 'react';
import { Search, Upload, FileText, Loader2 } from 'lucide-react';
import axios from 'axios';
import { ComponentData } from '@/types';

interface Screen3ComponentsProps {
  onComponentsConfigured: (components: ComponentData[]) => void;
}

export const Screen3Components: React.FC<Screen3ComponentsProps> = ({ onComponentsConfigured }) => {
  const [componentCount, setComponentCount] = useState<number>(2);
  const [components, setComponents] = useState<ComponentData[]>([
    { partNumber: '', manufacturer: '', datasheetUrl: '' },
    { partNumber: '', manufacturer: '', datasheetUrl: '' },
  ]);
  const [searchingIndex, setSearchingIndex] = useState<number | null>(null);

  const handleCountChange = (count: number) => {
    const newCount = Math.max(2, Math.min(10, count));
    setComponentCount(newCount);
    
    const newComponents = Array.from({ length: newCount }, (_, i) => 
      components[i] || { partNumber: '', manufacturer: '', datasheetUrl: '' }
    );
    setComponents(newComponents);
    onComponentsConfigured(newComponents);
  };

  const updateComponent = (index: number, field: keyof ComponentData, value: any) => {
    const updated = [...components];
    updated[index] = { ...updated[index], [field]: value };
    setComponents(updated);
    onComponentsConfigured(updated);
  };

  const searchDatasheet = async (index: number) => {
    const component = components[index];
    if (!component.partNumber || !component.manufacturer) {
      alert('Please enter both part number and manufacturer');
      return;
    }

    setSearchingIndex(index);
    try {
      const response = await axios.post('/api/search-datasheet', {
        part_number: component.partNumber,
        manufacturer: component.manufacturer,
      });
      updateComponent(index, 'datasheetUrl', response.data.url);
    } catch (error) {
      alert('Datasheet not found');
    } finally {
      setSearchingIndex(null);
    }
  };

  const handleFileUpload = (index: number, file: File) => {
    updateComponent(index, 'datasheetFile', file);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Component Details</h2>
        <p className="text-gray-600">Enter component information and datasheets</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Number of Components to Compare
        </label>
        <input
          type="number"
          min="2"
          max="10"
          value={componentCount}
          onChange={(e) => handleCountChange(parseInt(e.target.value) || 2)}
          className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-4">
        {components.map((component, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">
                Component {index + 1}
                {index === 0 && (
                  <span className="ml-2 text-sm font-normal text-blue-600 bg-blue-100 px-2 py-1 rounded">
                    BASE COMPONENT
                  </span>
                )}
              </h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Part Number *
                </label>
                <input
                  type="text"
                  value={component.partNumber}
                  onChange={(e) => updateComponent(index, 'partNumber', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., AT24C256"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manufacturer *
                </label>
                <input
                  type="text"
                  value={component.manufacturer}
                  onChange={(e) => updateComponent(index, 'manufacturer', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Microchip"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Datasheet URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={component.datasheetUrl || ''}
                  onChange={(e) => updateComponent(index, 'datasheetUrl', e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://..."
                />
                <button
                  onClick={() => searchDatasheet(index)}
                  disabled={searchingIndex === index}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300"
                >
                  {searchingIndex === index ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Search size={20} />
                      Search
                    </>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Or Upload PDF Datasheet
              </label>
              <label className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50">
                {component.datasheetFile ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <FileText size={20} />
                    <span>{component.datasheetFile.name}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Upload size={20} />
                    <span>Click to upload PDF</span>
                  </div>
                )}
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(index, file);
                  }}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> The first component is the base component against which all others are compared.
        </p>
      </div>
    </div>
  );
};
