# Super React Bros - Platform Game

A 2D platform game built with React, TypeScript, and Tailwind CSS, inspired by classic platformer games.

## 🎮 Game Features

- **Classic Platformer Gameplay**: Jump, run, and navigate through levels
- **Enemy Interactions**: Jump on enemies to defeat them
- **Power-up System**: Collect items to gain special abilities
  - Mushroom: Increases player size
  - Star: Temporary invincibility
  - Fire Flower: Ability to shoot fireballs
- **Score System**: Earn points by defeating enemies and collecting coins
- **Lives System**: Multiple chances to complete the level
- **Game States**: Menu, Playing, Paused, and Game Over states

## 🎯 Game Controls

- **Arrow Left/Right**: Move player
- **Arrow Up/Space**: Jump
- **F Key**: Shoot fireball (when power-up is active)
- **P Key**: Pause/Unpause game
- **Enter**: Restart game (when game over)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository or download the files

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided local URL

## 🛠️ Built With

- React
- TypeScript
- Tailwind CSS
- Zustand (State Management)
- Vite (Build Tool)

## 🎨 Features

### Game Mechanics
- Smooth platform physics
- Enemy AI with movement patterns
- Collision detection system
- Power-up collection and effects

### Visual Elements
- Responsive game design
- Animated characters and enemies
- Visual feedback for actions
- Dynamic HUD display

### Game Progress
- Score tracking
- Life system
- Level progression
- Time limit per level

## 🎯 How to Play

1. Click "Start Game" on the main menu
2. Use arrow keys to move and jump
3. Jump on enemies to defeat them
4. Collect power-ups to gain abilities
5. Avoid enemy contact or lose lives
6. Complete the level before time runs out

## 🔧 Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
