import React from 'react';
import { useGameStore } from '../store/gameStore';
import { Play, Trophy } from 'lucide-react';

const Menu: React.FC = () => {
  const { setGameState } = useGameStore();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-6xl font-bold mb-8">Super React Bros</h1>
      <div className="flex flex-col gap-4">
        <button
          onClick={() => setGameState('playing')}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
        >
          <Play className="w-6 h-6" />
          Start Game
        </button>
        <button
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 px-8 py-4 rounded-lg text-2xl font-bold transition-colors"
        >
          <Trophy className="w-6 h-6" />
          High Scores
        </button>
      </div>
    </div>
  );
};

export default Menu;