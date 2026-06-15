import { nodes } from "../data/boardData";

export function getCaptureMoves(
  tigerPosition,
  goats,
  tigers
) {
  const tigerNode = nodes.find(
    (n) => n.id === tigerPosition
  );

  const captures = [];

  nodes.forEach((goatNode) => {
    if (!goats.includes(goatNode.id)) return;

    const dx = goatNode.x - tigerNode.x;
    const dy = goatNode.y - tigerNode.y;

    const landingX = goatNode.x + dx;
    const landingY = goatNode.y + dy;

    const landingNode = nodes.find(
      (n) =>
        n.x === landingX &&
        n.y === landingY
    );

    if (!landingNode) return;

    if (
      goats.includes(landingNode.id) ||
      tigers.includes(landingNode.id)
    )
      return;

    captures.push({
      goatId: goatNode.id,
      landingId: landingNode.id,
    });
  });

  return captures;
}