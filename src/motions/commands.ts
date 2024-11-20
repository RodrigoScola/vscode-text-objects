import assert from 'assert';
import * as vscode from 'vscode';
import { getConfig } from '../config';
import { filterDuplicates } from '../parsing/nodes';
import { LanguageParser } from '../parsing/parser';
import {
	createGoToNext,
	createGoToPrevious,
	createSelectNext,
	createSelectPrevious,
	withInnerStringModifier,
	withMatchFunc,
} from './commandModifiers';
import { groupElements } from './position';
import { select as selectOuterArray } from './queries/Array';
import Call from './queries/call';
import Class from './queries/class';
import Comment from './queries/comment';
import Conditional from './queries/Conditional';
import Function from './queries/Function';
import InnerArray from './queries/innerArray';
import InnerCall from './queries/innerCall';
import InnerClass from './queries/innerClass';
import InnerComment from './queries/innercomment';
import InnerConditional from './queries/innerConditional';
import InnerFunction from './queries/innerFunction';
import InnerLhs from './queries/innerLhs';
import InnerLoop from './queries/innerLoop';
import InnerNode from './queries/innerNode';
import InnerObject from './queries/innerObject';
import InnerParams from './queries/innerParams';
import InnerRhs from './queries/innerRhs';
import InnerStr from './queries/innerString';
import InnerType from './queries/innerType';
import Lhs from './queries/Lhs';
import Loop from './queries/Loop';
import Node from './queries/Node';
import OuterObject from './queries/Object';
import { select as Params } from './queries/Params';
import Rhs from './queries/Rhs';
import Str from './queries/String';
import Type from './queries/Type';
import Variable from './queries/Variables';

import { NODES } from '../constants';
import { getDefaultContext, updateCommand, updateContext } from '../context/context';
import { pointPool, toNodes as toPoint, toRange } from '../parsing/nodes';

function addSelector(command: Command, selector: Selector) {
	command.selectors[selector.language] = selector;
}

function getCommandName(command: Command): string {
	return `${command.action}.${command.direction}.${command.scope}.${command.name}`;
}

//make a better name

function assertSelector(ctx: Context, selector: Selector | undefined): asserts selector {
	const command = ctx.command;
	assert(command, 'invalid command?');
	assert(selector, 'invalid selector?');
	assert(selector.language === ctx.editor.language(), 'they are different languages');
	assert(selector, `${command.name} is an invalid selector for ${ctx.editor.language()}`);
}

async function executeCommand(ctx: Context) {
	const command = ctx.command;
	// console.group('inside');
	console.time('mysetup');
	assert(command, 'COMMAND IS NOT DEFINED?');
	assert(
		typeof command.currentSelector === 'undefined',
		'cannot have an existing selector at the beginning of another command'
	);

	const language = ctx.editor.language();
	ctx.parsing.parser = await LanguageParser.get(language);

	const parser = ctx.parsing.parser;
	assert(parser, `could not init parser for ${language}`);

	const tree = parser.parser.parse(ctx.editor.getText());

	const selector = command.selectors[language as SupportedLanguages];
	assertSelector(ctx, selector);
	command.currentSelector = selector;

	console.timeEnd('mysetup');
	console.time('parsing');

	const query = parser.language.query(selector.query);
	assert(query, 'invalid query came out???');

	console.timeEnd('parsing');
	let matches = query.matches(tree.rootNode);

	console.time('match');
	if (command.onMatch) {
		assert(typeof command.onMatch === 'function', 'match function is function');
		matches = command.onMatch(ctx, matches);
	}
	console.timeEnd('match');

	console.time('point');
	const points = toPoint(matches);
	console.timeEnd('point');

	console.time('range');
	const ranges = toRange(points);
	console.timeEnd('range');
	console.time('final');

	pointPool.retrieve(points);

	const pos = command.pos(ranges, ctx.editor.cursor());

	if (pos) {
		assert(pos.start.isBeforeOrEqual(pos.end), 'start needs to be first');
	}

	command.end(ctx, pos);
	console.timeEnd('final');
	// console.groupCollapsed('inside');
}

export function addSelectors(command: Command, funcs: Record<string, () => Selector>): Command {
	for (const func of Object.values(funcs)) {
		addSelector(command, func());
	}

	return command;
}

export const commands: Command[] = [
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'function'), function (_, matches) {
			return filterDuplicates(matches, NODES.FUNCTION);
		}),
		Function
	),
	addSelectors(withMatchFunc(createSelectNext('inner', 'function'), groupElements), InnerFunction),
	addSelectors(createSelectNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createSelectNext('inner', 'loop'), groupElements), InnerLoop),
	addSelectors(createSelectNext('outer', 'conditional'), Conditional),
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
		InnerConditional
	),
	addSelectors(createSelectNext('outer', 'rhs'), Rhs),
	addSelectors(createSelectNext('inner', 'rhs'), InnerRhs),
	addSelectors(createSelectNext('outer', 'lhs'), Lhs),
	addSelectors(createSelectNext('inner', 'lhs'), InnerLhs),
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'variable'), (_, matches) =>
			filterDuplicates(filterDuplicates(matches, 'variable'), 'declaration')
		),
		Variable
	),
	addSelectors(createSelectNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createSelectNext('inner', 'string')), InnerStr),
	addSelectors(
		withMatchFunc(createSelectNext('outer', 'class'), (_, matches) => filterDuplicates(matches, 'class')),
		Class
	),
	addSelectors(createSelectNext('inner', 'class'), InnerClass),
	addSelectors(createSelectNext('outer', 'array'), selectOuterArray),
	addSelectors(createSelectNext('inner', 'array'), InnerArray),
	addSelectors(createSelectNext('outer', 'object'), OuterObject),
	addSelectors(createSelectNext('inner', 'object'), InnerObject),

	addSelectors(withMatchFunc(createSelectNext('outer', 'parameters'), groupElements), Params),
	addSelectors(createSelectNext('inner', 'parameters'), InnerParams),
	addSelectors(createSelectNext('outer', 'call'), Call),
	addSelectors(createSelectNext('inner', 'call'), InnerCall),
	addSelectors(createSelectNext('outer', 'type'), Type),
	addSelectors(createSelectNext('inner', 'type'), InnerType),
	addSelectors(createSelectNext('outer', 'comment'), Comment),
	addSelectors(createSelectNext('inner', 'comment'), InnerComment),

	//previous command

	addSelectors(
		withMatchFunc(createSelectPrevious('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, NODES.FUNCTION)
		),
		Function
	),

	addSelectors(withMatchFunc(createSelectPrevious('inner', 'function'), groupElements), InnerFunction),
	addSelectors(createSelectPrevious('outer', 'loop'), Loop),
	addSelectors(createSelectPrevious('inner', 'loop'), InnerLoop),
	addSelectors(createSelectPrevious('outer', 'conditional'), Conditional),
	addSelectors(createSelectPrevious('inner', 'conditional'), InnerConditional),
	addSelectors(createSelectPrevious('outer', 'rhs'), Rhs),
	addSelectors(createSelectPrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createSelectPrevious('outer', 'lhs'), Lhs),
	addSelectors(createSelectPrevious('inner', 'lhs'), InnerLhs),
	addSelectors(createSelectPrevious('outer', 'variable'), Variable),
	addSelectors(createSelectPrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createSelectPrevious('inner', 'string')), InnerStr),
	addSelectors(createSelectPrevious('outer', 'class'), Class),
	addSelectors(createSelectPrevious('inner', 'class'), InnerClass),
	addSelectors(createSelectPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createSelectPrevious('inner', 'array'), InnerArray),
	addSelectors(createSelectPrevious('outer', 'object'), OuterObject),
	addSelectors(createSelectPrevious('inner', 'object'), InnerObject),
	addSelectors(createSelectPrevious('inner', 'parameters'), InnerParams),
	addSelectors(withMatchFunc(createSelectPrevious('outer', 'parameters'), groupElements), Params),
	addSelectors(withMatchFunc(createSelectPrevious('outer', 'call'), groupElements), Call),
	addSelectors(createSelectPrevious('inner', 'call'), InnerCall),
	addSelectors(createSelectPrevious('outer', 'type'), Type),
	addSelectors(createSelectPrevious('inner', 'type'), InnerType),
	addSelectors(createSelectPrevious('outer', 'comment'), Comment),
	addSelectors(createSelectPrevious('inner', 'comment'), InnerComment),

	addSelectors(
		withMatchFunc(createGoToNext('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, NODES.FUNCTION)
		),
		Function
	),
	// go to
	addSelectors(withMatchFunc(createGoToNext('inner', 'function'), groupElements), InnerFunction),
	addSelectors(createGoToNext('outer', 'loop'), Loop),
	addSelectors(withMatchFunc(createGoToNext('inner', 'loop'), groupElements), InnerLoop),
	addSelectors(createGoToNext('outer', 'conditional'), Conditional),
	addSelectors(withMatchFunc(createGoToNext('inner', 'conditional'), groupElements), InnerConditional),
	addSelectors(createGoToNext('outer', 'rhs'), Rhs),
	addSelectors(createGoToNext('inner', 'rhs'), InnerRhs),
	addSelectors(createGoToNext('outer', 'lhs'), Lhs),
	addSelectors(createGoToNext('inner', 'lhs'), InnerLhs),
	addSelectors(createGoToNext('outer', 'variable'), Variable),
	addSelectors(createGoToNext('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createGoToNext('inner', 'string')), InnerStr),
	addSelectors(createGoToNext('outer', 'class'), Class),
	addSelectors(createGoToNext('inner', 'class'), InnerClass),
	addSelectors(createGoToNext('outer', 'array'), selectOuterArray),
	addSelectors(createGoToNext('inner', 'array'), InnerArray),
	addSelectors(createGoToNext('outer', 'object'), OuterObject),
	addSelectors(createGoToNext('inner', 'object'), InnerObject),
	addSelectors(createGoToNext('outer', 'parameters'), Params),
	addSelectors(createGoToNext('inner', 'parameters'), InnerParams),
	addSelectors(createGoToNext('outer', 'call'), Call),
	addSelectors(createGoToNext('inner', 'call'), InnerCall),
	addSelectors(createGoToNext('outer', 'type'), Type),
	addSelectors(createGoToNext('inner', 'type'), InnerType),
	addSelectors(createGoToNext('outer', 'comment'), Comment),
	addSelectors(createGoToNext('inner', 'comment'), InnerComment),

	//previous command

	addSelectors(
		withMatchFunc(createGoToPrevious('outer', 'function'), (_, matches) =>
			filterDuplicates(matches, NODES.FUNCTION)
		),
		Function
	),

	addSelectors(withMatchFunc(createGoToPrevious('inner', 'function'), groupElements), InnerFunction),
	addSelectors(createGoToPrevious('outer', 'loop'), Loop),
	addSelectors(createGoToPrevious('inner', 'loop'), InnerLoop),
	addSelectors(createGoToPrevious('outer', 'conditional'), Conditional),
	addSelectors(withMatchFunc(createGoToPrevious('inner', 'conditional'), groupElements), InnerConditional),
	addSelectors(createGoToPrevious('outer', 'rhs'), Rhs),
	addSelectors(createGoToPrevious('inner', 'rhs'), InnerRhs),
	addSelectors(createGoToPrevious('outer', 'lhs'), Lhs),
	addSelectors(createGoToPrevious('inner', 'lhs'), InnerLhs),
	addSelectors(createGoToPrevious('outer', 'variable'), Variable),
	addSelectors(createGoToPrevious('outer', 'string'), Str),
	addSelectors(withInnerStringModifier(createGoToPrevious('inner', 'string')), InnerStr),
	addSelectors(createGoToPrevious('outer', 'class'), Class),
	addSelectors(createGoToPrevious('inner', 'class'), InnerClass),
	addSelectors(createGoToPrevious('outer', 'array'), selectOuterArray),
	addSelectors(createGoToPrevious('inner', 'array'), InnerArray),
	addSelectors(createGoToPrevious('outer', 'object'), OuterObject),
	addSelectors(createGoToPrevious('inner', 'object'), InnerObject),
	addSelectors(createGoToPrevious('inner', 'parameters'), InnerParams),
	addSelectors(withMatchFunc(createGoToPrevious('outer', 'parameters'), groupElements), Params),
	addSelectors(withMatchFunc(createGoToPrevious('outer', 'call'), groupElements), Call),
	addSelectors(createGoToPrevious('inner', 'call'), InnerCall),
	addSelectors(createGoToPrevious('outer', 'type'), Type),
	addSelectors(createGoToPrevious('inner', 'type'), InnerType),
	addSelectors(createGoToPrevious('outer', 'comment'), Comment),
	addSelectors(createGoToPrevious('inner', 'comment'), InnerComment),
];

if (getConfig().experimentalNode()) {
	commands.push(
		addSelectors(
			withMatchFunc(createSelectNext('outer', 'node'), function (ctx, matches) {
				const lang = ctx.editor.language();
				//javascript , typescript, javascriptreact, typescriptreact
				if (lang.includes('script')) {
					return filterDuplicates(
						filterDuplicates(filterDuplicates(matches, NODES.NODE), 'export'),
						NODES.EXPORT
					);
				}
				//java
				else if (lang.includes('java')) {
					return filterDuplicates(matches, 'inner');
				} else if (lang.includes('cpp')) {
					return filterDuplicates(filterDuplicates(matches, 'expression'), 'inner');
				} else if (lang === 'go') {
					//`(_ (_ (_ (_ (_ (_ (block) @inner ) @out ) @outer ) @outing ) @outest) @bro ) @lastone `,
					return filterDuplicates(
						filterDuplicates(filterDuplicates(matches, 'inner'), 'outer'),
						'node'
					);
				}
				return matches;
			}),
			Node
		),
		addSelectors(createSelectNext('inner', 'node'), InnerNode),

		addSelectors(createSelectPrevious('outer', 'node'), Node),
		addSelectors(createSelectPrevious('inner', 'node'), InnerNode),

		addSelectors(createGoToNext('outer', 'node'), Node),
		addSelectors(createGoToNext('inner', 'node'), InnerNode),

		addSelectors(createGoToPrevious('outer', 'node'), Node),
		addSelectors(createGoToPrevious('inner', 'node'), InnerNode)
	);
}

function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}

export function init() {
	for (const command of commands) {
		const name = makeName(getCommandName(command));
		console.log('initting', name);
		vscode.commands.registerCommand(name, async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}

			console.time('perf');

			console.time('setup');
			const ctx = getDefaultContext();
			updateContext(ctx);

			ctx.editor.setEditor(currentEditor);

			const language = ctx.editor.language();
			assert(language.length > 0, 'language came empty');

			const parser = await LanguageParser.get(language);
			assert(parser, `could not find parser for ${language}`);

			console.timeEnd('setup');
			ctx.parsing.parser = parser;
			updateCommand(command);

			console.time('command');
			await executeCommand(ctx);
			console.timeEnd('command');

			console.timeEnd('perf');
		});
	}
}
