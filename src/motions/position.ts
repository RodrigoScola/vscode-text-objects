import assert from 'assert';
import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';

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

//fix this one
export function previousPosition(nodes: Range[], index: Position): Range | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = nodes.length - 1; i >= 0; i--) {
		let isInside = false;
		const range = nodes[i];
		const next = nodes[i - 1];

		if (
			(range.start.line === index.line || range.end.line === index.line) &&
			(!next || next.start.line !== index.line || next.end.line !== index.line)
		) {
			continue;
		}

		let startDelta = range.start.isAfter(index);
		let endDelta = range.end.isAfter(index);

		if (startDelta && endDelta) {
			continue;
		}
		if (!closestRange) {
			closestRange = range;
			continue;
		}

		if (range.contains(index)) {
			isInside = true;
		}

		if (isInside && closestRange.start.isBefore(range.start)) {
			closestRange = range;
			continue;
		}
	}

	return closestRange;
}
function line(range: Range, pos: Position): boolean {
	let truth = false;
	if (range.isSingleLine) {
		truth = range.start.line === pos.line;
	} else {
		truth = range.contains(pos);
	}
	// if (!range.isSingleLine) {
	// 	truth = range.start.line === pos.line || range.contains(pos);
	// }
	return truth;
}

export function closestPos(nodes: Range[], index: Position): Range | undefined {
	if (nodes.length === 0) {
		return undefined;
	}

	let closestRange: Range | undefined;

	for (let i = 0; i < nodes.length; i++) {
		const range = nodes[i];

		let startDelta = range.start.isBefore(index);
		let endDelta = range.end.isBefore(index);

		if (startDelta && endDelta) {
			continue;
		}
		if (!closestRange) {
			closestRange = range;
			continue;
		}

		// visualize(range);

		// console.log('after', closestRange.start.isAfter(range.start));
		// console.log('end', closestRange.end.isAfter(range.start));
		// console.log(
		// 	'rangecontains',
		// 	range.contains(index) || (range.isSingleLine ? range.start.line === index.line : false)
		// );
		// console.log('closestrangecontains', closestRange.contains(range));

		// const sameLine = range.start.line === index.line;
		const sameLine = line(range, index);

		if (
			(closestRange.start.isAfter(range.start) && closestRange.end.isAfter(range.start)) ||
			(sameLine && closestRange.contains(range))
		) {
			closestRange = range;
		}
	}

	return closestRange;
}

// there is a better way, could make a state class with all the current state of the extension
// just trying to prove the idea for now
export function groupElements(_: Context, matches: QueryMatch[]): QueryMatch[] {
	const captureParents = new Map<number, QueryMatch>();

	for (const match of matches) {
		for (const capture of match.captures) {
			const node = capture.node;
			assert(node.parent, 'i should worry about this now');

			const parentId = node.parent.id;
			const parentNode = captureParents.get(parentId);
			if (!parentNode) {
				captureParents.set(parentId, match);
				continue;
			}

			if (!parentNode.captures.some((s) => s.node.id === capture.node.id)) {
				parentNode.captures.push(capture);
			}
			captureParents.set(parentId, parentNode);
		}
	}

	return Array.from(captureParents.values());
}
