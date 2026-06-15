import Piece from "./Piece";
import { nodes, connections } from "../data/boardData";
import { getConnectedNodes } from "../utils/getConnectedNodes";
import { getCaptureMoves } from "../utils/getCaptureMoves";


function Board({ gameState, setGameState }) {

    const handleTigerClick = (tigerNodeId) => {
        if (gameState.turn !== "tiger") return

         setGameState({
           ...gameState,
            selectedTiger: tigerNodeId,
            });
        };
    const validMoves =
     gameState.selectedTiger !== null
     ? getConnectedNodes(gameState.selectedTiger).filter(
        (nodeId) =>
          !gameState.tigers.includes(nodeId) &&
          !gameState.goats.includes(nodeId)
      )
    : [];
    
    const captureMoves =
  gameState.selectedTiger !== null
    ? getCaptureMoves(
        gameState.selectedTiger,
        gameState.goats,
        gameState.tigers
      )
    : [];
  
 const handleNodeClick = (nodeId) => {

  // GOAT PLACEMENT PHASE
  if (
    gameState.turn === "goat" &&
    gameState.goatsRemaining > 0
  ) {

    if (
      gameState.tigers.includes(nodeId) ||
      gameState.goats.includes(nodeId)
    ) {
      return;
    }

    setGameState({
      ...gameState,
      goats: [...gameState.goats, nodeId],
      goatsRemaining: gameState.goatsRemaining - 1,
      turn: "tiger",
    });

    return;
  }

  // TIGER MOVE PHASE
  if (
    gameState.turn === "tiger" &&
    gameState.selectedTiger !== null
  ) {

    if (!validMoves.includes(nodeId)) return;

    const updatedTigers =
      gameState.tigers.map((id) =>
        id === gameState.selectedTiger
          ? nodeId
          : id
      );

    setGameState({
      ...gameState,
      tigers: updatedTigers,
      selectedTiger: null,
      turn: "goat",
    });
  }
};
  

  return (
    <div className="flex-1 bg-gray-800 rounded-xl p-4">
      <h2 className="text-2xl mb-4 text-white">
        Game Board
      </h2>

      <div className="relative w-[800px] h-[500px] border rounded-lg mx-auto">

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 500"
        >

          {/* Connections */}
          {connections.map(([start, end], index) => {
            const from = nodes.find(
              (n) => n.id === start
            );

            const to = nodes.find(
              (n) => n.id === end
            );

            return (
              <line
                key={index}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="white"
                strokeWidth="3"
              />
            );
          })}

          {/* Nodes */}
          {nodes.map((node) => (
            <circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r="12"
              fill={
  captureMoves.some(
    (move) => move.landingId === node.id
  )
    ? "#ef4444"
    : validMoves.includes(node.id)
    ? "#22c55e"
    : "white"
}
              stroke="black"
              strokeWidth="2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleNodeClick(node.id)
              }
            />
          ))}

          {/* Tigers */}
         {gameState.tigers.map((id) => {
  const node = nodes.find(
    (n) => n.id === id
  );

  return (
    <g
  key={`tiger-${id}`}
  onClick={() => handleTigerClick(id)}
  style={{
    cursor: "pointer",
    opacity:
      gameState.selectedTiger === id
        ? 0.7
        : 1,
  }}
>
      <Piece
        x={node.x}
        y={node.y}
        type="tiger"
      />
    </g>
  );
})}

          {/* Goats */}
          {gameState.goats.map((id) => {
            const node = nodes.find(
              (n) => n.id === id
            );

            return (
              <Piece
                key={`goat-${id}`}
                x={node.x}
                y={node.y}
                type="goat"
              />
            );
          })}
        </svg>

      </div>
    </div>
  );
}

export default Board;