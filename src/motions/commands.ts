import assert from 'assert';
import * as vscode from 'vscode';
import { getConfig } from '../config';
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
import selectInnerNode from './queries/innerNode';
import selectInnerObject from './queries/innerObject';
import selectInnerParams from './queries/innerParams';
import selectInnerRhs from './queries/innerRhs';
import selectInnerString from './queries/innerString';
import selectInnerType from './queries/innerType';
import selectLhs from './queries/Lhs';
import selectLoop from './queries/Loop';
import selectNode from './queries/Node';
import selectOuterObject from './queries/Object';
import { select as selectParams } from './queries/Params';
import selectRhs from './queries/Rhs';
import selectString from './queries/String';
import selectType from './queries/Type';
import selectVariable from './queries/Variables';

import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { pointPool, toNodes as toPoint, toRange } from '../parsing/nodes';

export type CommandNames =
	| 'function'
	| 'comment'
	| 'type'
	| 'call'
	| 'parameters'
	| 'loop'
	| 'conditional'
	| 'variable'
	| 'rhs'
	| 'lhs'
	| 'class'
	| 'array'
	| 'object'
	| 'node'
	| 'string';

export type CommandScope = 'inner' | 'outer';
export type CommandDirection = 'next' | 'previous';
export type CommandAction = 'select' | 'goTo';

type CommandProps = {
	name: CommandNames;
	scope: CommandScope;
	direction: CommandDirection;
	action: CommandAction;
	onMatch?: OnMatchFunc;
	onFinish: OnFinish;
	pos: GetPositionFunc;
};

export type OnMatchFunc = (ctx: QueryContext, matches: QueryMatch[]) => QueryMatch[];
export type GetPositionFunc = (points: Range[], index: Position) => Range | undefined;

export type OnFinish = (Ctx: QueryContext, range: Range | undefined) => unknown;

export class QueryCommand {
	readonly name: CommandNames;
	private getPosition: GetPositionFunc | undefined;
	onFinish: OnFinish;

	readonly scope: CommandScope;
	selectors: Partial<Record<SupportedLanguages, QuerySelector>>;

	readonly direction: CommandDirection;
	readonly action: CommandAction;
	onMatch: OnMatchFunc | undefined;

	constructor(props: CommandProps) {
		this.name = props.name;
		this.scope = props.scope;
		this.direction = props.direction;
		this.action = props.action;
		this.selectors = {};
		this.onMatch = props.onMatch;
		this.getPosition = props.pos;
		this.onFinish = props.onFinish;
	}

	addSelector(selector: QuerySelector) {
		this.selectors[selector.language] = selector;
		return this;
	}

	//make a better name
	commandName() {
		return `${this.action}.${this.direction}.${this.scope}.${this.name}`;
	}

	async exec(ctx: QueryContext) {
		assert(this, 'this is undefined');
		assert(
			typeof this.getPosition === 'function',
			'this.getPosition is not a function, received:' + typeof this.getPosition
		);

		const language = ctx.editor.language();
		ctx.parsing.parser = await LanguageParser.get(language);

		const parser = ctx.parsing.parser;
		assert(parser, `could not init parser for ${language}`);

		const tree = parser.parser.parse(ctx.editor.getText());

		const selector = this.selectors[language as SupportedLanguages];
		assert(selector, `${this.name} is an invalid selector for ${language}`);

		const query = parser.language.query(selector.selector);
		assert(query, 'invalid query came out');

		let matches = query.matches(tree.rootNode);

		if (this.onMatch) {
			assert(typeof this.onMatch === 'function', 'match function is function');
			matches = this.onMatch(ctx, matches);
		}

		const points = toPoint(matches);

		const ranges = toRange(points);

		pointPool.retrieve(points);

		const pos = this.getPosition(ranges, ctx.editor.cursor());

		if (pos) {
			assert(pos.start.isBeforeOrEqual(pos.end), 'start needs to be first');
		}

		this.onFinish(ctx, pos);
	}
}

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

function innerStringFinish(_: QueryContext, range: vscode.Range | undefined) {
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
}

const selectPreviousInnerStringCommand = addSelectors(
	newSelectPreviousCommand('inner', 'string'),
	selectInnerString
);
const selectNextInnerStringCommand = addSelectors(newSelectNextCommand('inner', 'string'), selectInnerString);
const goToInnerStringCommand = addSelectors(newGoToNextCommand('inner', 'string'), selectInnerString);
const goToPreviousInnerString = addSelectors(newGoToPreviousCommand('inner', 'string'), selectInnerString);

goToPreviousInnerString.onFinish = innerStringFinish;
selectPreviousInnerStringCommand.onFinish = innerStringFinish;
goToInnerStringCommand.onFinish = innerStringFinish;
selectNextInnerStringCommand.onFinish = innerStringFinish;

export const commands: QueryCommand[] = [
	addSelectors(
		withMatchFunc(newSelectNextCommand('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, NODES.FUNCTION);
		}),
		selectOuterFunction
	),
	addSelectors(withMatchFunc(newSelectNextCommand('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(newSelectNextCommand('outer', 'loop'), selectLoop),
	addSelectors(withMatchFunc(newSelectNextCommand('inner', 'loop'), groupElements), selectInnerLoop),
	addSelectors(newSelectNextCommand('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(newSelectNextCommand('inner', 'conditional'), function (ctx, matches) {
			const language = ctx.editor.language();
			if (
				//java && javascript
				!language.includes('java') &&
				//javascript, javascriptreact, typescript, typescriptreact
				!language.includes('script') &&
				!language.includes('python')
			) {
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
			filterDuplicates(matches, 'variable')
		),
		selectVariable
	),
	addSelectors(newSelectNextCommand('outer', 'string'), selectString),
	selectNextInnerStringCommand,
	addSelectors(
		withMatchFunc(newSelectNextCommand('outer', 'class'), (_, matches) =>
			filterDuplicates(matches, 'class')
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
			filterDuplicates(matches, NODES.FUNCTION)
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
	selectPreviousInnerStringCommand,
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
			filterDuplicates(matches, NODES.FUNCTION)
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
			filterDuplicates(matches, NODES.FUNCTION)
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
	goToPreviousInnerString,
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

if (getConfig().experimentalNode()) {
	commands.push(
		addSelectors(
			withMatchFunc(newSelectNextCommand('outer', 'node'), function (ctx, matches) {
				const lang = ctx.editor.language();
				//javascript , typescript, javascriptreact, typescriptreact
				if (lang.includes('script')) {
					return filterDuplicates(
						filterDuplicates(filterDuplicates(matches, NODES.NODE), 'inner'),
						NODES.EXPORT
					);
				}
				//java
				else if (lang.includes('java')) {
					return filterDuplicates(matches, 'inner');
				} else if (lang.includes('cpp')) {
					return filterDuplicates(filterDuplicates(matches, 'expression'), 'inner');
				} else if (lang === 'go') {
					return filterDuplicates(filterDuplicates(matches, 'inner'), 'outer');
				}

				return matches;
			}),
			selectNode
		),
		addSelectors(newSelectNextCommand('inner', 'node'), selectInnerNode),

		addSelectors(newSelectPreviousCommand('outer', 'node'), selectNode),
		addSelectors(newSelectPreviousCommand('inner', 'node'), selectInnerNode),

		addSelectors(newGoToNextCommand('outer', 'node'), selectNode),
		addSelectors(newGoToNextCommand('inner', 'node'), selectInnerNode),

		addSelectors(newGoToPreviousCommand('outer', 'node'), selectNode),
		addSelectors(newGoToPreviousCommand('inner', 'node'), selectInnerNode)
	);
}

function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}

let context: QueryContext;

export function getContext(): QueryContext {
	return context;
}

export function init() {
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
			assert(language.length > 0, 'language came empty');

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
