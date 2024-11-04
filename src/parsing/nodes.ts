import * as parser from 'web-tree-sitter';
import { JoinedPoint } from '../motions/position/selection';

import assert from 'assert';
import { QueryMatch } from 'web-tree-sitter';
import { NodePool } from '../utils/pooling';

// Define a function to calculate the size of a match based on its start and end positions.
function getMatchSize(match: QueryMatch): number {
	let minNode = Infinity;
	let maxNode = -Infinity;

	for (let i = 0; i < match.captures.length; i++) {
		const capture = match.captures[i];
		assert.ok(capture, 'invalid capture');
		if (capture.node.startIndex < minNode) {
			minNode = capture.node.startIndex;
		}

		if (capture.node.endIndex > maxNode) {
			maxNode = capture.node.endIndex;
		}
	}

	assert(maxNode >= minNode, 'they should never be less than one another');

	return maxNode - minNode;
}

function exists(captures: parser.QueryCapture[], name: string): parser.QueryCapture | undefined {
	for (const capture of captures) {
		if (capture.name === name) {
			return capture;
		}
	}
	return;
}

// Function to filter the largest matches
export function filterDuplicates(matches: QueryMatch[], selectors: string[]): QueryMatch[] {
	const matchSelector = new Map<string, QueryMatch>();

	for (const match of matches) {
		for (const capture of match.captures) {
			console.log(capture);

			if (selectors.includes(capture.name) && matchSelector.has(capture.node.text)) {
				console.log(`file: nodes.ts:49 ~ filterDuplicates ~ capture.node.text:`, capture.node.text);

				console.log(capture.name);
				console.log(matchSelector.get(capture.node.text));
			}

			if (selectors.includes(capture.name) && !matchSelector.has(capture.node.text)) {
				matchSelector.set(capture.node.text, match);
				break;
			}
		}
	}

	console.log(matches.length);
	console.log(matchSelector.size);

	return Array.from(matchSelector.values());
}

export const pointPool = new NodePool<JoinedPoint>(() => ({
	endIndex: 0,
	endPosition: { column: 0, row: 0 },
	startIndex: 0,
	startPosition: { column: 0, row: 0 },
}));

export function groupNodes(matches: parser.QueryMatch[]) {
	const nodes: JoinedPoint[] = [];

	for (const match of matches) {
		match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
		const firstNode = match.captures.at(0);
		const lastNode = match.captures.at(-1);

		assert(firstNode && lastNode, 'nodes came undefined on capture');
		assert(firstNode.node.startPosition, 'needs to have a starting position');
		assert(firstNode.node.endPosition, 'needs to have an end position');

		let node = pointPool.get();
		node.startPosition = firstNode.node.startPosition;
		node.endPosition = lastNode.node.endPosition;
		node.startIndex = firstNode.node.startIndex;
		node.endIndex = firstNode.node.endIndex;
		nodes.push(node);
	}

	console.assert(nodes.length < 200, 'should think of a pool');

	return nodes;
}
