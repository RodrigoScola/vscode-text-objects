import assert from 'assert';
import * as vscode from 'vscode';
import { NODES } from '../constants';
import { editor } from '../extension';
import { filterDuplicates } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { closestPos, formatSelection, groupElements, nextPosition, previousPosition } from './position';
import selectClass from './queries/selectClass';
import selectInnerClass from './queries/selectInnerClass';
import selectInnerConditional from './queries/selectInnerConditional';
import selectInnerFunction from './queries/selectInnerFunction';
import selectInnerLhs from './queries/selectInnerLhs';
import selectInnerLoop from './queries/selectInnerLoop';
import selectInnerRhs from './queries/selectInnerRhs';
import selectInnerString from './queries/selectInnerString';
import selectLhs from './queries/selectLhs';
import selectConditional from './queries/selectOuterConditional';
import selectOuterFunction from './queries/selectOuterFunction';
import selectLoop from './queries/selectOuterLoop';
import selectRhs from './queries/selectRhs';
import selectString from './queries/selectString';
import selectVariable from './queries/selectVariables';
import { CommandNames, CommandScope, QueryCommand } from './QueryCommand';

export type QueryContext = {
	cursor: vscode.Position;
	text: string;
	language: SupportedLanguages;
};

export interface QuerySelector {
	language: SupportedLanguages;
	selector: string;
}

export function addSelectors(command: QueryCommand, funcs: Record<string, () => QuerySelector>) {
	for (const func of Object.values(funcs)) {
		command.addSelector(func());
	}
}
function newSelectNextCommand(scope: CommandScope, name: CommandNames) {
	return new QueryCommand({
		name,
		scope,
		direction: 'next',
		action: 'select',
		pos: closestPos,
	});
}

const selectOuterFunctionCommand = newSelectNextCommand('outer', 'function');
selectOuterFunctionCommand.onMatch = (matches) => filterDuplicates(matches, [NODES.FUNCTION]);

addSelectors(selectOuterFunctionCommand, selectOuterFunction);

const selectInnerFunctionCommand = newSelectNextCommand('inner', 'function');
selectInnerFunctionCommand.onMatch = groupElements;

addSelectors(selectInnerFunctionCommand, selectInnerFunction);

const selectOuterLoopCommand = newSelectNextCommand('outer', 'loop');

addSelectors(selectOuterLoopCommand, selectLoop);

const selectInnerLoopCommand = newSelectNextCommand('inner', 'loop');
selectInnerLoopCommand.onMatch = groupElements;

addSelectors(selectInnerLoopCommand, selectInnerLoop);

const selectouterConditionalCommand = newSelectNextCommand('outer', 'conditional');

addSelectors(selectouterConditionalCommand, selectConditional);

const selectInnerconditional = newSelectNextCommand('inner', 'conditional');
selectInnerconditional.onMatch = groupElements;

addSelectors(selectInnerconditional, selectInnerConditional);

const selectrhsCommand = newSelectNextCommand('outer', 'rhs');

addSelectors(selectrhsCommand, selectRhs);

const selectInnerRhsCommand = newSelectNextCommand('inner', 'rhs');

addSelectors(selectInnerRhsCommand, selectInnerRhs);

const selectlhsCommand = newSelectNextCommand('outer', 'lhs');

addSelectors(selectlhsCommand, selectLhs);

const selectInnerLhsCommand = newSelectNextCommand('inner', 'lhs');

addSelectors(selectInnerLhsCommand, selectInnerLhs);

const selectOuterVariableCommand = newSelectNextCommand('outer', 'variable');
addSelectors(selectOuterVariableCommand, selectVariable);

const selectOuterStringCommand = newSelectNextCommand('outer', 'string');
addSelectors(selectOuterStringCommand, selectString);

const selectInnerStringCommand = newSelectNextCommand('inner', 'string');
addSelectors(selectInnerStringCommand, selectInnerString);

const selectOuterClassCommand = newSelectNextCommand('outer', 'class');
addSelectors(selectOuterClassCommand, selectClass);

const selectInnerClassCommand = newSelectNextCommand('inner', 'class');
addSelectors(selectInnerClassCommand, selectInnerClass);

export const selectCommands = {
	function: selectOuterFunctionCommand,
	innerFunction: selectInnerFunctionCommand,
	loop: selectOuterLoopCommand,
	innerLoop: selectInnerLoopCommand,
	conditional: selectouterConditionalCommand,
	innerConditional: selectInnerconditional,
	rhs: selectrhsCommand,
	innerRhs: selectInnerRhsCommand,
	lhs: selectlhsCommand,
	innerLhs: selectInnerLhsCommand,
	variables: selectOuterVariableCommand,
	string: selectOuterStringCommand,
	innerString: selectInnerStringCommand,
	class: selectOuterClassCommand,
	innerclass: selectInnerClass,

	array: new QueryCommand({
		scope: 'outer',
		name: 'array',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	innerArray: new QueryCommand({
		scope: 'inner',
		name: 'array',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	object: new QueryCommand({
		scope: 'outer',
		name: 'object',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	innerObject: new QueryCommand({
		scope: 'inner',
		name: 'object',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	parameters: new QueryCommand({
		scope: 'outer',
		name: 'parameters',
		action: 'select',
		direction: 'next',
		pos: closestPos,
		onMatch: groupElements,
	}),
	call: new QueryCommand({
		scope: 'outer',
		name: 'call',
		action: 'select',
		direction: 'next',
		onMatch: groupElements,

		pos: closestPos,
	}),
	innerCall: new QueryCommand({
		scope: 'inner',
		name: 'call',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	innerParameters: new QueryCommand({
		scope: 'inner',
		name: 'parameters',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	type: new QueryCommand({
		scope: 'outer',
		name: 'type',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	innerType: new QueryCommand({
		scope: 'inner',
		name: 'type',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	comments: new QueryCommand({
		scope: 'outer',
		name: 'comment',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
	innerComment: new QueryCommand({
		scope: 'inner',
		name: 'comment',
		action: 'select',
		direction: 'next',
		pos: closestPos,
	}),
};

export const selectPreviousCommands = {
	function: new QueryCommand({ scope: 'outer', name: 'function', action: 'select', direction: 'previous' })
		.setGetPosition(previousPosition)
		.setOnMatch((matches) => filterDuplicates(matches, [NODES.FUNCTION])),
	innerFunction: new QueryCommand({
		scope: 'inner',
		name: 'function',
		action: 'select',
		direction: 'previous',
	})
		.setGetPosition(previousPosition)
		.setOnMatch(groupElements),
	loop: new QueryCommand({
		scope: 'outer',
		name: 'loop',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerLoop: new QueryCommand({
		scope: 'inner',
		name: 'loop',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	conditional: new QueryCommand({
		scope: 'outer',
		name: 'conditional',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerConditional: new QueryCommand({
		scope: 'inner',
		name: 'conditional',
		action: 'select',
		direction: 'previous',
	})
		.setGetPosition(previousPosition)
		//golang...
		.setOnMatch(groupElements),
	rhs: new QueryCommand({
		scope: 'outer',
		name: 'rhs',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerRhs: new QueryCommand({
		scope: 'inner',
		name: 'rhs',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	lhs: new QueryCommand({
		scope: 'outer',
		name: 'lhs',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerLhs: new QueryCommand({
		scope: 'inner',
		name: 'lhs',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	variables: new QueryCommand({
		scope: 'outer',
		name: 'variable',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerString: new QueryCommand({
		scope: 'inner',
		name: 'string',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	class: new QueryCommand({
		scope: 'outer',
		name: 'class',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerClass: new QueryCommand({
		scope: 'inner',
		name: 'class',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	array: new QueryCommand({
		scope: 'outer',
		name: 'array',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(closestPos),
	innerarray: new QueryCommand({
		scope: 'inner',
		name: 'array',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(closestPos),
	object: new QueryCommand({
		scope: 'outer',
		name: 'object',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(closestPos),
	innerObject: new QueryCommand({
		scope: 'inner',
		name: 'object',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(closestPos),
	string: new QueryCommand({
		scope: 'outer',
		name: 'string',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(closestPos),
	parameters: new QueryCommand({ scope: 'outer', name: 'parameters', action: 'select', direction: 'previous' })
		.setGetPosition(previousPosition)
		.setOnMatch(groupElements),
	call: new QueryCommand({ scope: 'outer', name: 'call', action: 'select', direction: 'previous' })
		.setGetPosition(previousPosition)
		.setOnMatch(groupElements),
	innerCall: new QueryCommand({
		scope: 'inner',
		name: 'call',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerParameters: new QueryCommand({
		scope: 'inner',
		name: 'parameters',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	type: new QueryCommand({
		scope: 'outer',
		name: 'type',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerType: new QueryCommand({
		scope: 'inner',
		name: 'type',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	comments: new QueryCommand({
		scope: 'outer',
		name: 'comment',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerComment: new QueryCommand({
		scope: 'inner',
		name: 'comment',
		action: 'select',
		direction: 'previous',
	}).setGetPosition(previousPosition),
};

export const GotoCommands = {
	function: new QueryCommand({ scope: 'outer', name: 'function', action: 'goTo', direction: 'next' })
		.setGetPosition(nextPosition)
		.setOnMatch((m) => filterDuplicates(m, [NODES.FUNCTION])),
	innerFunction: new QueryCommand({
		scope: 'inner',
		name: 'function',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	loop: new QueryCommand({ scope: 'outer', name: 'loop', action: 'goTo', direction: 'next' }).setGetPosition(
		nextPosition
	),
	innerLoop: new QueryCommand({
		scope: 'inner',
		name: 'loop',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	conditional: new QueryCommand({
		scope: 'outer',
		name: 'conditional',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	innerConditional: new QueryCommand({
		scope: 'inner',
		name: 'conditional',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	rhs: new QueryCommand({ scope: 'outer', name: 'rhs', action: 'goTo', direction: 'next' }).setGetPosition(
		nextPosition
	),
	innerRhs: new QueryCommand({
		scope: 'inner',
		name: 'rhs',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	lhs: new QueryCommand({ scope: 'outer', name: 'lhs', action: 'goTo', direction: 'next' }).setGetPosition(
		nextPosition
	),
	innerLhs: new QueryCommand({
		scope: 'inner',
		name: 'lhs',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	variables: new QueryCommand({
		scope: 'outer',
		name: 'variable',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	string: new QueryCommand({
		scope: 'outer',
		name: 'string',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	innerString: new QueryCommand({
		scope: 'inner',
		name: 'string',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	//bug on going to class
	class: new QueryCommand({ scope: 'outer', name: 'class', action: 'goTo', direction: 'next' }).setGetPosition(
		nextPosition
	),
	innerClass: new QueryCommand({
		scope: 'inner',
		name: 'class',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	array: new QueryCommand({ scope: 'outer', name: 'array', action: 'goTo', direction: 'next' }).setGetPosition(
		nextPosition
	),
	innerArray: new QueryCommand({
		scope: 'inner',
		name: 'array',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	object: new QueryCommand({
		scope: 'outer',
		name: 'object',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	innerObject: new QueryCommand({
		scope: 'inner',
		name: 'object',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	parameters: new QueryCommand({ scope: 'outer', name: 'parameters', action: 'goTo', direction: 'next' })
		.setGetPosition(nextPosition)
		.setOnMatch(groupElements),
	call: new QueryCommand({ scope: 'outer', name: 'call', action: 'goTo', direction: 'next' })
		.setOnMatch(groupElements)
		.setGetPosition(nextPosition),
	innerCall: new QueryCommand({ scope: 'inner', name: 'call', action: 'goTo', direction: 'next' })
		.setOnMatch(groupElements)
		.setGetPosition(nextPosition),
	innerParameters: new QueryCommand({ scope: 'inner', name: 'parameters', action: 'goTo', direction: 'next' })
		.setGetPosition(nextPosition)
		.setOnMatch(groupElements),
	type: new QueryCommand({ scope: 'outer', name: 'type', action: 'goTo', direction: 'next' }).setGetPosition(
		nextPosition
	),
	innerType: new QueryCommand({
		scope: 'inner',
		name: 'type',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	comments: new QueryCommand({
		scope: 'outer',
		name: 'comment',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
	innerComment: new QueryCommand({
		scope: 'inner',
		name: 'comment',
		action: 'goTo',
		direction: 'next',
	}).setGetPosition(nextPosition),
};
export const GotoPreviousCommands = {
	function: new QueryCommand({ scope: 'outer', name: 'function', action: 'goTo', direction: 'previous' })
		.setGetPosition(previousPosition)
		.setOnMatch((m) => filterDuplicates(m, [NODES.FUNCTION])),
	innerFunction: new QueryCommand({
		scope: 'inner',
		name: 'function',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	loop: new QueryCommand({
		scope: 'outer',
		name: 'loop',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerLoop: new QueryCommand({
		scope: 'inner',
		name: 'loop',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	conditional: new QueryCommand({
		scope: 'outer',
		name: 'conditional',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerConditional: new QueryCommand({
		scope: 'inner',
		name: 'conditional',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	rhs: new QueryCommand({ scope: 'outer', name: 'rhs', action: 'goTo', direction: 'previous' }).setGetPosition(
		previousPosition
	),
	innerRhs: new QueryCommand({
		scope: 'inner',
		name: 'rhs',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),

	lhs: new QueryCommand({ scope: 'outer', name: 'lhs', action: 'goTo', direction: 'previous' }).setGetPosition(
		previousPosition
	),
	innerLHS: new QueryCommand({
		scope: 'inner',
		name: 'lhs',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	variables: new QueryCommand({
		scope: 'outer',
		name: 'variable',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	string: new QueryCommand({
		scope: 'outer',
		name: 'string',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerString: new QueryCommand({
		scope: 'inner',
		name: 'string',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	//bug on going to class
	class: new QueryCommand({
		scope: 'outer',
		name: 'class',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerClass: new QueryCommand({
		scope: 'inner',
		name: 'class',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	array: new QueryCommand({
		scope: 'outer',
		name: 'array',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerArray: new QueryCommand({
		scope: 'inner',
		name: 'array',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	object: new QueryCommand({
		scope: 'outer',
		name: 'object',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerObject: new QueryCommand({
		scope: 'inner',
		name: 'object',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	parameters: new QueryCommand({ scope: 'outer', name: 'parameters', action: 'goTo', direction: 'previous' })
		.setGetPosition(previousPosition)
		.setOnMatch(groupElements),
	call: new QueryCommand({
		scope: 'outer',
		name: 'call',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerCall: new QueryCommand({ scope: 'inner', name: 'call', action: 'goTo', direction: 'previous' })
		.setOnMatch(groupElements)
		.setGetPosition(previousPosition),
	innerParameters: new QueryCommand({
		scope: 'inner',
		name: 'parameters',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	type: new QueryCommand({
		scope: 'outer',
		name: 'type',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innerType: new QueryCommand({
		scope: 'inner',
		name: 'type',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	comments: new QueryCommand({
		scope: 'outer',
		name: 'comment',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
	innercomment: new QueryCommand({
		scope: 'inner',
		name: 'comment',
		action: 'goTo',
		direction: 'previous',
	}).setGetPosition(previousPosition),
};

function goTo(position: { start: vscode.Position; end: vscode.Position }) {
	const ceditor = editor.getEditor();
	ceditor.selection = new vscode.Selection(position.start, position.start);
	ceditor.revealRange(new vscode.Range(position.start, position.start));
}

export function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}
export function initCommands() {
	//todo change this to the commands just be an array lol
	for (const command of Object.values(GotoCommands).concat(Object.values(GotoPreviousCommands))) {
		InitCommand(makeName(command.commandName()), (ctx) => command.select(ctx), goTo);
	}
	for (const command of Object.values(selectCommands).concat(Object.values(selectPreviousCommands))) {
		InitCommand(
			makeName(command.commandName()),
			(context) => command.select(context),
			function (position) {
				formatSelection(command, position.start, position.end, editor.getEditor());
			}
		);
	}
}

function InitCommand(
	name: string,
	execFunc: (context: QueryContext) => Promise<
		| {
				start: vscode.Position;
				end: vscode.Position;
		  }
		| undefined
	>,

	afterEnd: (position: { start: vscode.Position; end: vscode.Position }) => unknown
) {
	return vscode.commands.registerCommand(name, async () => {
		const currentEditor = vscode.window.activeTextEditor;
		if (!currentEditor) {
			return;
		}
		editor.setEditor(currentEditor);
		const context = await getContext(currentEditor);
		const position = await execFunc(context);

		if (!position) {
			return;
		}
		assert(position.start.isBeforeOrEqual(position.end), 'start is before end');

		afterEnd(position);
	});
}

async function getContext(currentEditor: vscode.TextEditor): Promise<QueryContext> {
	const langName = currentEditor.document.languageId;
	const parser = await LanguageParser.get(currentEditor.document.languageId);
	assert(parser, `could not find parser for ${langName}`);
	return {
		text: currentEditor.document.getText(),
		cursor: currentEditor.selection.active,
		language: langName as SupportedLanguages,
	};
}

export class CommandHistory {
	private static commands: QueryCommand[] = [];
	static last() {
		return CommandHistory.commands.at(-1);
	}

	static get(ind: number) {
		return CommandHistory.commands.at(ind);
	}
	static add(command: QueryCommand) {
		assert(command, 'this should never happen');
		CommandHistory.commands.push(command);
	}
}
