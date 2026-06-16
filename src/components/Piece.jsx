function Piece({ x, y, type }) {
  return (
    <>
      <circle
        cx={x}
        cy={y}
        r="22"
        fill={type === "tiger" ? "#D97706" : "#FFF8DC"}
        stroke="#000"
        strokeWidth="2"
      />

      <text
        x={x}
        y={y + 7}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="16"
        pointerEvents="none"
      >
        {type === "tiger" ? "🐯" : "🐐"}
      </text>
    </>
  );
}

export default Piece;