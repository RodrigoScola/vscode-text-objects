import * as parser from 'web-tree-sitter';
import { JoinedPoint } from '../motions/position';

import assert from 'assert';
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

/** this is kinda dirty (in a good way)...  i dont know if i like it or not yet... */
function checkName(selectors: string[]): (cap: parser.QueryCapture) => boolean {
	return function (capture: parser.QueryCapture) {
		return selectors.includes(capture.name);
	};
}

// Function to filter the largest matches
export function filterDuplicates(matches: QueryMatch[], selectors: string[]): QueryMatch[] {
	const fn = checkName(selectors);

	const matchSelector = new Map<string, QueryMatch>();

	for (const match of matches) {
		if (!match.captures.some(fn)) {
			const first = match.captures[0];
			assert(first, 'first node came undefined?');

			matchSelector.set(first.node.text, match);
			continue;
		}

		for (const capture of match.captures) {
			if (selectors.includes(capture.name) && !matchSelector.has(capture.node.text)) {
				matchSelector.set(capture.node.text, match);
				break;
			}
		}
	}

	return Array.from(matchSelector.values());
}

export const pointPool = new NodePool<JoinedPoint>(function () {
	return {
		endIndex: 0,
		endPosition: { column: 0, row: 0 },
		startIndex: 0,
		startPosition: { column: 0, row: 0 },
	};
});

export function groupNodes(matches: parser.QueryMatch[]) {
	const nodes: JoinedPoint[] = [];

	for (const match of matches) {
		match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
		const firstNode = match.captures.at(0);
		const lastNode = match.captures.at(-1);

		if (!firstNode || !lastNode) {
			console.log('no first node or last');
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
		console.log('adding node', node);
		nodes.push(node);
	}

	return nodes;
}
