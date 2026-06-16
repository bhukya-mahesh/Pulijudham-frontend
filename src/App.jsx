import { useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import { initialGameState } from "./data/initialGameState";
import { useEffect } from "react";
import { checkTigerWin } from "./utils/checkTigerWin";
import { checkGoatWin } from "./utils/checkGoatWin";
import WinnerModal from "./components/WinnerModal";
import MoveHistory from "./components/MoveHistory";

function App() {
  const [gameState, setGameState] =
    useState(initialGameState);

  useEffect(() => {
       if (gameState.winner) return;

  if (
    checkTigerWin(
      gameState.goatsCaptured
    )
  ) {
    setGameState((prev) => ({
      ...prev,
      winner: "Tiger",
    }));

    return;
  }

  if (
    checkGoatWin(
      gameState.tigers,
      gameState.goats
    )
  ) {
    setGameState((prev) => ({
      ...prev,
      winner: "Goat",
    }));
  }

}, [
  gameState.goatsCaptured,
  gameState.tigers,
  gameState.goats,
  gameState.winner,
]);

  return (
    <div className="min-h-screen bg-[#2D1B0E] text-white">
      <h1 className="text-4xl font-bold text-center py-6">
        🐅  PULIJUDHAM 
      </h1>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 p-4">
        <Board
          gameState={gameState}
          setGameState={setGameState}
        />
          <div className="w-full lg:w-80 flex flex-col gap-4">
        <Sidebar 
        gameState={gameState}
        setGameState={setGameState}
         />
         <MoveHistory
         gameState={gameState}
         />
         <WinnerModal
           winner={gameState.winner}
           onRestart={() =>
            setGameState(initialGameState)
           }
          />
        </div>
      </div>
    </div>
  );
}

export default App;