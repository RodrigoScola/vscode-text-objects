import assert from 'assert';
import { Position, Range, Selection, TextEditor } from 'vscode';
import Parser, { QueryMatch } from 'web-tree-sitter';
import { QueryCommand } from '../QueryCommand';

export type JoinedPoint = {
	startPosition: Parser.Point;
	endPosition: Parser.Point;
	startIndex: number;
	endIndex: number;
};

//fix this one
export function previousPosition(nodes: Range[], index: Position): Range | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = nodes.length - 1; i >= 0; i--) {
		let isInside = false;
		const range = nodes[i];
		const next = nodes[i - 1];

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
		const range = nodes[i];

		let startDelta = range.start.isBefore(index);
		let endDelta = range.end.isBefore(index);

		if (startDelta && endDelta) {
			continue;
		}
		if (!closestRange) {
			closestRange = range;
			continue;
		}

		if (
			(closestRange.start.isAfter(range.start) && closestRange.end.isAfter(range.start)) ||
			(range.contains(index) && closestRange.contains(range))
		) {
			closestRange = range;
		}
	}

	return closestRange;
}

const greedyChars = [';', ','];
export function formatSelection(command: QueryCommand, startPos: Position, endPos: Position, editor: TextEditor) {
	// const cursor = editor.selection.active;

	const endLine = editor.document.getText(new Range(startPos, endPos));

	if (command.name === 'inner.string' && endLine.match(/['"`]/)) {
		startPos = new Position(startPos.line, startPos.character + 1);
		endPos = new Position(endPos.line, endPos.character - 1);
	}

	if (greedyChars.includes(endLine.at(-1)!)) {
		endPos = new Position(endPos.line, endPos.character + 1);
	}

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

// there is a better way, could make a state class with all the current state of the extension
// just trying to prove the idea for now
export function groupElements(matches: QueryMatch[]): QueryMatch[] {
	const captureParents = new Map<number, QueryMatch>();

	for (const match of matches) {
		for (const capture of match.captures) {
			const node = capture.node;
			assert(node.parent, 'i should worry about this now');

			const parentId = node.parent.id;
			const parentNode = captureParents.get(parentId);
			if (!parentNode) {
				captureParents.set(parentId, match);
				continue;
			}

			if (!parentNode.captures.some((s) => s.node.id === capture.node.id)) {
				parentNode.captures.push(capture);
			}
			captureParents.set(parentId, parentNode);
		}
	}

	return Array.from(captureParents.values());
}
