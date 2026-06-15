function Sidebar({ gameState }) {
  return (
    <div className="w-full lg:w-80 bg-gray-800 rounded-xl p-4">
      <h2 className="text-2xl mb-4">
        Game Info
      </h2>

      <p>Turn : {gameState.turn}</p>

      <p>Tigers : {gameState.tigers.length}</p>

      <p>
        Goats Remaining :
        {gameState.goatsRemaining}
      </p>

      <p>
        Goats Placed :
        {gameState.goats.length}
      </p>
    </div>
  );
}

export default Sidebar;