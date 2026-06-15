import { useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { initialGameState } from "./data/initialGameState";

function App() {
  const [gameState, setGameState] =
    useState(initialGameState);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold text-center py-6">
        🐯 Pulijudam
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
        <Board
          gameState={gameState}
          setGameState={setGameState}
        />

        <Sidebar gameState={gameState} />
      </div>
    </div>
  );
}

export default App;