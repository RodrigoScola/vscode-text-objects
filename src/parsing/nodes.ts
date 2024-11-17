import * as parser from 'web-tree-sitter';
import { JoinedPoint } from '../motions/position';

import assert from 'assert';
import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { NodePool } from '../utils';

export function removeNamed(matches: QueryMatch[], selectors: string[]): QueryMatch[] {
	for (const match of matches) {
		match.captures = match.captures.filter((capture) => {
			return !selectors.includes(capture.name);
		});
	}

	return matches;
}

function getFunction(selector: string) {
	return (capture: parser.QueryCapture): boolean => {
		return capture.name === selector;
	};
}

const matchSelector = new Map<string, QueryMatch>();
export function filterDuplicates(matches: QueryMatch[], selector: string): QueryMatch[] {
	matchSelector.clear();

	// idk is a lot of work but idk i dont like the feeling of having random closures like that...
	//maybe i need to get in peace with myself
	const fn = getFunction(selector);

	for (const match of matches) {
		if (match.captures.length === 0) {
			continue;
		}
		if (!match.captures.some(fn)) {
			const first = match.captures[0];
			console.log(match.captures);
			assert(first, 'first node came undefined?');

			matchSelector.set(first.node.text, match);
			continue;
		}

		for (const capture of match.captures) {
			if (selector.includes(capture.name) && !matchSelector.has(capture.node.text)) {
				matchSelector.set(capture.node.text, match);
				break;
			}
		}
	}

	return Array.from(matchSelector.values());
}

export const pointPool = new NodePool<JoinedPoint>(function (): JoinedPoint {
	return {
		end: { column: 0, row: 0 },
		start: { column: 0, row: 0 },
	};
});

function before(a: parser.Point, b: parser.Point): parser.Point {
	if (a.row < b.row) {
		return a;
	} else if (a.row === b.row) {
		return a.column < b.column ? a : b;
	}
	return b;
}
function after(a: parser.Point, b: parser.Point): parser.Point {
	if (a.row < b.row) {
		return b;
	} else if (a.row === b.row) {
		return a.column < b.column ? b : a;
	}
	return a;
}

export function toNodes(matches: parser.QueryMatch[]): JoinedPoint[] {
	const nodes: JoinedPoint[] = [];

	for (const match of matches) {
		if (match.captures.length === 0) {
			continue;
		}
		match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
		const firstNode = match.captures.at(0);
		const lastNode = match.captures.at(-1);

		console.log(firstNode, lastNode);
		assert(firstNode && lastNode, 'undefined first and last nodes');
		assert(firstNode.node.startIndex <= lastNode.node.startIndex, 'last needs to be after than first');

		let node = pointPool.get();
		assert(node, 'point node came undefined?');

		const top = before(
			before(firstNode.node.startPosition, firstNode.node.endPosition),
			before(lastNode.node.startPosition, lastNode.node.endPosition)
		);

		const bottom = after(
			after(firstNode.node.startPosition, firstNode.node.endPosition),
			after(lastNode.node.startPosition, lastNode.node.endPosition)
		);

		node.start = top;
		node.end = bottom;

		nodes[nodes.length] = node;
	}

	assert(nodes.length === matches.length, 'is there a mismatch of things?');
	assert(nodes.every((n) => n !== null || n !== undefined, 'idk what happened'));

	return nodes;
}

export function toRange(nodes: JoinedPoint[]): Range[] {
	const arr: Range[] = new Array(nodes.length).fill(undefined);

	for (let i = 0; i < arr.length; i++) {
		const node = nodes[i];

		assert(node.start.column >= 0, 'cannot be less than 0, received: ' + node.start.column);

		arr[i] = new Range(
			new Position(node.start.row, node.start.column),
			new Position(node.end.row, node.end.column)
		);
	}

	//idk also doing another function outside seems too much now
	return arr.sort(function (a, b) {
		return a.start.isAfter(b.start) ? 1 : -1;
	});
}
