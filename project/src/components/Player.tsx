import React from 'react';
import { Player as PlayerType } from '../types';

const Player: React.FC<PlayerType> = ({ x, y, width, height, isBig, isInvincible }) => {
  return (
    <div 
      className={`absolute transition-transform ${
        isInvincible ? 'animate-pulse' : ''
      }`}
      style={{
        transform: `translate(${x}px, ${y}px)`,
        width: `${width}px`,
        height: `${height * (isBig ? 2 : 1)}px`,
        backgroundColor: '#ff0000',
      }}
    />
  );
};

export default Player;