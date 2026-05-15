import React from 'react';
import { Package } from 'lucide-react';

const APP_VERSION = '0.1.0';

export const Screen1Intro: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="flex items-center justify-center mb-6">
          <Package className="w-16 h-16 text-blue-600" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          CLAP PRO
        </h1>
        
        <p className="text-xl text-gray-600 mb-2 max-w-2xl">
          Component Library Analysis Platform Pro - Compare passive electronic component specifications and identify the best replacement component.
        </p>
        
        <div className="mt-8 inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
          <span className="font-medium">Version {APP_VERSION}</span>
        </div>
      </div>
    </div>
  );
};
