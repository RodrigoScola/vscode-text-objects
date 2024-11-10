import assert from 'assert';
import * as vscode from 'vscode';
import { NODES } from '../constants';
import { editor } from '../extension';
import { filterDuplicates } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { closestPos, formatSelection, groupElements, nextPosition, previousPosition } from './position';
import selectArray from './queries/select/Array';
import selectCall from './queries/select/call';
import selectClass from './queries/select/class';
import selectComment from './queries/select/comment';
import selectConditional from './queries/select/Conditional';
import selectOuterFunction from './queries/select/Function';
import selectInnerArray from './queries/select/innerArray';
import selectInnercall from './queries/select/innerCall';
import selectInnerClass from './queries/select/innerClass';
import selectInnerComment from './queries/select/innercomment';
import selectInnerConditional from './queries/select/innerConditional';
import selectInnerFunction from './queries/select/innerFunction';
import selectInnerLhs from './queries/select/innerLhs';
import selectInnerLoop from './queries/select/innerLoop';
import selectInnerObject from './queries/select/innerObject';
import selectInnerParams from './queries/select/innerParams';
import selectInnerRhs from './queries/select/innerRhs';
import selectInnerString from './queries/select/innerString';
import selectInnerType from './queries/select/innerType';
import selectLhs from './queries/select/Lhs';
import selectLoop from './queries/select/Loop';
import selectOuterObject from './queries/select/Object';
import selectParams from './queries/select/Params';
import selectRhs from './queries/select/Rhs';
import selectString from './queries/select/String';
import selectType from './queries/select/Type';
import selectVariable from './queries/select/Variables';
import { CommandNames, CommandScope, OnMatchFunc, QueryCommand } from './QueryCommand';

import goToArray from './queries/goTo/Array';
import goToCall from './queries/goTo/call';
import goToClass from './queries/goTo/class';
import goToComment from './queries/goTo/comment';
import goToConditional from './queries/goTo/Conditional';
import goToOuterFunction from './queries/goTo/Function';
import goToInnerArray from './queries/goTo/innerArray';
import goToInnercall from './queries/goTo/innerCall';
import goToInnerClass from './queries/goTo/innerClass';
import goToInnerComment from './queries/goTo/innercomment';
import goToInnerConditional from './queries/goTo/innerConditional';
import goToInnerFunction from './queries/goTo/innerFunction';
import goToInnerLhs from './queries/goTo/innerLhs';
import goToInnerLoop from './queries/goTo/innerLoop';
import goToInnerObject from './queries/goTo/innerObject';
import goToInnerParams from './queries/goTo/innerParams';
import goToInnerRhs from './queries/goTo/innerRhs';
import goToInnerString from './queries/goTo/innerString';
import goToInnerType from './queries/goTo/innerType';
import goToLhs from './queries/goTo/Lhs';
import goToLoop from './queries/goTo/Loop';
import goToOuterObject from './queries/goTo/Object';
import goToParams from './queries/goTo/Params';
import goToRhs from './queries/goTo/Rhs';
import goToString from './queries/goTo/String';
import goToType from './queries/goTo/type';
import goToVariable from './queries/goTo/variables';

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
		withMatchFunc(newSelectNextCommand('inner', 'conditional'), groupElements),
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
	addSelectors(newSelectNextCommand('outer', 'array'), selectArray),
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
	addSelectors(newSelectPreviousCommand('outer', 'array'), selectArray),
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
		goToOuterFunction
	),
	addSelectors(withMatchFunc(newGoToNextCommand('inner', 'function'), groupElements), goToInnerFunction),
	addSelectors(newGoToNextCommand('outer', 'loop'), goToLoop),
	addSelectors(withMatchFunc(newGoToNextCommand('inner', 'loop'), groupElements), goToInnerLoop),
	addSelectors(newGoToNextCommand('outer', 'conditional'), goToConditional),
	addSelectors(withMatchFunc(newGoToNextCommand('inner', 'conditional'), groupElements), goToInnerConditional),
	addSelectors(newGoToNextCommand('outer', 'rhs'), goToRhs),
	addSelectors(newGoToNextCommand('inner', 'rhs'), goToInnerRhs),
	addSelectors(newGoToNextCommand('outer', 'lhs'), goToLhs),
	addSelectors(newGoToNextCommand('inner', 'lhs'), goToInnerLhs),
	addSelectors(newGoToNextCommand('outer', 'variable'), goToVariable),
	addSelectors(newGoToNextCommand('outer', 'string'), goToString),
	addSelectors(newGoToNextCommand('inner', 'string'), goToInnerString),
	addSelectors(newGoToNextCommand('outer', 'class'), goToClass),
	addSelectors(newGoToNextCommand('inner', 'class'), goToInnerClass),
	addSelectors(newGoToNextCommand('outer', 'array'), goToArray),
	addSelectors(newGoToNextCommand('inner', 'array'), goToInnerArray),
	addSelectors(newGoToNextCommand('outer', 'object'), goToOuterObject),
	addSelectors(newGoToNextCommand('inner', 'object'), goToInnerObject),
	addSelectors(newGoToNextCommand('outer', 'parameters'), goToParams),
	addSelectors(newGoToNextCommand('inner', 'parameters'), goToInnerParams),
	addSelectors(newGoToNextCommand('outer', 'call'), goToCall),
	addSelectors(newGoToNextCommand('inner', 'call'), goToInnercall),
	addSelectors(newGoToNextCommand('outer', 'type'), goToType),
	addSelectors(newGoToNextCommand('inner', 'type'), goToInnerType),
	addSelectors(newGoToNextCommand('outer', 'comment'), goToComment),
	addSelectors(newGoToNextCommand('inner', 'comment'), goToInnerComment),

	//previous command

	addSelectors(
		withMatchFunc(newGoToPreviousCommand('outer', 'function'), (matches) =>
			filterDuplicates(matches, [NODES.FUNCTION])
		),
		goToOuterFunction
	),

	addSelectors(withMatchFunc(newGoToPreviousCommand('inner', 'function'), groupElements), goToInnerFunction),
	addSelectors(newGoToPreviousCommand('outer', 'loop'), goToLoop),
	addSelectors(newGoToPreviousCommand('inner', 'loop'), goToInnerLoop),
	addSelectors(newGoToPreviousCommand('outer', 'conditional'), goToConditional),
	addSelectors(
		withMatchFunc(newGoToPreviousCommand('inner', 'conditional'), groupElements),
		goToInnerConditional
	),
	addSelectors(newGoToPreviousCommand('outer', 'rhs'), goToRhs),
	addSelectors(newGoToPreviousCommand('inner', 'rhs'), goToInnerRhs),
	addSelectors(newGoToPreviousCommand('outer', 'lhs'), goToLhs),
	addSelectors(newGoToPreviousCommand('inner', 'lhs'), goToInnerLhs),
	addSelectors(newGoToPreviousCommand('outer', 'variable'), goToVariable),
	addSelectors(newGoToPreviousCommand('outer', 'string'), goToString),
	addSelectors(newGoToPreviousCommand('inner', 'string'), goToInnerString),
	addSelectors(newGoToPreviousCommand('outer', 'class'), goToClass),
	addSelectors(newGoToPreviousCommand('inner', 'class'), goToInnerClass),
	addSelectors(newGoToPreviousCommand('outer', 'array'), goToArray),
	addSelectors(newGoToPreviousCommand('inner', 'array'), goToInnerArray),
	addSelectors(newGoToPreviousCommand('outer', 'object'), goToOuterObject),
	addSelectors(newGoToPreviousCommand('inner', 'object'), goToInnerObject),
	addSelectors(newGoToPreviousCommand('inner', 'parameters'), goToInnerParams),
	addSelectors(withMatchFunc(newGoToPreviousCommand('outer', 'parameters'), groupElements), goToParams),
	addSelectors(withMatchFunc(newGoToPreviousCommand('outer', 'call'), groupElements), goToCall),
	addSelectors(newGoToPreviousCommand('inner', 'call'), goToInnercall),
	addSelectors(newGoToPreviousCommand('outer', 'type'), goToType),
	addSelectors(newGoToPreviousCommand('inner', 'type'), goToInnerType),
	addSelectors(newGoToPreviousCommand('outer', 'comment'), goToComment),
	addSelectors(newGoToPreviousCommand('inner', 'comment'), goToInnerComment),
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
