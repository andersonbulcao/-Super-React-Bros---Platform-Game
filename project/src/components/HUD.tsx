import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Timer, Coins, Heart, Star } from 'lucide-react';

const HUD: React.FC = () => {
  const { player, time, level } = useGameStore();

  return (
    <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-black/50 text-white">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Heart className="w-6 h-6 text-red-500" />
          <span className="text-xl">{player.lives}</span>
        </div>
        <div className="flex items-center gap-2">
          <Coins className="w-6 h-6 text-yellow-500" />
          <span className="text-xl">{player.coins}</span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-6 h-6 text-yellow-400" />
          <span className="text-xl">{player.score}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Timer className="w-6 h-6" />
          <span className="text-xl">{time}</span>
        </div>
        <div className="text-xl">Level {level}</div>
      </div>
    </div>
  );
};

export default HUD;