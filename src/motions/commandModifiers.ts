import assert from 'assert';
import * as vscode from 'vscode';
import { QueryCommand } from './commands';
import { closestPos, nextPosition, previousPosition } from './position';

export function withInnerStringModifier(command: QueryCommand): QueryCommand {
	const prevFinish = command.onFinish;

	command.onFinish = (context, range) => {
		if (!range) {
			return;
		}
		const start = range.start;
		const end = range.end;
		const line = context.editor.getRange(start.line, start.character, end.line, end.character);

		if (line.match(/['"`]/)) {
			range = new vscode.Range(
				new vscode.Position(range.start.line, range.start.character + 1),
				new vscode.Position(range.end.line, range.end.character - 1)
			);
		}

		assert(context.editor, 'editor is undefined');
		assert(
			typeof context.editor.selectRange !== 'function',
			'range selection is not a function, received:' + typeof context.editor.selectRange
		);

		prevFinish(context, range);
	};
	return command;
}

export function createSelectNext(scope: CommandScope, name: CommandNames) {
	return new QueryCommand({
		name,
		scope,
		direction: 'next',
		action: 'select',
		pos: closestPos,
		onFinish: (ctx, range) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
		},
	});
}
export function createSelectPrevious(scope: CommandScope, name: CommandNames) {
	return new QueryCommand({
		name,
		scope,
		direction: 'previous',
		action: 'select',
		pos: previousPosition,
		onFinish: (ctx, range) => {
			assert(ctx.editor.selectRange, 'select range is undefined');
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
		},
	});
}

export function createGoToPrevious(scope: CommandScope, name: CommandNames): QueryCommand {
	return new QueryCommand({
		scope: scope,
		name: name,
		action: 'goTo',
		direction: 'previous',
		pos: previousPosition,
		onFinish: (ctx, range) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			ctx.editor.goTo(ctx, range);
		},
	});
}
export function createGoToNext(scope: CommandScope, name: CommandNames): QueryCommand {
	return new QueryCommand({
		scope: scope,
		name: name,
		action: 'goTo',
		direction: 'next',
		pos: nextPosition,
		onFinish: (ctx, range) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			ctx.editor.goTo(ctx, range);
		},
	});
}
