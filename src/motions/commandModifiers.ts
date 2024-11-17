import assert from 'assert';
import * as vscode from 'vscode';
import { closestPos, nextPosition, previousPosition } from './position';

const strRegex = /['"`]/;

export function withInnerStringModifier(command: Command): Command {
	const next = command.end;

	command.end = function (context: Context, range: vscode.Range | undefined) {
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
export function withMatchFunc(command: Command, func: OnMatchFunc) {
	command.onMatch = func;
	return command;
}

export function createSelectNext(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'select',
		pos: closestPos,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
		},
	};
}
export function createSelectPrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		selectors: {},
		currentSelector: undefined,
		direction: 'previous',
		action: 'select',
		pos: previousPosition,
		end: (ctx, range) => {
			assert(ctx.editor.selectRange, 'select range is undefined');
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
		},
	};
}

export function createGoToPrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		scope: scope,
		name: name,
		action: 'goTo',
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		pos: previousPosition,
		end: (ctx, range) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			ctx.editor.goTo(ctx, range);
		},
	};
}
export function createGoToNext(scope: CommandScope, name: CommandNames): Command {
	return {
		scope: scope,
		name: name,
		selectors: {},
		currentSelector: undefined,
		action: 'goTo',
		direction: 'next',
		pos: nextPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			ctx.editor.goTo(ctx, range);
		},
	};
}
