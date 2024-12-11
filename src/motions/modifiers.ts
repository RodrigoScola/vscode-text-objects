import assert from 'assert';
import * as vscode from 'vscode';
import { closestPos, nextPosition, previousPosition } from '../parsing/position';
import { getConfig } from '../config';
import { start } from 'repl';

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

export function createDeleteNext(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'delete',
		pos: closestPos,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);

			if (getConfig().vimActive()) {
				ctx.editor.exec('noop').then(() => {
					ctx.editor.exec('extension.vim_delete');
				});
			} else {
				if (getConfig().copyOnDelete()) {
					ctx.editor.exec('editor.action.clipboardCutAction');
				} else {
					ctx.editor.exec('deleteRight');
				}
			}
		},
	};
}
export function createDeletePrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		action: 'delete',
		pos: previousPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);

			if (getConfig().vimActive()) {
				ctx.editor.exec('noop').then(() => {
					ctx.editor.exec('extension.vim_delete');
				});
			} else {
				if (getConfig().copyOnDelete()) {
					ctx.editor.exec('editor.action.clipboardCutAction');
				} else {
					ctx.editor.exec('deleteRight');
				}
			}
		},
	};
}

export function createYankNext(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
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
				ctx.editor.exec('noop').then(() => {
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

export function createYankPrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
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
				ctx.editor.exec('noop').then(() => {
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
		direction: 'next',
		selectors: {},
		currentSelector: undefined,
		action: 'change',
		pos: closestPos,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
			ctx.editor.exec('noop').then(() => {
				if (getConfig().vimActive()) {
					vscode.commands.executeCommand('vim.remap', {
						after: ['c'],
					});
				}
			});
		},
	};
}

export function createChangePrevious(scope: CommandScope, name: CommandNames): Command {
	return {
		name,
		scope,
		direction: 'previous',
		selectors: {},
		currentSelector: undefined,
		action: 'change',
		pos: previousPosition,
		end: (ctx: Context, range: vscode.Range | undefined) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
			ctx.editor.exec('noop').then(() => {
				vscode.commands.executeCommand('vim.remap', {
					after: ['c'],
				});
			});
		},
	};
}
