import assert from 'assert';
import * as vscode from 'vscode';
import { NODES } from '../constants';
import { Editor } from '../extension';
import { filterDuplicates } from '../parsing/nodes';
import { LanguageParser, Parsing, SupportedLanguages } from '../parsing/parser';
import { closestPos, groupElements, nextPosition, previousPosition } from './position';
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
	editor: Editor;
	parsing: {
		parser: Parsing | undefined;
	};
	command: QueryCommand | null;
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
		onFinish: (ctx, range) => {
			assert(ctx.editor && typeof ctx.editor.selectRange === 'function', 'is this running another way');
			ctx.editor.selectRange(ctx, range);
		},
	});
}
function newSelectPreviousCommand(scope: CommandScope, name: CommandNames) {
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

function newGoToPreviousCommand(scope: CommandScope, name: CommandNames): QueryCommand {
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
function newGoToNextCommand(scope: CommandScope, name: CommandNames): QueryCommand {
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

function withMatchFunc(command: QueryCommand, func: OnMatchFunc) {
	command.onMatch = func;
	return command;
}

const innerStringCommand = addSelectors(newSelectNextCommand('inner', 'string'), selectInnerString);

innerStringCommand.onFinish = function (context: QueryContext, range: vscode.Range | undefined) {
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
	context.editor.selectRange(context, range);
};

export const commands: QueryCommand[] = [
	addSelectors(
		withMatchFunc(newSelectNextCommand('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, [NODES.FUNCTION])
		),
		selectOuterFunction
	),
	addSelectors(withMatchFunc(newSelectNextCommand('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(newSelectNextCommand('outer', 'loop'), selectLoop),
	addSelectors(withMatchFunc(newSelectNextCommand('inner', 'loop'), groupElements), selectInnerLoop),
	addSelectors(newSelectNextCommand('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(newSelectNextCommand('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			//including java && javascript
			if (!language.includes('java') && !language.includes('python')) {
				return groupElements(ctx, matches);
			}
			return matches;
		}),
		selectInnerConditional
	),
	addSelectors(newSelectNextCommand('outer', 'rhs'), selectRhs),
	addSelectors(newSelectNextCommand('inner', 'rhs'), selectInnerRhs),
	addSelectors(newSelectNextCommand('outer', 'lhs'), selectLhs),
	addSelectors(newSelectNextCommand('inner', 'lhs'), selectInnerLhs),
	addSelectors(
		withMatchFunc(newSelectNextCommand('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, ['variable'])
		),
		selectVariable
	),
	addSelectors(newSelectNextCommand('outer', 'string'), selectString),
	innerStringCommand,
	addSelectors(
		withMatchFunc(newSelectNextCommand('outer', 'class'), (_, matches) =>
			filterDuplicates(matches, ['class'])
		),
		selectClass
	),
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
		withMatchFunc(newSelectPreviousCommand('outer', 'function'), (_, matches) =>
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
	addSelectors(newSelectPreviousCommand('inner', 'conditional'), selectInnerConditional),
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

	addSelectors(
		withMatchFunc(newGoToNextCommand('outer', 'function'), (_, matches) =>
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
		withMatchFunc(newGoToPreviousCommand('outer', 'function'), (_, matches) =>
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

function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}

let context: QueryContext;

export function getContext(): QueryContext {
	return context;
}

export function init() {
	console.log('initting function');
	console.log(commands);
	for (const command of commands) {
		const name = makeName(command.commandName());
		console.log('initting', name);
		vscode.commands.registerCommand(name, async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}

			const ctx = getDefaultContext();
			context = ctx;
			ctx.editor.setEditor(currentEditor);

			const language = ctx.editor.language();
			const parser = await LanguageParser.get(language);
			assert(parser, `could not find parser for ${language}`);

			ctx.parsing.parser = parser;
			ctx.command = command;

			await ctx.command.exec(ctx);
		});
	}
}

function getDefaultContext(): QueryContext {
	return {
		editor: new Editor(),
		command: null,
		parsing: {
			parser: undefined,
		},
	};
}
