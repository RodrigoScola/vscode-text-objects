import assert from 'assert';
import * as vscode from 'vscode';
import { closestPos, nextPosition, previousPosition } from '../parsing/position';
import { getConfig } from '../config';

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
		position:'start',
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

		position:'start',
		scope,
		selectors: {},
		currentSelector: undefined,
		direction: 'previous',
		action: 'select',
		pos: previousPosition,
		end: async (ctx, range) => {
			assert(ctx.editor.selectRange, 'select range is undefined');
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			await ctx.editor.selectRange(ctx, range);
		},
	};
}

export function createGoToPrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		scope: scope,
		name: name,
		position:'start',
		action: 'goTo',
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		pos: previousPosition,
		end: (ctx, range) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			if (!range) {
				return;
			}
			ctx.editor.goTo(ctx, range.start);
		},
	};
}
export function createGoToNext(scope: CommandScope, name: CommandNames): Command {
	return {
		scope: scope,
		name: name,
		position:'start',
		selectors: {},
		currentSelector: undefined,
		action: 'goTo',
		direction: 'next',
		pos: nextPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			if (!range) {
				return;
			}
			ctx.editor.goTo(ctx, range.start);
		},
	};
}
export function createGoToNextEnd(scope: CommandScope, name: CommandNames): Command {
	return {
		scope: scope,
		name: name,
		position:'end',
		selectors: {},
		currentSelector: undefined,
		action: 'goTo',
		direction: 'next',
		//todo: check to see if this is right
		pos: previousPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor.goTo, 'go to is undefined');
			if (!range) {
				return;
			}
			ctx.editor.goTo(ctx, range.start);
		},
	};
}

export function createDeleteNext(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		position:'start',
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'delete',
		pos: closestPos,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);

			if (getConfig().vimActive()) {
				vscode.commands.executeCommand('noop').then(() => {
					vscode.commands.executeCommand('extension.vim_delete');
				});
			} else {
				if (getConfig().copyOnDelete()) {
					vscode.commands.executeCommand('editor.action.clipboardCutAction');
				} else {
					vscode.commands.executeCommand('deleteRight');
				}
			}
		},
	};
}

export function createDeletePrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		position:'start',
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		action: 'delete',
		pos: previousPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);

			if (getConfig().vimActive()) {
				vscode.commands.executeCommand('noop').then(() => {
					vscode.commands.executeCommand('extension.vim_delete');
				});
			} else {
				if (getConfig().copyOnDelete()) {
					vscode.commands.executeCommand('editor.action.clipboardCutAction');
				} else {
					vscode.commands.executeCommand('deleteRight');
				}
			}
		},
	};
}

export function createYankNext(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,

		position:'start',
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'yank',
		pos: closestPos,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			if (!range) {
				return;
			}
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);

			if (getConfig().vimActive()) {
				//aparently  if you abstract this logic everything breaks
				//or it could be that im dumb
				vscode.commands.executeCommand('noop').then(() => {
					vscode.commands.executeCommand('vim.remap', {
						after: ['y'],
					});
				});
			} else {
				const doc = ctx.editor.getRange(
					range.start.line,
					range.start.character,
					range.end.line,
					range.end.character
				);
				const previousCursor = ctx.editor.cursor();
				const cursorRange = new vscode.Range(previousCursor, previousCursor);
				const ed = ctx.editor.getEditor();

				ed.selection = new vscode.Selection(range.start, range.end);
				ed.revealRange(range, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
				vscode.env.clipboard.writeText(doc).then(() => {
					ed.selection = new vscode.Selection(cursorRange.start, cursorRange.start);
					ed.revealRange(cursorRange, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
				});
			}
		},
	};
}

export function createYankPrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		position:'start',
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		action: 'yank',
		pos: previousPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
			if (!range) {
				return;
			}
			if (getConfig().vimActive()) {
				vscode.commands.executeCommand('noop').then(() => {
					vscode.commands.executeCommand('vim.remap', {
						after: ['y'],
					});
				});
			} else {
				const doc = ctx.editor.getRange(
					range.start.line,
					range.start.character,
					range.end.line,
					range.end.character
				);

				const ed = ctx.editor.getEditor();

				ed.selection = new vscode.Selection(range.start, range.end);
				ed.revealRange(range, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
				vscode.env.clipboard.writeText(doc);
			}
		},
	};
}

export function createChangeNext(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,

		position:'start',
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'change',
		pos: closestPos,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
			if (getConfig().vimActive()) {
				vscode.commands.executeCommand('noop').then(() => {
					vscode.commands.executeCommand('vim.remap', {
						after: ['c'],
					});
				});
			}
		},
	};
}

export function createChangePrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		position:'start',
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		action: 'change',
		pos: previousPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
			vscode.commands.executeCommand('noop').then(() => {
				vscode.commands.executeCommand('vim.remap', {
					after: ['c'],
				});
			});
		},
	};
}
