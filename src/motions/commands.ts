import assert from 'assert';
import { QueryOptions } from 'web-tree-sitter';
import { saveKeybinds, saveVimKeybinds, saveCommands, makeName } from '../configGeneration';
import * as vscode from 'vscode';
import { LanguageParser } from '../parsing/parser';
import {
	getChangePreviousCommands,
	getChangenextCommands,
	getDeleteNextCommands,
	getDeletePreviousCommands,
	getGoToNextEndCommands,
	getGoToPreviousCommands,
	getGoToPreviousEndCommands,
	getGotoNextStartCommands,
	getSelectNextCommands,
	getSelectPreviousCommands,
	getYankNextCommands,
	getYankPreviousCommands,
} from './commandFunctions';

import { getDefaultContext, updateCommand, updateContext } from '../context/context';
import { pointPool, toNodes as toPoint, toRange } from '../parsing/nodes';

function addSelector(command: Command, selector: Selector) {
	command.selectors[selector.language] = selector;
}

export function getCommandName(command: Command): string {
	return `${command.action}.${command.direction}.${command.scope}.${command.name}.${command.position}`;
}
export function getCommandNameWithoutPosition(command: Command): string {
	return `${command.action}.${command.direction}.${command.scope}.${command.name}`;
}

//make a better name

function assertSelector(ctx: Context, selector: Selector | undefined): asserts selector {
	const command = ctx.command;
	assert(command, 'invalid command?');
	assert(selector, `invalid selector for ${getCommandName(ctx.command!)}`);

	assert(selector.language === ctx.editor.language(), 'they are different languages');
}

function getOptions(ctx: Context): QueryOptions {
	assert(ctx.command, 'getting command options with an empty command');

	const opts: QueryOptions = {
		//could revise this but if hitting this is common. could say more about you than about this extension
		matchLimit: Math.max(300, ctx.editor.getEditor().document.lineCount * 3),
	};

	const cursor = ctx.editor.cursor();
	if (ctx.command.action === 'goTo' && ctx.command.direction === 'next') {
		opts.startPosition = {
			row: cursor.line,
			column: cursor.character,
		};
	} else if (ctx.command.action === 'goTo' && ctx.command.direction === 'previous') {
		opts.endPosition = {
			row: cursor.line,
			column: cursor.character,
		};
	}

	return opts;
}

function executeCommand(ctx: Context) {
	assert(ctx.parsing.parser, 'parser is not defined?');

	const command = ctx.command;
	// console.group('inside');
	assert(command, 'COMMAND IS NOT DEFINED?');

	const language = ctx.editor.language();

	const parser = ctx.parsing.parser;
	assert(parser, `could not init parser for ${language}`);

	const tree = parser.parser.parse(ctx.editor.getText());

	const selector = command.selectors[language as SupportedLanguages];
	assertSelector(ctx, selector);
	command.currentSelector = selector;

	const query = parser.language.query(selector.query);
	assert(query, 'invalid query came out???');

	let matches = query.matches(tree.rootNode, getOptions(ctx)).filter((c) => c.captures.length > 0);

	if (command.onMatch) {
		assert(typeof command.onMatch === 'function', 'match function is function');
		matches = command.onMatch(ctx, matches);
	}

	const points = toPoint(matches);
	const ranges = toRange(points);

	pointPool.retrieveAll(points);

	const pos = command.pos(ranges, ctx.editor.cursor());

	if (pos) {
		assert(pos.start.isBeforeOrEqual(pos.end), 'start needs to be first');
	}

	command.end(ctx, pos);
}

export function addSelectors(command: Command, funcs: Record<string, () => Selector>): Command {
	for (const func of Object.values(funcs)) {
		addSelector(command, func());
	}

	return command;
}

export const commands: Command[] = getSelectNextCommands()
	.concat(getGotoNextStartCommands())
	.concat(getGoToNextEndCommands())
	.concat(getGoToPreviousCommands())
	.concat(getGoToPreviousEndCommands())
	.concat(getSelectPreviousCommands())
	.concat(getDeleteNextCommands())
	.concat(getDeletePreviousCommands())
	.concat(getYankNextCommands())
	.concat(getYankPreviousCommands())
	.concat(getChangenextCommands())
	.concat(getChangePreviousCommands());

export async function setupCommand(command: Command) {
	const currentEditor = vscode.window.activeTextEditor;
	if (!currentEditor) {
		return;
	}

	const ctx = updateContext(getDefaultContext());

	ctx.editor.setEditor(currentEditor);

	const language = ctx.editor.language();
	assert(language.length > 0, 'language came empty');

	const parser = await LanguageParser.get(language);
	assert(parser, `could not find parser for ${language}`);

	ctx.parsing.parser = parser;
	updateCommand(command);

	executeCommand(ctx);
}
//doing this because the vscode.commands.getCommands() returns a promise, so this is to not slow down the start times
const installedCommands: Record<string, vscode.Disposable> = {};

export function init() {
	saveKeybinds(commands);
	saveCommands(commands);
	saveVimKeybinds(commands);

	for (const command of commands) {
		const name = makeName(getCommandName(command));
		const nameWithoutPosition = makeName(getCommandNameWithoutPosition(command));

		if (command.action === 'goTo' && !(nameWithoutPosition in installedCommands)) {
			const dis = vscode.commands.registerCommand(nameWithoutPosition, async () => {
				vscode.window.showWarningMessage(
					`${nameWithoutPosition} is now outdated, please update to [${name}] or update your configuration in https://github.com/RodrigoScola/vscode-text-objects/blob/main/vim_integration.md`
				);
			});

			installedCommands[nameWithoutPosition] = dis;
		}

		const disposable = vscode.commands.registerCommand(name, async () => {
			setupCommand(command);
		});

		installedCommands[name] = disposable;
	}
}

export function deactivate() {
	for (const command of Object.values(installedCommands)) {
		command.dispose();
	}
}
