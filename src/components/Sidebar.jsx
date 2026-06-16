import { initialGameState } from "../data/initialGameState";

function Sidebar({ gameState ,setGameState }) {
  return (
    <div className="w-full lg:w-80 bg-[#5C4033] rounded-xl p-4">
      <h2 className="text-2xl mb-4">
        Game Information
      </h2>
      <div className="bg-[#8B5E3C] p-3 rounded-lg mt-4">
  <p className="text-lg font-bold">
    Turn:
    {gameState.turn === "goat"
      ? " 🐐 Goat"
      : " 🐯 Tiger"}
  </p>
</div>
    <div className="bg-orange-500/20 p-3 rounded-lg mt-3">
  <h3 className="font-bold text-lg">
    🐯 Tiger Score
  </h3>

  <p className="text-2xl font-bold">
    {gameState.goatsCaptured}/5
  </p>
</div>
      <p>Tigers : {gameState.tigers.length}</p>

      <p>
        Goats Remaining :
        {gameState.goatsRemaining}
      </p>

      <p>
        Goats Placed :
        {gameState.goats.length}
      </p>
      <button
  onClick={() => setGameState(initialGameState)}
  className="mt-6 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg"
>
  Restart Game
</button>
    </div>
  );
}

export default Sidebar;