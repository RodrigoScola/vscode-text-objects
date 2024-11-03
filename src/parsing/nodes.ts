import * as parser from 'web-tree-sitter';
import { JoinedPoint } from '../motions/position/selection';

import assert from 'assert';
import { QueryMatch } from 'web-tree-sitter';
import { NODES } from '../constants';
import { QueryContext } from '../motions/commands';
import { NodePool } from '../utils/pooling';

// Define a function to calculate the size of a match based on its start and end positions.
function getMatchSize(match: QueryMatch): number {
	const captures = match.captures;
	const startNode = captures[0].node.startIndex;
	const endNode = captures[captures.length - 1].node.endIndex;
	return endNode - startNode;
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
export function filterLargestMatches(matches: QueryMatch[], context: QueryContext): QueryMatch[] {
	if (context.language !== 'javascript') {
		return matches;
	}

	const idMap = new Map<number, QueryMatch>();

	return matches.reduce((filtered: QueryMatch[], match: QueryMatch) => {
		for (const cap of match.captures) {
			if (idMap.has(cap.node.id)) {
				return filtered;
			}
			idMap.set(cap.node.id, match);
			filtered.push(match);
			// return filtered;
		}

		if (exists(match.captures, 'anonymous_function')) {
			filtered.push(match);
			return filtered;
		}

		// Extract the function name (or unique identifier) from the match
		const functionName = exists(match.captures, NODES.FUNCTION_NAME)?.node.text || '';

		// Check if there is an existing match for the same function
		const existingMatch = filtered.find((f) => {
			const existingFunctionName = f.captures.find((capture) => capture.name === NODES.FUNCTION_NAME)?.node.text || '';
			return existingFunctionName === functionName;
		});

		if (!existingMatch) {
			filtered.push(match);
			return filtered;
		}

		// Calculate the sizes
		const existingSize = getMatchSize(existingMatch);
		const currentSize = getMatchSize(match);

		if (currentSize > existingSize) {
			return filtered.map((f) => {
				const existingFunctionName = f.captures.find((capture) => capture.name === NODES.FUNCTION_NAME)?.node.text || '';
				return existingFunctionName === functionName ? match : f;
			});
		}

		return filtered;
	}, []);
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
