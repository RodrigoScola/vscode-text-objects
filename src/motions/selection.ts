import assert from 'assert';
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

	nodes.sort((a, b) => {
		if (a.startPosition.row === b.startPosition.row) {
			return a.startPosition.column - b.startPosition.column;
		}

		return a.startPosition.row - b.startPosition.row;
	});

	let closestNode;
	let isInside = true;

	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		const next = nodes[i + 1];

		if (
			(node.startPosition.row === index.line ||
				node.endPosition.row === index.line) &&
			(!next ||
				next.startPosition.row !== index.line ||
				next.endPosition.row !== index.line)
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
		} else if (closestDelta === startDelta) {
			const closestRow =
				closestNode.startPosition.column - index.character;
			const currentRow = node.startPosition.column - index.character;

			if (closerToZero(closestRow, currentRow) === currentRow) {
				isInside = true;
				closestNode = node;
			}
			continue;
		}
		// if (closerToZero(closestDelta, startDelta) === startDelta) {
		// 	closestNode = node;
		// 	isInside = true;
		// }
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

	nodes.sort((a, b) => {
		assert(a, 'a is undefined');
		assert(b, 'b is undefined');
		if (a.startPosition.row === b.startPosition.row) {
			return a.startPosition.column - b.startPosition.column;
		}

		return a.startPosition.row - b.startPosition.row;
	});

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

		if (!closestNode) {
			closestNode = node;
			continue;
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
