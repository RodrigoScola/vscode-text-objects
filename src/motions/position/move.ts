import { Position, Range } from 'vscode';

export function nextPosition(nodes: Range[], index: Position): Range | undefined {
	let closestRange: Range | undefined;

	for (let i = 0; i < nodes.length; i++) {
		const range = nodes[i];

		if (index.isAfterOrEqual(range.start)) {
			continue;
		}

		if (!closestRange || closestRange.start.isAfter(range.start)) {
			closestRange = range;
		}
	}

	return closestRange;
}

export function previousPos(nodes: Range[], index: Position): Range | undefined {
	let closestRange: Range | undefined;

	for (let i = nodes.length; i >= 0; i--) {
		const range = nodes[i];

		if (index.isBeforeOrEqual(range.start)) {
			continue;
		}

		if (!closestRange || closestRange.start.isBefore(range.start)) {
			closestRange = range;
		}
	}

	return closestRange;
}
