import assert from 'assert';
import { Position, Range } from 'vscode';

export function nextPos(nodes: Range[], index: Position): Range | undefined {
	assert(index.line >= 0, 'line is less than 0');
	assert(nodes.length <= 1000, 'better rethink my strategy');
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = 0; i < nodes.length; i++) {
		const range = nodes[i];
		assert(range, 'undefined range');

		if (
			range.start.line === index.line ||
			range.end.line === index.line ||
			(range.start.isBefore(index) && range.end.isBefore(index))
		) {
			continue;
		}

		if (!closestRange || closestRange.start.isAfter(range.start)) {
			closestRange = range;
			continue;
		}
	}

	return closestRange;
}

export function previousPos(nodes: Range[], index: Position): Range | undefined {
	assert(index.line >= 0, 'line is less than 0');
	console.assert(nodes.length <= 1000, 'better rethink my strategy');
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = 0; i < nodes.length; i++) {
		const range = nodes[i];

		if (
			range.start.line === index.line ||
			range.end.line === index.line ||
			(range.start.isAfter(index) && range.end.isAfter(index))
		) {
			continue;
		}

		if (!closestRange || closestRange.start.isBefore(range.start)) {
			closestRange = range;
		}
	}

	return closestRange;
}

