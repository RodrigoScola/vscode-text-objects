import * as parser from 'web-tree-sitter';

import assert from 'assert';
import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { NodePool } from '../utils';

const matchSelector = new Map<string, QueryMatch>();
export function filterDuplicates(matches: QueryMatch[], selector: string): QueryMatch[] {
	matchSelector.clear();

	for (const match of matches) {
		if (match.captures.length === 0) {
			continue;
		}
		if (!match.captures.some((capture) => capture.name === selector)) {
			const first = match.captures[0];
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
	const nodes: JoinedPoint[] = new Array(matches.length);
	let len = 0;

	for (const match of matches) {
		if (match.captures.length === 0) {
			continue;
		}

		// match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
		const first = match.captures.at(0)?.node;
		const last = match.captures.at(-1)?.node;

		assert(first && last, 'undefined first and last nodes');
		assert(first.startIndex <= last.startIndex, 'last needs to be after than first');

		let node = pointPool.get();
		assert(node, 'point node came undefined?');

		const top = before(
			before(first.startPosition, first.endPosition),
			before(last.startPosition, last.endPosition)
		);

		const bottom = after(
			after(first.startPosition, first.endPosition),
			after(last.startPosition, last.endPosition)
		);

		assert(top.row <= bottom.row, 'top needs to come first on line:' + top.row + ' ' + bottom.row);
		if (top.row === bottom.row) {
			assert(top.column <= bottom.column, 'top needs to come before bottom on character');
		}
		assert(
			top.column >= 0 && top.row >= 0 && bottom.column >= 0 && bottom.row >= 0,
			'invalid node positions'
		);

		node.start = top;
		node.end = bottom;

		nodes[len] = node;
		len++;
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
