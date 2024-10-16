import assert from 'assert';
import {
	Position,
	Range,
	Selection,
	TextEditor,
	TextEditorRevealType,
} from 'vscode';
import Parser, { QueryMatch } from 'web-tree-sitter';
import { visualize } from '../extension';
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

	for (let i = nodes.length - 1; i >= 0; i--) {
		const node = nodes[i];
		visualize(node);
		const next = nodes[i - 1];

		visualize(next);

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
			visualize(closestNode);
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
export function nextPosition(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
	if (nodes.length === 0) {
		return;
	}
	assert(index.line >= 0, 'line cannot be outside of range');

	nodes.sort((a, b) => a.startPosition.row - b.startPosition.row);

	let closestDelta = -Infinity;
	let closestNode: JoinedPoint | undefined;

	for (const node of nodes) {
		assert(node, 'invalid node to get position');
		assert(
			node.startPosition.row > 0,
			'start position cannot be less than 0: ' + node.startPosition.row
		);

		let startDelta = node.startPosition.row - index.line;

		if (
			startDelta > 0 &&
			closerToZero(startDelta, closestDelta) === startDelta
		) {
			closestDelta = startDelta;
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

export function groupElements(matches: QueryMatch[]): QueryMatch[] {
	// remember to turn this on before publishing
	// if (getConfig().groupElements() === false) {
	// 	return matches;
	// }

	const captureParents = new Map<number, QueryMatch>();

	for (const match of matches) {
		for (const capture of match.captures) {
			assert(capture.node.parent, 'i should worry about this now');

			const parentId = capture.node.parent.id;
			const parentNode = captureParents.get(parentId);
			if (!parentNode) {
				captureParents.set(parentId, match);
				continue;
			}

			parentNode.captures.push(capture);
			captureParents.set(parentId, parentNode);
		}
	}

	return Array.from(captureParents.values());
}
