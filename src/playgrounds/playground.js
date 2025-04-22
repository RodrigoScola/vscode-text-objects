export function a(b, c) {
	console.log(b);
	function d() {
		console.log(b);
		function e() {
			console.log(c);
		}
	}
	console.log('this');
}

export const d = function () {};

let g = {
	db: 3,
};

g = {
	db: 5,
};

function b() {
	console.log('');
}

function c() {}

a(3, 'asdfadf');

export class M {
	static asopidfj = 34;
}

import assert from 'assert';
import * as vscode from 'vscode';
import { closestPos, nextPosition, previousPosition } from '../parsing/position';
import { getConfig } from '../config';

const strRegex = /['"`]/;

export function withInnerStringModifier(command) {
	const next = command.end;

	command.end = function (context, range) {
		if (!range) {
			return;
		}
		const start = range.start;
		const end = range.end;
		const line = context.editor.getRange(start.line, start.character, end.line, end.character);

		if (line.match(strRegex)) {
			range = new vscode.Range(
				new vscode.Position(range.start.line, range.start.character + 1),
				new vscode.Position(range.end.line, range.end.character - 1)
			);
		}

		assert(context.editor, 'editor is undefined');
		assert(
			typeof context.editor.selectRange === 'function',
			'range selection is not a function, received:' + typeof context.editor.selectRange
		);

		next(context, range);
	};
	return command;
}
export function withMatchFunc(command, func) {
	command.onMatch = func;
	return command;
}

export function createSelectNext(scope, name) {
	return {
		name,
		scope,
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'select',
		pos: closestPos,
		end: (ctx, range) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
		},
	};
}
