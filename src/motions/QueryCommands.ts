import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { filterLargestMatches, groupNodes } from '../parsing/nodes';
import { LanguageParser } from '../parsing/parser';
import { QueryContext, Selector, SelectorFactory } from './commands';
import {
	closestPos,
	groupElements,
	JoinedPoint,
	nextPosition,
	previousToLine,
} from './selection';

type OnMatchFunc = (matches: QueryMatch[]) => QueryMatch[];

type GetPositionFunc = (
	points: JoinedPoint[],
	index: vscode.Position
) => JoinedPoint | undefined;

export class QueryCommand {
	readonly name: keyof Selector;
	private getPosition: GetPositionFunc | undefined;

	constructor(name: keyof Selector) {
		this.name = name;
	}

	private onMatch: OnMatchFunc | undefined;

	setOnMatch(fn: OnMatchFunc) {
		assert(
			typeof this.onMatch === 'undefined',
			'cannot assign on match more than once'
		);
		this.onMatch = fn;
		return this;
	}

	setGetPosition(fn: GetPositionFunc) {
		assert(
			typeof this.getPosition === 'undefined',
			'cannot assign on get position more than once'
		);
		assert(fn, 'undefined function ?');
		this.getPosition = fn;
		return this;
	}
	async exec(context: QueryContext) {
		assert(this, 'this is undefined');

		assert(this.getPosition, 'get position function is undefined');
		CommandHistory.add(this);

		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name];
		assert(
			selector,
			this.name + ' is an invalid selector for ' + context.language
		);

		const query = parser.language.query(selector);
		assert(query, 'invalid query came out');

		let matches = query.matches(tree.rootNode);
		if (matches.length === 0) {
			return;
		}

		if (this.onMatch) {
			assert(
				typeof this.onMatch === 'function',
				'match function is function'
			);
			matches = this.onMatch(matches);
			assert(
				matches.length > 0,
				'needs to return an array of matches'
			);
		}
		const position = this.getPosition(
			groupNodes(matches),
			context.cursor
		);

		if (!position) {
			return;
		}
		assert(position.startPosition, 'needs to have an start');
		assert(position.endPosition, 'needs to have an end');
		const startPos = new vscode.Position(
			position.startPosition.row,
			position.startPosition.column
		);

		const endPos = new vscode.Position(
			position.endPosition.row,
			position.endPosition.column
		);

		return {
			start: startPos,
			end: endPos,
		};
	}
}

export const QueryCommands: Record<
	string,
	{
		select: QueryCommand;
		previous: QueryCommand;
		goTo: QueryCommand;
	}
> = {
	function: {
		select: new QueryCommand('outer.function')
			.setGetPosition(closestPos)
			.setOnMatch(function (matches) {
				return filterLargestMatches(matches);
			}),
		goTo: new QueryCommand('outer.function')
			.setGetPosition(nextPosition)
			.setOnMatch(function (matches) {
				return filterLargestMatches(matches);
			}),

		previous: new QueryCommand('outer.function')
			.setGetPosition(previousToLine)
			.setOnMatch(filterLargestMatches),
	},
	innerFunction: {
		select: new QueryCommand('inner.function').setGetPosition(closestPos),
		goTo: new QueryCommand('inner.function').setGetPosition(nextPosition),
		previous: new QueryCommand('inner.function').setGetPosition(
			previousToLine
		),
	},
	loop: {
		select: new QueryCommand('outer.loop').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.loop').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.loop').setGetPosition(
			previousToLine
		),
	},
	innerLoop: {
		select: new QueryCommand('inner.loop').setGetPosition(closestPos),
		goTo: new QueryCommand('inner.loop').setGetPosition(nextPosition),
		previous: new QueryCommand('inner.loop').setGetPosition(
			previousToLine
		),
	},
	conditional: {
		select: new QueryCommand('outer.conditional').setGetPosition(
			closestPos
		),
		goTo: new QueryCommand('outer.conditional').setGetPosition(
			nextPosition
		),
		previous: new QueryCommand('outer.conditional').setGetPosition(
			previousToLine
		),
	},
	innerConditional: {
		select: new QueryCommand('inner.conditional').setGetPosition(
			closestPos
		),
		goTo: new QueryCommand('inner.conditional').setGetPosition(
			nextPosition
		),
		previous: new QueryCommand('inner.conditional').setGetPosition(
			previousToLine
		),
	},
	rhs: {
		select: new QueryCommand('outer.rhs').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.rhs').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.rhs').setGetPosition(
			previousToLine
		),
	},
	variables: {
		select: new QueryCommand('outer.variable').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.variable').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.variable').setGetPosition(
			previousToLine
		),
	},
	string: {
		select: new QueryCommand('outer.string').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.string').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.string').setGetPosition(closestPos),
	},
	innerString: {
		select: new QueryCommand('inner.string').setGetPosition(closestPos),
		goTo: new QueryCommand('inner.string').setGetPosition(nextPosition),
		previous: new QueryCommand('inner.string').setGetPosition(
			previousToLine
		),
	},
	//bug on going to class
	class: {
		select: new QueryCommand('outer.class').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.class').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.class').setGetPosition(
			previousToLine
		),
	},
	innerClass: {
		select: new QueryCommand('inner.class').setGetPosition(closestPos),
		goTo: new QueryCommand('inner.class').setGetPosition(nextPosition),
		previous: new QueryCommand('inner.class').setGetPosition(
			previousToLine
		),
	},
	array: {
		select: new QueryCommand('outer.array').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.array').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.array').setGetPosition(closestPos),
	},
	object: {
		select: new QueryCommand('outer.object').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.object').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.object').setGetPosition(closestPos),
	},
	parameters: {
		select: new QueryCommand('outer.parameters').setGetPosition(
			closestPos
		),
		goTo: new QueryCommand('outer.parameters').setGetPosition(
			nextPosition
		),
		previous: new QueryCommand('outer.parameters').setGetPosition(
			previousToLine
		),
	},
	//think of a good keybind for call
	//make sure call works, at this moment dont know
	call: {
		select: new QueryCommand('outer.call').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.call').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.call').setGetPosition(
			previousToLine
		),
	},
	innerCall: {
		select: new QueryCommand('inner.call').setGetPosition(closestPos),
		goTo: new QueryCommand('inner.call').setGetPosition(nextPosition),
		previous: new QueryCommand('inner.call').setGetPosition(
			previousToLine
		),
	},
	innerParameters: {
		select: new QueryCommand('inner.parameters')
			.setGetPosition(closestPos)
			.setOnMatch(groupElements),
		goTo: new QueryCommand('inner.parameters')
			.setGetPosition(nextPosition)
			.setOnMatch(groupElements),
		previous: new QueryCommand('inner.parameters').setGetPosition(
			previousToLine
		),
	},
	type: {
		select: new QueryCommand('outer.type').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.type').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.type').setGetPosition(
			previousToLine
		),
	},
	innerType: {
		select: new QueryCommand('inner.type')
			.setGetPosition(closestPos)
			.setOnMatch(groupElements),
		goTo: new QueryCommand('inner.type').setGetPosition(nextPosition),
		previous: new QueryCommand('inner.type').setGetPosition(
			previousToLine
		),
	},
	comments: {
		select: new QueryCommand('outer.comment').setGetPosition(closestPos),
		goTo: new QueryCommand('outer.comment').setGetPosition(nextPosition),
		previous: new QueryCommand('outer.comment').setGetPosition(
			previousToLine
		),
	},
};

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
