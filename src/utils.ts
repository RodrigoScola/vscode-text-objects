import assert from 'assert';
import * as vscode from 'vscode';
import { getContext } from './context/context';

export function visualize(start: vscode.Range): void {
	assert(start, 'start needs to be defined');

	const ctx = getContext();
	assert(ctx, 'context is not defined');

	const editor = ctx.editor.getEditor();
	assert(editor, 'editor is not present');

	editor.revealRange(start);
	editor.selection = new vscode.Selection(start.start, start.end); // Move cursor to that position
}

export class NodePool<T> {
	size: number;
	private nodes: T[];
	private createFunc: () => T;
	constructor(createFunc: () => T) {
		this.nodes = new Array();
		this.size = 0;
		this.createFunc = createFunc;
	}
	get(): T {
		const node = this.nodes.pop();

		if (!node) {
			this.size++;
			return this.createFunc();
		}
		this.size--;
		return node;
	}
	retrieveAll(point: T[]) {
		while (point.length > 0) {
			this.nodes[this.size] = point.pop()!;
			this.size++;
		}
	}
	retrieve(point: T) {
		this.nodes[this.size] = point;
		this.size++;
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
