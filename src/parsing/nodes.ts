import * as parser from 'web-tree-sitter';
import { visualize } from '../extension';
import { JoinedPoint } from '../motions/selection';

export function groupNodes(matches: parser.QueryMatch[]) {
	const nodes: JoinedPoint[] = [];

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

