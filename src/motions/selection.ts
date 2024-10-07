import {
	Position,
	Range,
	Selection,
	TextEditor,
	TextEditorRevealType,
} from 'vscode';
import Parser from 'web-tree-sitter';

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
			closestNode = node;
			closestDistance = distance;
		}
	}

	return closestNode;
}

function closerToZero(a: number, b: number) {
	if (Math.abs(a) < Math.abs(b)) {
		return a;
	} else if (Math.abs(b) < Math.abs(a)) {
		return b;
	} else {
		return a; // or return b, since they are equally close to zero
	}
}

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

export function closestToLine(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	nodes.sort((a, b) => a.startPosition.row - b.startPosition.row);

	let closestNode;

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

		if (startDelta < closestDelta) {
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

