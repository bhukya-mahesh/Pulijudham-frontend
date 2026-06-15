import { nodes } from "../data/boardData";

export function getNodeById(id) {
  return nodes.find((node) => node.id === id);
}