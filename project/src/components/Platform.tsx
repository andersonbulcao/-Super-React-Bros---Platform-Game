import React from 'react';
import { Platform as PlatformType } from '../types';

const Platform: React.FC<PlatformType> = ({ x, y, width, height, type }) => {
  const getStyles = () => {
    switch (type) {
      case 'ground':
        return 'bg-gradient-to-b from-green-800 to-green-900';
      case 'brick':
        return 'bg-gradient-to-b from-red-700 to-red-800 border-t-2 border-red-600';
      case 'question':
        return 'bg-gradient-to-b from-yellow-400 to-yellow-500 animate-pulse border-t-2 border-yellow-300';
      default:
        return 'bg-gray-800';
    }
  };

  return (
    <div 
      className={`absolute ${getStyles()}`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    />
  );
};

export default Platform