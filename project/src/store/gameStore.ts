import { create } from 'zustand';
import { GameState, Player, Enemy, Platform, PowerUp } from '../types';

interface GameStore {
  gameState: GameState;
  player: Player;
  enemies: Enemy[];
  platforms: Platform[];
  powerUps: PowerUp[];
  time: number;
  level: number;
  setGameState: (state: GameState) => void;
  updatePlayer: (player: Partial<Player>) => void;
  movePlayer: (direction: 'left' | 'right' | 'jump') => void;
  updateEntities: () => void;
  resetLevel: () => void;
  initLevel: (level: number) => void;
}

const INITIAL_PLAYER: Player = {
  id: 'player',
  type: 'player',
  x: 50,
  y: 300,
  width: 32,
  height: 32,
  velocity: { x: 0, y: 0 },
  lives: 3,
  coins: 0,
  score: 0,
  isJumping: false,
  isBig: false,
  isInvincible: false,
  canShootFire: false,
};

const GRAVITY = 0.5;
const JUMP_FORCE = -12;
const MOVE_SPEED = 5;
const MAX_FALL_SPEED = 10;
const ENEMY_SPEED = 2;

const LEVEL_CONFIGS = {
  1: {
    platforms: [
      { id: 'p1', type: 'brick', x: 200, y: 400, width: 96, height: 32 },
      { id: 'p2', type: 'question', x: 400, y: 300, width: 32, height: 32, hasPowerUp: true },
      { id: 'p3', type: 'brick', x: 600, y: 350, width: 128, height: 32 },
    ],
    enemies: [
      { id: 'e1', type: 'goomba', x: 300, y: 450, width: 32, height: 32, velocity: { x: -ENEMY_SPEED, y: 0 }, direction: 'left', isDead: false },
      { id: 'e2', type: 'goomba', x: 700, y: 450, width: 32, height: 32, velocity: { x: -ENEMY_SPEED, y: 0 }, direction: 'left', isDead: false },
    ],
    powerUps: [
      { id: 'pu1', type: 'mushroom', x: 400, y: 260, width: 24, height: 24, velocity: { x: 0, y: 0 } },
    ],
  },
};

export const useGameStore = create<GameStore>((set, get) => ({
  gameState: 'menu',
  player: INITIAL_PLAYER,
  enemies: [],
  platforms: [
    {
      id: 'ground',
      type: 'ground',
      x: 0,
      y: 500,
      width: window.innerWidth,
      height: 32,
      velocity: { x: 0, y: 0 },
    }
  ],
  powerUps: [],
  time: 300,
  level: 1,

  setGameState: (state) => set({ gameState: state }),

  updatePlayer: (playerUpdate) => 
    set((state) => ({ 
      player: { ...state.player, ...playerUpdate } 
    })),

  movePlayer: (direction) => {
    const { player } = get();
    const newVelocity = { ...player.velocity };

    switch (direction) {
      case 'left':
        newVelocity.x = -MOVE_SPEED;
        break;
      case 'right':
        newVelocity.x = MOVE_SPEED;
        break;
      case 'jump':
        if (!player.isJumping) {
          newVelocity.y = JUMP_FORCE;
          set((state) => ({
            player: { ...state.player, isJumping: true }
          }));
        }
        break;
    }

    set((state) => ({
      player: { ...state.player, velocity: newVelocity }
    }));
  },

  updateEntities: () => {
    const { player, platforms, enemies, powerUps } = get();
    
    // Update player position based on velocity
    let newX = player.x + player.velocity.x;
    let newY = player.y + player.velocity.y;
    let newVelocity = { ...player.velocity };

    // Apply gravity
    newVelocity.y = Math.min(newVelocity.y + GRAVITY, MAX_FALL_SPEED);

    // Collision detection with all platforms
    let isOnGround = false;
    platforms.forEach(platform => {
      // Vertical collision
      if (newX + player.width > platform.x && 
          newX < platform.x + platform.width) {
        // Landing on top of platform
        if (newY + player.height > platform.y && 
            player.y + player.height <= platform.y) {
          newY = platform.y - player.height;
          newVelocity.y = 0;
          isOnGround = true;
        }
        // Hitting platform from below
        else if (newY < platform.y + platform.height && 
                 player.y >= platform.y + platform.height) {
          newY = platform.y + platform.height;
          newVelocity.y = 0;
        }
      }
    });

    // Update jumping state
    if (isOnGround) {
      set((state) => ({
        player: { ...state.player, isJumping: false }
      }));
    }

    // Keep player within screen bounds
    newX = Math.max(0, Math.min(newX, window.innerWidth - player.width));

    // Apply friction
    if (newVelocity.x > 0) {
      newVelocity.x = Math.max(0, newVelocity.x - 0.1);
    } else if (newVelocity.x < 0) {
      newVelocity.x = Math.min(0, newVelocity.x + 0.1);
    }

    // Update enemies
    const updatedEnemies = enemies.map(enemy => {
      if (enemy.isDead) return enemy;

      let enemyX = enemy.x + enemy.velocity.x;
      
      // Reverse direction at screen bounds
      if (enemyX <= 0 || enemyX + enemy.width >= window.innerWidth) {
        enemy.velocity.x = -enemy.velocity.x;
        enemy.direction = enemy.velocity.x > 0 ? 'right' : 'left';
      }

      // Check collision with player
      if (!player.isInvincible && 
          newX < enemy.x + enemy.width &&
          newX + player.width > enemy.x &&
          newY < enemy.y + enemy.height &&
          newY + player.height > enemy.y) {
        // Player jumps on enemy
        if (player.velocity.y > 0 && 
            player.y + player.height < enemy.y + enemy.height / 2) {
          enemy.isDead = true;
          newVelocity.y = JUMP_FORCE / 1.5; // Bounce off enemy
          set((state) => ({
            player: { ...state.player, score: state.player.score + 100 }
          }));
        } else {
          // Player gets hit
          set((state) => ({
            player: { 
              ...state.player, 
              lives: state.player.lives - 1,
              isInvincible: true
            }
          }));
          setTimeout(() => {
            set((state) => ({
              player: { ...state.player, isInvincible: false }
            }));
          }, 2000);
        }
      }

      return {
        ...enemy,
        x: enemyX,
        y: enemy.y
      };
    });

    // Update player state
    set((state) => ({
      player: {
        ...state.player,
        x: newX,
        y: newY,
        velocity: newVelocity,
      },
      enemies: updatedEnemies
    }));

    // Check game over
    if (player.lives <= 0) {
      set({ gameState: 'gameOver' });
    }
  },

  initLevel: (level) => {
    const config = LEVEL_CONFIGS[level as keyof typeof LEVEL_CONFIGS];
    if (!config) return;

    set((state) => ({
      platforms: [
        {
          id: 'ground',
          type: 'ground',
          x: 0,
          y: 500,
          width: window.innerWidth,
          height: 32,
          velocity: { x: 0, y: 0 },
        },
        ...config.platforms.map(p => ({ ...p, velocity: { x: 0, y: 0 } }))
      ],
      enemies: config.enemies,
      powerUps: config.powerUps,
      level,
      time: 300,
    }));
  },

  resetLevel: () => {
    const { level } = get();
    set({
      player: INITIAL_PLAYER,
      gameState: 'playing',
    });
    get().initLevel(level);
  },
}));