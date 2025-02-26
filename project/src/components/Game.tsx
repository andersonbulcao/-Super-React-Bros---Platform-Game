import React, { useEffect, useCallback } from 'react';
import { useGameStore } from '../store/gameStore';
import Player from './Player';
import Enemy from './Enemy';
import Platform from './Platform';
import PowerUp from './PowerUp';
import HUD from './HUD';
import Menu from './Menu';

const Game: React.FC = () => {
  const { 
    gameState,
    player,
    enemies,
    platforms,
    powerUps,
    updateEntities,
    setGameState,
    movePlayer,
    initLevel,
    resetLevel,
  } = useGameStore();

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (gameState === 'playing') {
      switch (e.key) {
        case 'ArrowLeft':
          movePlayer('left');
          break;
        case 'ArrowRight':
          movePlayer('right');
          break;
        case 'ArrowUp':
        case ' ':
          movePlayer('jump');
          break;
        case 'f':
          // Shoot fireball if power-up is active
          break;
        case 'p':
          setGameState('paused');
          break;
      }
    } else if (gameState === 'paused' && e.key === 'p') {
      setGameState('playing');
    } else if (gameState === 'gameOver' && e.key === 'Enter') {
      resetLevel();
    }
  }, [gameState, setGameState, movePlayer, resetLevel]);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (gameState === 'playing') {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        useGameStore.getState().updatePlayer({ velocity: { ...player.velocity, x: 0 } });
      }
    }
  }, [gameState, player.velocity]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleKeyPress, handleKeyUp]);

  useEffect(() => {
    let gameLoop: number;

    if (gameState === 'playing') {
      gameLoop = requestAnimationFrame(function update() {
        updateEntities();
        gameLoop = requestAnimationFrame(update);
      });
    }

    return () => cancelAnimationFrame(gameLoop);
  }, [gameState, updateEntities]);

  useEffect(() => {
    if (gameState === 'playing') {
      initLevel(1);
    }
  }, [gameState, initLevel]);

  if (gameState === 'menu') {
    return <Menu />;
  }

  return (
    <div className="relative w-full h-screen bg-gradient-to-b from-sky-300 to-sky-500 overflow-hidden">
      <div className="absolute inset-0">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-16 h-16 bg-white rounded-full opacity-50" />
          <div className="absolute top-20 right-1/3 w-12 h-12 bg-white rounded-full opacity-30" />
          <div className="absolute top-40 left-1/3 w-8 h-8 bg-white rounded-full opacity-40" />
        </div>
        
        {/* Game entities */}
        <Player {...player} />
        {enemies.map((enemy) => (
          <Enemy key={enemy.id} {...enemy} />
        ))}
        {platforms.map((platform) => (
          <Platform key={platform.id} {...platform} />
        ))}
        {powerUps.map((powerUp) => (
          <PowerUp key={powerUp.id} {...powerUp} />
        ))}
      </div>
      
      <HUD />
      
      {gameState === 'paused' && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-4xl text-white font-bold">PAUSED</div>
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
          <div className="text-6xl text-red-500 font-bold mb-4">GAME OVER</div>
          <div className="text-2xl text-white mb-8">Score: {player.score}</div>
          <button 
            onClick={resetLevel}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xl font-bold transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;