import { Position } from 'vscode';
import Parser from 'web-tree-sitter';

export type JoinedPoint = {
     startPosition: Parser.Point;
     endPosition: Parser.Point;
     startIndex: number;
     endIndex: number;
};
export function closestToPosition(
     nodes: JoinedPoint[],
     index: Position
): JoinedPoint | null {
     if (nodes.length === 0) {
          return null;
     }

     let closestNode = nodes[0];

     let closestDistance =
          Math.abs(index.line - closestNode.startPosition.row) +
          Math.abs(index.character - closestNode.startPosition.column);

     let isInside = false;

     for (const node of nodes) {
          const start = node.startPosition;
          const end = node.endPosition;

          // Check if the cursor is within the node's range
          if (
               (index.line > start.row ||
                    (index.line === start.row &&
                         index.character >= start.column)) &&
               (index.line < end.row ||
                    (index.line === end.row && index.character <= end.column))
          ) {
               isInside = true;
               closestNode = node;
          }

          if (start.row > index.line && isInside) {
               continue;
          }

          if (
               start.row < index.line ||
               (start.row === index.line && start.column > index.character)
          ) {
               continue;
          }

          // Calculate the distance to the cursor position
          const distance =
               Math.abs(index.line - start.row) +
               Math.abs(index.character - start.column);
          if (distance < closestDistance) {
               closestNode = node;
               closestDistance = distance;
          }
     }

     return closestNode;
}

