function Node({ x, y }) {
  return (
    <div
      className="absolute w-5 h-5 rounded-full bg-white border-2 border-black z-10"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
}

export default Node;