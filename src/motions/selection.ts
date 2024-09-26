import {
	Position,
	Range,
	Selection,
	TextEditor,
	TextEditorRevealType,
} from 'vscode';
import Parser from 'web-tree-sitter';
import { visualize } from '../extension';

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

		let currentInside = false;
		// Check if the cursor is within the node's range
		if (
			(index.line > start.row ||
				(index.line === start.row &&
					index.character >= start.column)) &&
			(index.line < end.row ||
				(index.line === end.row && index.character <= end.column))
		) {
			isInside = true;
			console.log('inside');
			closestNode = node;
		}

		if (start.row > index.line && isInside && !currentInside) {
			continue;
		}

		if (
			start.row < index.line ||
			(start.row === index.line && start.column > index.character)
		) {
			continue;
		}

		console.log(`calculating the closest one`, index.line, start.row);
		// Calculate the distance to the cursor position
		const distance =
			Math.abs(index.line - start.row) +
			Math.abs(index.character - start.column);
		if (distance < closestDistance) {
			visualize(node, node);
			closestNode = node;
			closestDistance = distance;
		}
	}

	return closestNode;
}

export function select(
	startPos: Position,
	endPos: Position,
	editor: TextEditor
) {
	editor.selection = new Selection(startPos, endPos); // Move cursor to that position
	editor.revealRange(
		new Range(startPos, endPos),
		TextEditorRevealType.InCenterIfOutsideViewport
	);

	return editor;
}

