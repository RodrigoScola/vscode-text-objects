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

export function nextToPosition(nodes: JoinedPoint[], index: Position) {
	if (nodes.length === 0) {
		return undefined;
	}

	// let closestNode = nodes[0];
	let closestNode = undefined;
	let closestDistance = Infinity;
	//      Math.abs(index.line - closestNode.startPosition.row);
	//Math.abs(index.character - closestNode.startPosition.column);

	for (const node of nodes) {
		const start = node.startPosition;
		if (start.row > index.line) {
			continue;
		}

		if (
			start.row < index.line ||
			(start.row === index.line && start.column > index.character)
		) {
			continue;
		}

		// Calculate the distance to the cursor position
		const distance = Math.abs(index.line - start.row);
		//Math.abs(index.character - start.column);
		if (distance < closestDistance) {
			visualize(node, node);
			closestNode = node;
			closestDistance = distance;
		}
	}

	return closestNode;
}

export function closestToPosition(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	// let closestNode = nodes[0];
	let closestNode = undefined;

	let closestDistance = Infinity;
	let isInside = false;

	for (const node of nodes) {
		const start = node.startPosition;
		const end = node.endPosition;

		let currentInside = false;
		// Check if the cursor is within the node's range
		if (
			(index.line > start.row || index.line === start.row) &&
			//index.character >= start.column)) &&
			(index.line < end.row || index.line === end.row)
			//  && index.character <= end.column))
		) {
			isInside = true;
			closestNode = node;
		}

		if (start.row > index.line && isInside && !currentInside) {
			continue;
		}

		if (start.row < index.line || start.row === index.line) {
			continue;
		}

		// Calculate the distance to the cursor position
		const distance = Math.abs(index.line - start.row);
		//Math.abs(index.character - start.column);
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
	const cursor = editor.selection.active;

	editor.selection = new Selection(startPos, endPos); // Move cursor to that position

	editor.document.lineCount;

	const delta = Math.abs(cursor.line - editor.selection.active.line);

	let revealType = TextEditorRevealType.Default;

	if (delta > editor.document.lineCount) {
		revealType = TextEditorRevealType.InCenter;
	}

	editor.revealRange(new Range(startPos, endPos), revealType);

	return editor;
}

