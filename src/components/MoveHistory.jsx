
const MoveHistory = ({ gameState }) => {
  return (
    <div className="w-full lg:w-80 bg-[#5C4033] rounded-xl p-4" >
      <h3 className="text-xl font-bold mb-4">
        📜 Move History
      </h3>

      <div className="h-80 overflow-y-auto space-y-2">
        {gameState.moveHistory.map((move, index) => (
          <div
            key={index}
            className="bg-[#8B5E3C] p-2 rounded"
          >
            {move}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoveHistory;
