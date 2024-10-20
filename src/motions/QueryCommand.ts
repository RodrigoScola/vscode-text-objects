import assert from 'assert';
import { Position } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { groupNodes } from '../parsing/nodes';
import { LanguageParser } from '../parsing/parser';
import { QueryContext, Selector, SelectorFactory } from './commands';
import { JoinedPoint, nextPosition } from './selection';

let lastCommand: QueryCommand | undefined;
export function getLastExecCommand() {
	return lastCommand;
}

type OnMatchFunc = (matches: QueryMatch[]) => QueryMatch[];
type GetPositionFunc = (points: JoinedPoint[], index: Position) => JoinedPoint | undefined;
export class QueryCommand {
	readonly name: keyof Selector;
	private getPosition: GetPositionFunc | undefined;

	constructor(name: keyof Selector) {
		this.name = name;
	}

	private onMatch: OnMatchFunc | undefined;

	setOnMatch(fn: OnMatchFunc) {
		assert(typeof this.onMatch === 'undefined', 'cannot assign on match more than once');
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

	async goTo(context: QueryContext) {
		lastCommand = this;
		const Parsing = await LanguageParser.get(context.language);
		assert(Parsing, 'could not init parser for ' + context.language + 'language');

		assert(context.text, 'cannot parse text that is not there');

		const tree = Parsing.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name];
		assert(selector, 'invalid query for ' + context.language);

		const query = Parsing.language.query(selector);
		let matches = query.matches(tree.rootNode);
		if (typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const position = nextPosition(groupNodes(matches), context.cursor);

		return this.makePosition(position);
	}

	async select(context: QueryContext) {
		assert(this, 'this is undefined');

		assert(this.getPosition, 'get position function is undefined');
		lastCommand = this;
		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name];
		assert(selector, this.name + ' is an invalid selector for ' + context.language);

		const query = parser.language.query(selector);
		assert(query, 'invalid query came out');

		let matches = query.matches(tree.rootNode);
		if (matches.length === 0) {
			return;
		}

		console.log('matches ->', matches.length);

		if (this.onMatch) {
			assert(typeof this.onMatch === 'function', 'match function is function');
			matches = this.onMatch(matches);
			assert(matches.length > 0, 'needs to return an array of matches');
		}

		// for (const match of matches) {
		// 	visualize(match.captures[0].node);
		// 	console.log('last');
		// }

		console.log('matches', matches.length);

		return this.makePosition(this.getPosition(groupNodes(matches), context.cursor));
	}
	private makePosition(position?: JoinedPoint) {
		if (!position) {
			return;
		}
		assert(position.startPosition, 'needs to have an start');
		assert(position.endPosition, 'needs to have an end');
		const startPos = new Position(position.startPosition.row, position.startPosition.column);

		const endPos = new Position(position.endPosition.row, position.endPosition.column);

		return {
			start: startPos,
			end: endPos,
		};
	}
}
