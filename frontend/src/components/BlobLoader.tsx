import React from 'react';
import './BlobLoader.css';

interface BlobLoaderProps {
  message?: string;
}

export const BlobLoader: React.FC<BlobLoaderProps> = ({ message = 'Processing...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="starburst-container">
        <div className="starburst">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="ray"
              style={{
                transform: `rotate(${i * 30}deg)`,
                animationDelay: `${i * 0.08}s`
              }}
            />
          ))}
        </div>
      </div>
      <p className="mt-6 text-gray-600 font-medium text-lg">{message}</p>
    </div>
  );
};
