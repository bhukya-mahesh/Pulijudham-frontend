function WinnerModal({
  winner,
  onRestart,
}) {
  if (!winner) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white text-black p-8 rounded-xl shadow-2xl text-center min-w-[350px]">

        <h2 className="text-4xl font-bold mb-4">
          🎉 {winner} Wins!
        </h2>

        <p className="mb-6 text-lg">
          Game Over
        </p>

        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Play Again
        </button>

      </div>
    </div>
  );
}

export default WinnerModal;