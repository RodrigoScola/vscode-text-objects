import {
	Position,
	Range,
	Selection,
	TextEditor,
	TextEditorRevealType,
} from 'vscode';
import Parser from 'web-tree-sitter';
import { closerToZero } from '../utils/math';

export type JoinedPoint = {
	startPosition: Parser.Point;
	endPosition: Parser.Point;
	startIndex: number;
	endIndex: number;
};

export function closestPos(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	nodes.sort((a, b) => a.startPosition.row - b.startPosition.row);

	let closestNode;
	let isInside = true;

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];

		if (
			node.startPosition.row === index.line ||
			node.endPosition.row === index.line
		) {
			return node;
		}

		let startDelta = node.startPosition.row - index.line;
		let endDelta = node.endPosition.row - index.line;
		if (startDelta < 0 && endDelta < 0) {
			continue;
		}
		if (!closestNode) {
			closestNode = node;

			continue;
		}

		const closestDelta = closestNode!.startPosition.row - index.line;

		if (isInside && startDelta < closestDelta) {
			closestNode = node;
			continue;
		}

		if (closerToZero(closestDelta, startDelta) === startDelta) {
			closestNode = node;
			isInside = true;
		}
	}

	return closestNode;
}
//todo this selects inner functions
//maybe should refactor to account for that?
// ill just try it out and see how i feel about it
export function previousToLine(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	nodes.sort((a, b) => a.startPosition.row - b.startPosition.row);

	let closestNode;
	let isInside = true;

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];

		if (
			node.startPosition.row === index.line ||
			node.endPosition.row === index.line
		) {
			return node;
		}

		let startDelta = node.startPosition.row - index.line;
		let endDelta = node.endPosition.row - index.line;
		if (startDelta > 0 && endDelta > 0) {
			continue;
		}
		if (startDelta <= 0 && endDelta >= 0) {
			isInside = true;
		}

		const closestDelta = closestNode!.startPosition.row - index.line;

		if (!closestNode) {
			closestNode = node;
		} else if (isInside && startDelta < closestDelta) {
			closestNode = node;
		} else if (closerToZero(closestDelta, startDelta) === startDelta) {
			closestNode = node;
		}
	}

	return closestNode;
}
export function closestToLine(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	nodes.sort((a, b) => a.startPosition.row - b.startPosition.row);

	let closestNode;
	let isInside = true;

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];

		if (
			node.startPosition.row === index.line ||
			node.endPosition.row === index.line
		) {
			return node;
		}

		let startDelta = node.startPosition.row - index.line;
		let endDelta = node.endPosition.row - index.line;
		if (startDelta < 0 && endDelta < 0) {
			continue;
		}
		if (startDelta <= 0 && endDelta >= 0) {
			isInside = true;
		}

		if (!closestNode) {
			closestNode = node;
		}

		const closestDelta = closestNode!.startPosition.row - index.line;

		if (isInside && startDelta < closestDelta) {
			closestNode = node;
		} else if (closerToZero(closestDelta, startDelta) === startDelta) {
			closestNode = node;
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
