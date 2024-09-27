import * as parser from 'web-tree-sitter';
import { visualize } from '../extension';
import { JoinedPoint } from '../motions/selection';

import { QueryMatch } from 'web-tree-sitter';

// Define a function to calculate the size of a match based on its start and end positions.
function getMatchSize(match: QueryMatch): number {
	const captures = match.captures;
	const startNode = captures[0].node.startIndex;
	const endNode = captures[captures.length - 1].node.endIndex;
	return endNode - startNode;
}

function exists(
	captures: parser.QueryCapture[],
	name: string
): parser.QueryCapture | undefined {
	for (const capture of captures) {
		if (capture.name === name) {
			return capture;
		}
	}
	return;
}

// Function to filter the largest matches
export function filterLargestMatches(
	matches: QueryMatch[],
	node_name: string
): QueryMatch[] {
	return matches.reduce((filtered: QueryMatch[], match: QueryMatch) => {
		// Extract the function name (or unique identifier) from the match
		const functionName =
			exists(match.captures, node_name)?.node.text || '';

		// Check if there is an existing match for the same function
		const existingMatch = filtered.find((f) => {
			const existingFunctionName =
				f.captures.find((capture) => capture.name === node_name)
					?.node.text || '';
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
				const existingFunctionName =
					f.captures.find(
						(capture) => capture.name === node_name
					)?.node.text || '';
				return existingFunctionName === functionName ? match : f;
			});
		}
		return filtered;
	}, []);
}

export function groupNodes(matches: parser.QueryMatch[]) {
	const nodes: JoinedPoint[] = [];
	console.log(matches);

	for (const match of matches) {
		match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
		const firstNode = match.captures.at(0);
		const lastNode = match.captures.at(-1);
		if (!firstNode || !lastNode) {
			continue;
		}
		const node = {
			startPosition: firstNode.node.startPosition,
			endPosition: lastNode.node.endPosition,
			startIndex: firstNode.node.startIndex,
			endIndex: firstNode.node.endIndex,
		};
		visualize(node, node);
		nodes.push(node);
	}
	return nodes;
}

