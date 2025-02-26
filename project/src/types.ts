export type GameState = 'menu' | 'playing' | 'paused' | 'levelComplete' | 'gameOver';

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Entity = Position & Size & {
  id: string;
  type: string;
  velocity: Position;
};

export type Player = Entity & {
  lives: number;
  coins: number;
  score: number;
  isJumping: boolean;
  isBig: boolean;
  isInvincible: boolean;
  canShootFire: boolean;
};

export type Enemy = Entity & {
  direction: 'left' | 'right';
  isDead: boolean;
};

export type Platform = Entity & {
  type: 'ground' | 'brick' | 'question';
  hasPowerUp?: boolean;
};

export type PowerUpType = 'mushroom' | 'star' | 'flower';

export type PowerUp = Entity & {
  type: PowerUpType;
};