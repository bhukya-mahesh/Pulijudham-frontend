import Piece from "./Piece";
import { nodes, connections } from "../data/boardData";
import { getConnectedNodes } from "../utils/getConnectedNodes";
import { getCaptureMoves } from "../utils/getCaptureMoves";


function Board({ gameState, setGameState }) {
const handleTigerClick = (tigerNodeId) => {
      if (gameState.winner) return;
        if (gameState.turn !== "tiger") return

         setGameState({
           ...gameState,
            selectedTiger: tigerNodeId,
            selectedGoat : null,
            });
        };

const handleGoatClick = (goatNodeId) => {
  if (gameState.winner) return;
  if (gameState.turn !== "goat") return;

  if (gameState.goatsRemaining > 0) return;

  setGameState({
    ...gameState,
    selectedGoat: goatNodeId,
    selectedTiger:null,
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

    const goatValidMoves =
  gameState.selectedGoat !== null
    ? getConnectedNodes(gameState.selectedGoat).filter(
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
    if (gameState.winner) return;
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
    moveHistory: [
      ...gameState.moveHistory,
      `🐐 Goat placed at node ${nodeId}`,
    ],
    turn: "tiger",
  });

  return;
}
   
  // GOAT MOVEMENT PHASE
  if (
  gameState.turn === "goat" &&
  gameState.goatsRemaining === 0 &&
  gameState.selectedGoat !== null
) {

  if (!goatValidMoves.includes(nodeId))
    return;

  const updatedGoats =
    gameState.goats.map((id) =>
      id === gameState.selectedGoat
        ? nodeId
        : id
    );

  setGameState({
    ...gameState,
    goats: updatedGoats,
      moveHistory: [
    ...gameState.moveHistory,
    `🐐 Goat moved to node ${nodeId}`,
  ],
    selectedGoat: null,
    selectedTiger : null,
    turn: "tiger",
  });

  return;
}
  // TIGER MOVE PHASE
  if (
  gameState.turn === "tiger" &&
  gameState.selectedTiger !== null
) {

  const captureMove = captureMoves.find(
    (move) => move.landingId === nodeId
  );

  // CAPTURE MOVE
  if (captureMove) {
    const updatedTigers =
      gameState.tigers.map((id) =>
        id === gameState.selectedTiger
          ? nodeId
          : id
      );

    const updatedGoats =
      gameState.goats.filter(
        (id) => id !== captureMove.goatId
      );

    setGameState({
      ...gameState,
      tigers: updatedTigers,
      goats: updatedGoats,
      goatsCaptured:
        (gameState.goatsCaptured || 0) + 1,
     moveHistory: [
    ...gameState.moveHistory,
    `🐯 Captured goat at node ${captureMove.goatId}`,
  ], 
      selectedTiger: null,
      selectedGoat : null,
      turn: "goat",
    });

    return;
  }

  // NORMAL MOVE
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
    moveHistory: [
    ...gameState.moveHistory,
    `🐯 Tiger moved to node ${nodeId}`,
  ],
    selectedTiger: null,
    selectedGoat: null,
    turn: "goat",
  });
}

};
  

  return (
    <div className="flex-1 bg-[#8B5E3C] rounded-xl p-4 shadow-2xl">
      <h2 className="text-2xl mb-4 text-white">
         Game Board   
      </h2>
      <div className="relative w-full max-w-[800px] aspect-[8/5] border-4 border-[#5C4033] rounded-lg mx-auto bg-[#F5E6CA]">

        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 800 500"
        >
            {/*connections*/}
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
                stroke="#5C4033"
                strokeWidth="3"
              />
            );
          })}

          {/*nodes */}
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
    :goatValidMoves.includes(node.id)
    ? "#3b82f6"
    : "#FFF8DC"
}
              stroke="black"
              strokeWidth="2"
              style={{ cursor: "pointer" }}
              onClick={() =>
                handleNodeClick(node.id)
              }
            />
          ))}

          {/*Tigers */}
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
        ? 0.85
        : 1,
  }}
>
  {gameState.selectedTiger === id && (
    <circle
      cx={node.x}
      cy={node.y}
      r="28"
      fill="none"
      stroke="#facc15"
      strokeWidth="4"
    />
  )}

  <Piece
    x={node.x}
    y={node.y}
    type="tiger"
  />
</g>
  );
})}

          {/*Goats */}
          {gameState.goats.map((id) => {
            const node = nodes.find(
              (n) => n.id === id
            );

            return (
     <g
  key={`goat-${id}`}
  onClick={() => handleGoatClick(id)}
  style={{
    cursor: "pointer",
    opacity:
      gameState.selectedGoat === id
        ? 0.85
        : 1,
  }}
>
  {gameState.selectedGoat === id && (
    <circle
      cx={node.x}
      cy={node.y}
      r="28"
      fill="none"
      stroke="#3b82f6"
      strokeWidth="4"
    />
  )}

  <Piece
    x={node.x}
    y={node.y}
    type="goat"
  />
</g>
            );
          })}
        </svg>

      </div>
    </div>
  );
}

export default Board;