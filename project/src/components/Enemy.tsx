import React from 'react';
import { Enemy as EnemyType } from '../types';

const Enemy: React.FC<EnemyType> = ({ x, y, width, height, type, direction, isDead }) => {
  if (isDead) return null;

  return (
    <div 
      className={`absolute transition-transform ${
        direction === 'left' ? 'scale-x-[-1]' : ''
      }`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div 
        className="w-full h-full rounded-lg animate-bounce"
        style={{
          backgroundColor: type === 'goomba' ? '#8b4513' : '#ff0000',
          animationDuration: '1s',
        }}
      />
    </div>
  );
};

export default Enemy