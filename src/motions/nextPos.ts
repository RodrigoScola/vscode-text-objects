import assert from 'assert';
import { Position } from 'vscode';
import { closerToZero } from '../utils/math';
import { JoinedPoint } from './selection';

export function nextPosition(
	nodes: JoinedPoint[],
	index: Position
): JoinedPoint | undefined {
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

		if (
			startDelta > 0 &&
			closerToZero(startDelta, closestDelta) === startDelta
		) {
			closestDelta = startDelta;
			closestNode = node;
		}
	}

	return closestNode;
}
