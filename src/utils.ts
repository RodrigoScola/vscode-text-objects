import assert from 'assert';
import * as vscode from 'vscode';
import { getContext } from './context/context';

export function visualize(start: vscode.Range): void {
	assert(start, 'start needs to be defined');

	const ctx = getContext();
	assert(ctx, 'context is not defined');

	const ceditor = ctx.editor;
	assert(ceditor, 'editor is not present');

	ceditor.getEditor().revealRange(start);
	ceditor.getEditor().selection = new vscode.Selection(start.start, start.end); // Move cursor to that position
}

export class NodePool<T> {
	private nodes: T[];
	private createFunc: () => T;
	constructor(createFunc: () => T) {
		this.nodes = [];
		this.createFunc = createFunc;
	}
	get(): T {
		const node = this.nodes.pop();

		if (!node) {
			return this.createFunc();
		}
		return node;
	}
	retrieve(point: T | T[]) {
		if (!Array.isArray(point)) {
			this.nodes.push(point);
			return;
		}

		while (point.length > 0) {
			this.retrieve(point.pop()!);
		}
	}
}

export function closerToZero(a: number, b: number) {
	if (Math.abs(a) < Math.abs(b)) {
		return a;
	} else if (Math.abs(b) < Math.abs(a)) {
		return b;
	} else {
		return a; // or return b, since they are equally close to zero
	}
}
