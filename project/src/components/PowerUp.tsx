import React from 'react';
import { PowerUp as PowerUpType } from '../types';

const PowerUp: React.FC<PowerUpType> = ({ x, y, width, height, type }) => {
  const getBackgroundColor = () => {
    switch (type) {
      case 'mushroom':
        return '#ff5722';
      case 'star':
        return '#ffd700';
      case 'flower':
        return '#e91e63';
      default:
        return '#ffffff';
    }
  };

  return (
    <div 
      className="absolute animate-bounce"
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: getBackgroundColor(),
        borderRadius: '50%',
      }}
    />
  );
};

export default PowerUp;