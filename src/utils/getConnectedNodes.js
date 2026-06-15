import { connections } from "../data/boardData";

export function getConnectedNodes(nodeId) {
  const result = [];

  connections.forEach(([a, b]) => {
    if (a === nodeId) result.push(b);
    if (b === nodeId) result.push(a);
  });

  return result;
}