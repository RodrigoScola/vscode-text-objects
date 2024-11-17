import assert from 'assert';
import * as vscode from 'vscode';
import { getConfig } from '../config';
import { NODES } from '../constants';
import { filterDuplicates } from '../parsing/nodes';
import { LanguageParser } from '../parsing/parser';
import {
	createGoToNext,
	createGoToPrevious,
	createSelectNext,
	createSelectPrevious,
	withInnerStringModifier,
} from './commandModifiers';
import { groupElements } from './position';
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

import { getDefaultContext, updateContext } from '../context/context';
import { pointPool, toNodes as toPoint, toRange } from '../parsing/nodes';

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

export function addSelectors(command: QueryCommand, funcs: Record<string, () => QuerySelector>) {
	for (const func of Object.values(funcs)) {
		command.addSelector(func());
	}

	return command;
}

function withMatchFunc(command: QueryCommand, func: OnMatchFunc) {
	command.onMatch = func;
	return command;
}

export const commands: QueryCommand[] = [
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, NODES.FUNCTION);
		}),
		selectOuterFunction
	),
	addSelectors(withMatchFunc(createSelectNext('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(createSelectNext('outer', 'loop'), selectLoop),
	addSelectors(withMatchFunc(createSelectNext('inner', 'loop'), groupElements), selectInnerLoop),
	addSelectors(createSelectNext('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(createSelectNext('inner', 'conditional'), function (ctx, matches) {
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
	addSelectors(createSelectNext('outer', 'rhs'), selectRhs),
	addSelectors(createSelectNext('inner', 'rhs'), selectInnerRhs),
	addSelectors(createSelectNext('outer', 'lhs'), selectLhs),
	addSelectors(createSelectNext('inner', 'lhs'), selectInnerLhs),
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'variable'), (_, matches) =>
			filterDuplicates(matches, 'variable')
		),
		selectVariable
	),
	addSelectors(createSelectNext('outer', 'string'), selectString),
	addSelectors(withInnerStringModifier(createSelectNext('inner', 'string')), selectInnerString),
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'class'), (_, matches) => filterDuplicates(matches, 'class')),
		selectClass
	),
	addSelectors(createSelectNext('inner', 'class'), selectInnerClass),
	addSelectors(createSelectNext('outer', 'array'), selectOuterArray),
	addSelectors(createSelectNext('inner', 'array'), selectInnerArray),
	addSelectors(createSelectNext('outer', 'object'), selectOuterObject),
	addSelectors(createSelectNext('inner', 'object'), selectInnerObject),

	addSelectors(withMatchFunc(createSelectNext('outer', 'parameters'), groupElements), selectParams),
	addSelectors(createSelectNext('inner', 'parameters'), selectInnerParams),
	addSelectors(createSelectNext('outer', 'call'), selectCall),
	addSelectors(createSelectNext('inner', 'call'), selectInnercall),
	addSelectors(createSelectNext('outer', 'type'), selectType),
	addSelectors(createSelectNext('inner', 'type'), selectInnerType),
	addSelectors(createSelectNext('outer', 'comment'), selectComment),
	addSelectors(createSelectNext('inner', 'comment'), selectInnerComment),

	//previous command

	addSelectors(
		withMatchFunc(createSelectPrevious('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, NODES.FUNCTION)
		),
		selectOuterFunction
	),

	addSelectors(withMatchFunc(createSelectPrevious('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(createSelectPrevious('outer', 'loop'), selectLoop),
	addSelectors(createSelectPrevious('inner', 'loop'), selectInnerLoop),
	addSelectors(createSelectPrevious('outer', 'conditional'), selectConditional),
	addSelectors(createSelectPrevious('inner', 'conditional'), selectInnerConditional),
	addSelectors(createSelectPrevious('outer', 'rhs'), selectRhs),
	addSelectors(createSelectPrevious('inner', 'rhs'), selectInnerRhs),
	addSelectors(createSelectPrevious('outer', 'lhs'), selectLhs),
	addSelectors(createSelectPrevious('inner', 'lhs'), selectInnerLhs),
	addSelectors(createSelectPrevious('outer', 'variable'), selectVariable),
	addSelectors(createSelectPrevious('outer', 'string'), selectString),
	addSelectors(withInnerStringModifier(createSelectPrevious('inner', 'string')), selectInnerString),
	addSelectors(createSelectPrevious('outer', 'class'), selectClass),
	addSelectors(createSelectPrevious('inner', 'class'), selectInnerClass),
	addSelectors(createSelectPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createSelectPrevious('inner', 'array'), selectInnerArray),
	addSelectors(createSelectPrevious('outer', 'object'), selectOuterObject),
	addSelectors(createSelectPrevious('inner', 'object'), selectInnerObject),
	addSelectors(createSelectPrevious('inner', 'parameters'), selectInnerParams),
	addSelectors(withMatchFunc(createSelectPrevious('outer', 'parameters'), groupElements), selectParams),
	addSelectors(withMatchFunc(createSelectPrevious('outer', 'call'), groupElements), selectCall),
	addSelectors(createSelectPrevious('inner', 'call'), selectInnercall),
	addSelectors(createSelectPrevious('outer', 'type'), selectType),
	addSelectors(createSelectPrevious('inner', 'type'), selectInnerType),
	addSelectors(createSelectPrevious('outer', 'comment'), selectComment),
	addSelectors(createSelectPrevious('inner', 'comment'), selectInnerComment),

	addSelectors(
		withMatchFunc(createGoToNext('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, NODES.FUNCTION)
		),
		selectOuterFunction
	),
	// go to
	addSelectors(withMatchFunc(createGoToNext('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(createGoToNext('outer', 'loop'), selectLoop),
	addSelectors(withMatchFunc(createGoToNext('inner', 'loop'), groupElements), selectInnerLoop),
	addSelectors(createGoToNext('outer', 'conditional'), selectConditional),
	addSelectors(withMatchFunc(createGoToNext('inner', 'conditional'), groupElements), selectInnerConditional),
	addSelectors(createGoToNext('outer', 'rhs'), selectRhs),
	addSelectors(createGoToNext('inner', 'rhs'), selectInnerRhs),
	addSelectors(createGoToNext('outer', 'lhs'), selectLhs),
	addSelectors(createGoToNext('inner', 'lhs'), selectInnerLhs),
	addSelectors(createGoToNext('outer', 'variable'), selectVariable),
	addSelectors(createGoToNext('outer', 'string'), selectString),
	addSelectors(withInnerStringModifier(createGoToNext('inner', 'string')), selectInnerString),
	addSelectors(createGoToNext('outer', 'class'), selectClass),
	addSelectors(createGoToNext('inner', 'class'), selectInnerClass),
	addSelectors(createGoToNext('outer', 'array'), selectOuterArray),
	addSelectors(createGoToNext('inner', 'array'), selectInnerArray),
	addSelectors(createGoToNext('outer', 'object'), selectOuterObject),
	addSelectors(createGoToNext('inner', 'object'), selectInnerObject),
	addSelectors(createGoToNext('outer', 'parameters'), selectParams),
	addSelectors(createGoToNext('inner', 'parameters'), selectInnerParams),
	addSelectors(createGoToNext('outer', 'call'), selectCall),
	addSelectors(createGoToNext('inner', 'call'), selectInnercall),
	addSelectors(createGoToNext('outer', 'type'), selectType),
	addSelectors(createGoToNext('inner', 'type'), selectInnerType),
	addSelectors(createGoToNext('outer', 'comment'), selectComment),
	addSelectors(createGoToNext('inner', 'comment'), selectInnerComment),

	//previous command

	addSelectors(
		withMatchFunc(createGoToPrevious('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, NODES.FUNCTION)
		),
		selectOuterFunction
	),

	addSelectors(withMatchFunc(createGoToPrevious('inner', 'function'), groupElements), selectInnerFunction),
	addSelectors(createGoToPrevious('outer', 'loop'), selectLoop),
	addSelectors(createGoToPrevious('inner', 'loop'), selectInnerLoop),
	addSelectors(createGoToPrevious('outer', 'conditional'), selectConditional),
	addSelectors(
		withMatchFunc(createGoToPrevious('inner', 'conditional'), groupElements),
		selectInnerConditional
	),
	addSelectors(createGoToPrevious('outer', 'rhs'), selectRhs),
	addSelectors(createGoToPrevious('inner', 'rhs'), selectInnerRhs),
	addSelectors(createGoToPrevious('outer', 'lhs'), selectLhs),
	addSelectors(createGoToPrevious('inner', 'lhs'), selectInnerLhs),
	addSelectors(createGoToPrevious('outer', 'variable'), selectVariable),
	addSelectors(createGoToPrevious('outer', 'string'), selectString),
	addSelectors(withInnerStringModifier(createGoToPrevious('inner', 'string')), selectInnerString),
	addSelectors(createGoToPrevious('outer', 'class'), selectClass),
	addSelectors(createGoToPrevious('inner', 'class'), selectInnerClass),
	addSelectors(createGoToPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createGoToPrevious('inner', 'array'), selectInnerArray),
	addSelectors(createGoToPrevious('outer', 'object'), selectOuterObject),
	addSelectors(createGoToPrevious('inner', 'object'), selectInnerObject),
	addSelectors(createGoToPrevious('inner', 'parameters'), selectInnerParams),
	addSelectors(withMatchFunc(createGoToPrevious('outer', 'parameters'), groupElements), selectParams),
	addSelectors(withMatchFunc(createGoToPrevious('outer', 'call'), groupElements), selectCall),
	addSelectors(createGoToPrevious('inner', 'call'), selectInnercall),
	addSelectors(createGoToPrevious('outer', 'type'), selectType),
	addSelectors(createGoToPrevious('inner', 'type'), selectInnerType),
	addSelectors(createGoToPrevious('outer', 'comment'), selectComment),
	addSelectors(createGoToPrevious('inner', 'comment'), selectInnerComment),
];

if (getConfig().experimentalNode()) {
	commands.push(
		addSelectors(
			withMatchFunc(createSelectNext('outer', 'node'), function (ctx, matches) {
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
		addSelectors(createSelectNext('inner', 'node'), selectInnerNode),

		addSelectors(createSelectPrevious('outer', 'node'), selectNode),
		addSelectors(createSelectPrevious('inner', 'node'), selectInnerNode),

		addSelectors(createGoToNext('outer', 'node'), selectNode),
		addSelectors(createGoToNext('inner', 'node'), selectInnerNode),

		addSelectors(createGoToPrevious('outer', 'node'), selectNode),
		addSelectors(createGoToPrevious('inner', 'node'), selectInnerNode)
	);
}

function makeName(str: string) {
	return `vscode-textobjects.${str}`;
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
			updateContext(ctx);

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
