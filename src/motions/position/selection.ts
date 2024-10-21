import assert from 'assert';
import { Position, Range, Selection, TextEditor } from 'vscode';
import Parser, { QueryMatch } from 'web-tree-sitter';
import { closerToZero } from '../../utils/math';

export type JoinedPoint = {
	startPosition: Parser.Point;
	endPosition: Parser.Point;
	startIndex: number;
	endIndex: number;
};

//fix this one
export function previousPos(nodes: Range[], index: Position): Range | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = 0; i < nodes.length; i++) {
		let isInside = false;
		const range = nodes[i];
		const next = nodes[i + 1];

		if (
			(range.start.line === index.line || range.end.line === index.line) &&
			(!next || next.start.line !== index.line || next.end.line !== index.line)
		) {
			continue;
		}

		let startDelta = range.start.isAfter(index);
		let endDelta = range.end.isAfter(index);

		if (startDelta && endDelta) {
			continue;
		}
		if (!closestRange) {
			closestRange = range;
			continue;
		}

		const closestDelta = closestRange!.start.line - index.line;

		if (range.contains(index)) {
			isInside = true;
		}

		if (isInside && closestRange.start.isBefore(range.start)) {
			closestRange = range;
			continue;
		}
	}

	return closestRange;
}

export function closestPos(nodes: Range[], index: Position): Range | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = 0; i < nodes.length; i++) {
		let isInside = false;
		const range = nodes[i];
		const next = nodes[i + 1];

		if (
			(range.start.line === index.line || range.end.line === index.line) &&
			(!next || next.start.line !== index.line || next.end.line !== index.line)
		) {
			return nodes[i];
		}

		let startDelta = range.start.isBefore(index);
		let endDelta = range.end.isBefore(index);

		if (startDelta && endDelta) {
			continue;
		}
		if (!closestRange) {
			closestRange = range;
			continue;
		}

		const closestDelta = closestRange!.start.line - index.line;

		if (range.contains(index)) {
			isInside = true;
		}

		if (isInside && closestRange.start.isAfter(range.start)) {
			closestRange = range;
			continue;
		}
	}

	return closestRange;
}
export function nextPosition(nodes: JoinedPoint[], index: Position): JoinedPoint | undefined {
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

		if (startDelta > 0 && closerToZero(startDelta, closestDelta) === startDelta) {
			closestDelta = startDelta;
			closestNode = node;
		}
	}

	return closestNode;
}

export function select(startPos: Position, endPos: Position, editor: TextEditor) {
	// const cursor = editor.selection.active;

	editor.selection = new Selection(startPos, endPos); // Move cursor to that position

	// const delta = Math.abs(cursor.line - editor.selection.active.line);

	// let revealType = TextEditorRevealType.InCenterIfOutsideViewport;

	// if (delta > editor.document.lineCount) {
	// 	revealType = TextEditorRevealType.InCenter;
	// }

	editor.revealRange(
		new Range(startPos, endPos)
		// revealType
	);

	return editor;
}

export function groupElements(matches: QueryMatch[]): QueryMatch[] {
	console.log('grouping elements');
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

function throws() {
	throw new Error('this throws');
}

