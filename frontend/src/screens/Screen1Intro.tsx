import React from 'react';
import { Package } from 'lucide-react';
import './Screen1Intro.css';

const APP_VERSION = '0.1.0';

export const Screen1Intro: React.FC = () => {
  return (
    <div className="screen1-container">
      {/* Blurred background */}
      <div className="screen1-background"></div>
      
      {/* Main content card with glowing border */}
      <div className="screen1-card">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Package className="w-16 h-16 text-blue-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-4">
            CLAP PRO
          </h1>
          
          <p className="text-xl text-gray-200 mb-2 max-w-2xl mx-auto">
            Component Library Analysis Platform Pro - Compare passive electronic component specifications and identify the best replacement component.
          </p>
          
          <div className="mt-8 inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-400/30">
            <span className="font-medium">Version {APP_VERSION}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
