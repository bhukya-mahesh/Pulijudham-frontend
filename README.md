# 🐯 Pulijudam (Tiger & Goats)

A modern React implementation of the traditional Indian strategy board game **Pulijudam** (Tiger and Goats).

The game is built entirely with React, SVG, and state management using hooks. Players can place goats, move pieces, capture goats with tigers, and play until one side wins.

---

## 🎮 Game Rules

### 🐯 Tigers

- Tigers can move to connected empty nodes.
- Tigers can capture goats by jumping over them.
- Tigers win after capturing **5 goats**.

### 🐐 Goats

- Goats are placed on the board one by one.
- After all goats are placed, goats can move to connected empty nodes.
- Goats cannot capture tigers.
- Goats win by trapping all tigers so they cannot move or capture.
---

## ✨ Features
### Game Mechanics
✅ Goat Placement Phase
✅ Goat Movement Phase
✅ Tiger Movement
✅ Tiger Capture Logic
✅ Turn-Based Gameplay
✅ Winner Detection
✅ Restart Game

### User Interface
✅ Interactive SVG Board
✅ Move Highlighting
✅ Selected Piece Highlighting
✅ Tiger Score Tracking
✅ Move History Panel
✅ Winner Modal
✅ Responsive Layout
---
### Game Board
- Traditional Pulijudam triangular board
- SVG-based rendering
- Interactive nodes and pieces
### Features
- Green nodes = Valid Moves
- Red nodes = Capture Moves
- Blue nodes = Goat Moves
- Move History Tracking
- Winner Announcement Modal
---
## 🛠️ Tech Stack
### Frontend
- React
- JavaScript (ES6+)
- Tailwind CSS
### Rendering
- SVG Graphics
### State Management
- React Hooks (`useState`, `useEffect`)
---
## 📂 Project Structure

```text
src/
│
├── components/
│   ├── Board.jsx
│   ├── MoveHistory.jsx
│   ├── Node.jsx
│   ├── Piece.jsx
│   ├── Sidebar.jsx
│   └── WinnerModal.jsx
│
├── data/
│   ├── boardData.js
│   └── initialGameState.js
│
├── utils/
│   ├── checkGoatWin.js
│   ├── checkTigerWin.js
│   ├── getCaptureMoves.js
│   ├── getConnectedNodes.js
│   └── getNodeById.js
│
├── App.jsx
├── index.css
└── main.jsx
```
---
## 🚀 Installation
Clone the repository:
```bash
git clone https://github.com/bhukya-mahesh/pulijudam.git
```
Navigate into the project:
```bash
cd PULIJUDAM
```
Install dependencies:
```bash
npm install
```
Run the development server:
```bash
npm run dev
```
Open:
```text
http://localhost:5173
```
---
## 🧠 Game Logic
### Board Representation
The board is represented as a graph:
```js
nodes = []
connections = []
```
Each node stores coordinates, while connections define valid movement paths.
### Tiger Capture
A tiger can capture a goat when:

1. A goat is adjacent.
2. The landing node behind the goat is empty.
3. The landing node is connected through a valid path.
### Goat Victory
Goats win when all tigers:
- Have no valid moves
- Have no valid capture moves
### Tiger Victory
Tigers win when:
```js
goatsCaptured >= 5
```
---
## 🎯 Learning Outcomes
This project demonstrates:
- React Component Architecture
- State Management
- Graph-Based Board Games
- SVG Rendering
- Game Logic Implementation
- Conditional Rendering
- Event Handling
- Responsive UI Design
---
## 🔮 Future Improvements
- Single Player Mode (AI Opponent)
- Online Multiplayer
- Sound Effects
- Animations
- Leaderboard
- Save/Load Games
- Mobile App Version
- Difficulty Levels
---
## 👨‍💻 Author
Built with React and Tailwind CSS as a frontend game development project.
Inspired by the traditional Indian board game **Pulijudam (Tiger & Goats)**.