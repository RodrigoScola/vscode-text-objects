import assert from 'assert';
import * as vscode from 'vscode';
import { NODES } from '../constants';
import { editor } from '../extension';
import { filterDuplicates, removeNamed } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { closestPos, formatSelection, groupElements, nextPosition, previousPosition } from './position';
import { select as selectOuterArray } from './queries/Array';
import selectCall from './queries/call';
import selectClass from './queries/class';
import selectComment from './queries/comment';
import selectConditional from './queries/Conditional';
import selectOuterFunction from './queries/Function';
import selectInnerArray from './queries/innerArray';
import selectInnercall from './queries/innerCall';
import selectInnerClass from './queries/innerClass';
import selectInnerComment from './queries/innercomment';
import selectInnerConditional from './queries/innerConditional';
import selectInnerFunction from './queries/innerFunction';
import selectInnerLhs from './queries/innerLhs';
import selectInnerLoop from './queries/innerLoop';
import selectInnerObject from './queries/innerObject';
import selectInnerParams from './queries/innerParams';
import selectInnerRhs from './queries/innerRhs';
import selectInnerString from './queries/innerString';
import selectInnerType from './queries/innerType';
import selectLhs from './queries/Lhs';
import selectLoop from './queries/Loop';
import selectOuterObject from './queries/Object';
import { select as selectParams } from './queries/Params';
import selectRhs from './queries/Rhs';
import selectString from './queries/String';
import selectType from './queries/Type';
import selectVariable from './queries/Variables';

import { CommandNames, CommandScope, OnMatchFunc, QueryCommand } from './QueryCommand';

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

	return command;
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
function newSelectPreviousCommand(scope: CommandScope, name: CommandNames) {
	return new QueryCommand({
		name,
		scope,
		direction: 'previous',
		action: 'select',
		pos: previousPosition,
	});
}

function newGoToPreviousCommand(scope: CommandScope, name: CommandNames): QueryCommand {
	return new QueryCommand({
		scope: scope,
		name: name,
		action: 'goTo',
		direction: 'previous',
		pos: previousPosition,
	});
}
function newGoToNextCommand(scope: CommandScope, name: CommandNames): QueryCommand {
	return new QueryCommand({ scope: scope, name: name, action: 'goTo', direction: 'next', pos: nextPosition });
}

function withMatchFunc(command: QueryCommand, func: OnMatchFunc) {
	command.onMatch = func;
	return command;
}

export const selectCommands: QueryCommand[] = [
	addSelectors(
		withMatchFunc(newSelectNextCommand('outer', 'function'), (matches) =>
			filterDuplicates(matches, [NODES.FUNCTION])
		),
		selectOuterFunction
	),
	addSelectors(withMatchFunc(newSelectNextCommand('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(newSelectNextCommand('outer', 'loop'), selectLoop),
	addSelectors(withMatchFunc(newSelectNextCommand('inner', 'loop'), groupElements), selectInnerLoop),
	addSelectors(newSelectNextCommand('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(
			newSelectNextCommand('inner', 'conditional'),

			(matches) => removeNamed(matches, ['outer_statement'])
		),
		selectInnerConditional
	),
	addSelectors(newSelectNextCommand('outer', 'rhs'), selectRhs),
	addSelectors(newSelectNextCommand('inner', 'rhs'), selectInnerRhs),
	addSelectors(newSelectNextCommand('outer', 'lhs'), selectLhs),
	addSelectors(newSelectNextCommand('inner', 'lhs'), selectInnerLhs),
	addSelectors(newSelectNextCommand('outer', 'variable'), selectVariable),
	addSelectors(newSelectNextCommand('outer', 'string'), selectString),
	addSelectors(newSelectNextCommand('inner', 'string'), selectInnerString),
	addSelectors(newSelectNextCommand('outer', 'class'), selectClass),
	addSelectors(newSelectNextCommand('inner', 'class'), selectInnerClass),
	addSelectors(newSelectNextCommand('outer', 'array'), selectOuterArray),
	addSelectors(newSelectNextCommand('inner', 'array'), selectInnerArray),
	addSelectors(newSelectNextCommand('outer', 'object'), selectOuterObject),
	addSelectors(newSelectNextCommand('inner', 'object'), selectInnerObject),

	addSelectors(withMatchFunc(newSelectNextCommand('outer', 'parameters'), groupElements), selectParams),
	addSelectors(newSelectNextCommand('inner', 'parameters'), selectInnerParams),
	addSelectors(newSelectNextCommand('outer', 'call'), selectCall),
	addSelectors(newSelectNextCommand('inner', 'call'), selectInnercall),
	addSelectors(newSelectNextCommand('outer', 'type'), selectType),
	addSelectors(newSelectNextCommand('inner', 'type'), selectInnerType),
	addSelectors(newSelectNextCommand('outer', 'comment'), selectComment),
	addSelectors(newSelectNextCommand('inner', 'comment'), selectInnerComment),

	//previous command

	addSelectors(
		withMatchFunc(newSelectPreviousCommand('outer', 'function'), (matches) =>
			filterDuplicates(matches, [NODES.FUNCTION])
		),
		selectOuterFunction
	),

	addSelectors(
		withMatchFunc(newSelectPreviousCommand('inner', 'function'), groupElements),
		selectInnerFunction
	),
	addSelectors(newSelectPreviousCommand('outer', 'loop'), selectLoop),
	addSelectors(newSelectPreviousCommand('inner', 'loop'), selectInnerLoop),
	addSelectors(newSelectPreviousCommand('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(newSelectPreviousCommand('inner', 'conditional'), groupElements),
		selectInnerConditional
	),
	addSelectors(newSelectPreviousCommand('outer', 'rhs'), selectRhs),
	addSelectors(newSelectPreviousCommand('inner', 'rhs'), selectInnerRhs),
	addSelectors(newSelectPreviousCommand('outer', 'lhs'), selectLhs),
	addSelectors(newSelectPreviousCommand('inner', 'lhs'), selectInnerLhs),
	addSelectors(newSelectPreviousCommand('outer', 'variable'), selectVariable),
	addSelectors(newSelectPreviousCommand('outer', 'string'), selectString),
	addSelectors(newSelectPreviousCommand('inner', 'string'), selectInnerString),
	addSelectors(newSelectPreviousCommand('outer', 'class'), selectClass),
	addSelectors(newSelectPreviousCommand('inner', 'class'), selectInnerClass),
	addSelectors(newSelectPreviousCommand('outer', 'array'), selectOuterArray),
	addSelectors(newSelectPreviousCommand('inner', 'array'), selectInnerArray),
	addSelectors(newSelectPreviousCommand('outer', 'object'), selectOuterObject),
	addSelectors(newSelectPreviousCommand('inner', 'object'), selectInnerObject),
	addSelectors(newSelectPreviousCommand('inner', 'parameters'), selectInnerParams),
	addSelectors(withMatchFunc(newSelectPreviousCommand('outer', 'parameters'), groupElements), selectParams),
	addSelectors(withMatchFunc(newSelectPreviousCommand('outer', 'call'), groupElements), selectCall),
	addSelectors(newSelectPreviousCommand('inner', 'call'), selectInnercall),
	addSelectors(newSelectPreviousCommand('outer', 'type'), selectType),
	addSelectors(newSelectPreviousCommand('inner', 'type'), selectInnerType),
	addSelectors(newSelectPreviousCommand('outer', 'comment'), selectComment),
	addSelectors(newSelectPreviousCommand('inner', 'comment'), selectInnerComment),
];

export const goToCommands: QueryCommand[] = [
	addSelectors(
		withMatchFunc(newGoToNextCommand('outer', 'function'), (matches) =>
			filterDuplicates(matches, [NODES.FUNCTION])
		),
		selectOuterFunction
	),
	addSelectors(withMatchFunc(newGoToNextCommand('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(newGoToNextCommand('outer', 'loop'), selectLoop),
	addSelectors(withMatchFunc(newGoToNextCommand('inner', 'loop'), groupElements), selectInnerLoop),
	addSelectors(newGoToNextCommand('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(newGoToNextCommand('inner', 'conditional'), groupElements),
		selectInnerConditional
	),
	addSelectors(newGoToNextCommand('outer', 'rhs'), selectRhs),
	addSelectors(newGoToNextCommand('inner', 'rhs'), selectInnerRhs),
	addSelectors(newGoToNextCommand('outer', 'lhs'), selectLhs),
	addSelectors(newGoToNextCommand('inner', 'lhs'), selectInnerLhs),
	addSelectors(newGoToNextCommand('outer', 'variable'), selectVariable),
	addSelectors(newGoToNextCommand('outer', 'string'), selectString),
	addSelectors(newGoToNextCommand('inner', 'string'), selectInnerString),
	addSelectors(newGoToNextCommand('outer', 'class'), selectClass),
	addSelectors(newGoToNextCommand('inner', 'class'), selectInnerClass),
	addSelectors(newGoToNextCommand('outer', 'array'), selectOuterArray),
	addSelectors(newGoToNextCommand('inner', 'array'), selectInnerArray),
	addSelectors(newGoToNextCommand('outer', 'object'), selectOuterObject),
	addSelectors(newGoToNextCommand('inner', 'object'), selectInnerObject),
	addSelectors(newGoToNextCommand('outer', 'parameters'), selectParams),
	addSelectors(newGoToNextCommand('inner', 'parameters'), selectInnerParams),
	addSelectors(newGoToNextCommand('outer', 'call'), selectCall),
	addSelectors(newGoToNextCommand('inner', 'call'), selectInnercall),
	addSelectors(newGoToNextCommand('outer', 'type'), selectType),
	addSelectors(newGoToNextCommand('inner', 'type'), selectInnerType),
	addSelectors(newGoToNextCommand('outer', 'comment'), selectComment),
	addSelectors(newGoToNextCommand('inner', 'comment'), selectInnerComment),

	//previous command

	addSelectors(
		withMatchFunc(newGoToPreviousCommand('outer', 'function'), (matches) =>
			filterDuplicates(matches, [NODES.FUNCTION])
		),
		selectOuterFunction
	),

	addSelectors(withMatchFunc(newGoToPreviousCommand('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(newGoToPreviousCommand('outer', 'loop'), selectLoop),
	addSelectors(newGoToPreviousCommand('inner', 'loop'), selectInnerLoop),
	addSelectors(newGoToPreviousCommand('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(newGoToPreviousCommand('inner', 'conditional'), groupElements),
		selectInnerConditional
	),
	addSelectors(newGoToPreviousCommand('outer', 'rhs'), selectRhs),
	addSelectors(newGoToPreviousCommand('inner', 'rhs'), selectInnerRhs),
	addSelectors(newGoToPreviousCommand('outer', 'lhs'), selectLhs),
	addSelectors(newGoToPreviousCommand('inner', 'lhs'), selectInnerLhs),
	addSelectors(newGoToPreviousCommand('outer', 'variable'), selectVariable),
	addSelectors(newGoToPreviousCommand('outer', 'string'), selectString),
	addSelectors(newGoToPreviousCommand('inner', 'string'), selectInnerString),
	addSelectors(newGoToPreviousCommand('outer', 'class'), selectClass),
	addSelectors(newGoToPreviousCommand('inner', 'class'), selectInnerClass),
	addSelectors(newGoToPreviousCommand('outer', 'array'), selectOuterArray),
	addSelectors(newGoToPreviousCommand('inner', 'array'), selectInnerArray),
	addSelectors(newGoToPreviousCommand('outer', 'object'), selectOuterObject),
	addSelectors(newGoToPreviousCommand('inner', 'object'), selectInnerObject),
	addSelectors(newGoToPreviousCommand('inner', 'parameters'), selectInnerParams),
	addSelectors(withMatchFunc(newGoToPreviousCommand('outer', 'parameters'), groupElements), selectParams),
	addSelectors(withMatchFunc(newGoToPreviousCommand('outer', 'call'), groupElements), selectCall),
	addSelectors(newGoToPreviousCommand('inner', 'call'), selectInnercall),
	addSelectors(newGoToPreviousCommand('outer', 'type'), selectType),
	addSelectors(newGoToPreviousCommand('inner', 'type'), selectInnerType),
	addSelectors(newGoToPreviousCommand('outer', 'comment'), selectComment),
	addSelectors(newGoToPreviousCommand('inner', 'comment'), selectInnerComment),
];

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
	for (const command of goToCommands) {
		InitCommand(makeName(command.commandName()), (ctx) => command.select(ctx), goTo);
	}
	for (const command of selectCommands) {
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
