import { getConnectedNodes } from "./getConnectedNodes";
import { getCaptureMoves } from "./getCaptureMoves";

export function checkGoatWin(
  tigers,
  goats
) {
  for (const tiger of tigers) {
      const normalMoves =
      getConnectedNodes(tiger).filter(
        (nodeId) =>
          !tigers.includes(nodeId) &&
          !goats.includes(nodeId)
      );

    const captures =
      getCaptureMoves(
        tiger,
        goats,
        tigers
      );

    if (
      normalMoves.length > 0 ||
      captures.length > 0
    ) {
      return false;
    }
  }
  return true;
}