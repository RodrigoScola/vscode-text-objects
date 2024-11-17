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

export function filterDuplicates(matches: QueryMatch[], selector: string): QueryMatch[] {
	const matchSelector = new Map<string, QueryMatch>();

	// idk is a lot of work but idk i dont like the feeling of having random closures like that...
	//maybe i need to get in peace with myself
	const fn = getFunction(selector);

	for (const match of matches) {
		if (!match.captures.some(fn)) {
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
		endIndex: 0,
		endPosition: { column: 0, row: 0 },
		startIndex: 0,
		startPosition: { column: 0, row: 0 },
	};
});

export function toNodes(matches: parser.QueryMatch[]): JoinedPoint[] {
	const nodes: JoinedPoint[] = [];

	for (const match of matches) {
		match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
		const firstNode = match.captures.at(0);
		const lastNode = match.captures.at(-1);

		if (!firstNode || !lastNode) {
			continue;
		}

		assert(firstNode.node.startPosition, 'needs to have a starting position');
		assert(firstNode.node.endPosition, 'needs to have an end position');

		let node = pointPool.get();
		assert(node, 'point node came undefined?');
		node.startPosition = firstNode.node.startPosition;
		node.endPosition = lastNode.node.endPosition;
		node.startIndex = firstNode.node.startIndex;
		node.endIndex = firstNode.node.endIndex;
		nodes.push(node);
	}

	return nodes;
}

export function toRange(nodes: JoinedPoint[]): Range[] {
	const arr: Range[] = new Array(nodes.length).fill(undefined);

	for (let i = 0; i < arr.length; i++) {
		const node = nodes[i];
		assert(node.startPosition.column >= 0, 'cannot be less than 0, received: ' + node.startPosition.column);

		arr[i] = new Range(
			new Position(node.startPosition.row, node.startPosition.column),
			new Position(node.endPosition.row, node.endPosition.column)
		);
	}

	//idk also doing another function outside seems too much now
	return arr.sort(function (a, b) {
		return a.start.isAfter(b.start) ? 1 : -1;
	});
}
