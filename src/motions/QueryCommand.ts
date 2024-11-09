import assert from 'assert';
import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { groupNodes, pointPool } from '../parsing/nodes';
import { LanguageParser } from '../parsing/parser';
import { QueryContext, Selector, SelectorFactory } from './commands';

let lastCommand: QueryCommand | undefined;
export function getLastExecCommand() {
	return lastCommand;
}

type OnMatchFunc = (matches: QueryMatch[], context: QueryContext) => QueryMatch[];
type GetPositionFunc = (points: Range[], index: Position) => Range | undefined;
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
		assert(typeof this.getPosition === 'undefined', 'cannot assign on get position more than once');
		assert(fn, 'undefined function ?');
		this.getPosition = fn;
		return this;
	}

	async select(context: QueryContext) {
		assert(this, 'this is undefined');
		assert(
			typeof this.getPosition === 'function',
			'this.getPosition is not a function, received:' + typeof this.getPosition
		);
		lastCommand = this;
		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name];

		// console.log(selector, context.language);
		assert(selector, this.name + ' is an invalid selector for ' + context.language);

		const query = parser.language.query(selector);
		assert(query, 'invalid query came out');

		let matches = query.matches(tree.rootNode);

		console.log('mlen', matches.length);

		if (this.onMatch) {
			assert(typeof this.onMatch === 'function', 'match function is function');
			matches = this.onMatch(matches, context);
			assert(matches.length > 0, 'needs to return an array of matches');
		}

		console.log('outlen', matches.length);
		const nodes = groupNodes(matches);
		console.log('grouped', nodes.length);

		console.log('grouped', nodes.length);

		const ranges = new Array(nodes.length)
			.fill(undefined)
			.map((_, index) => {
				const node = nodes[index];
				assert(
					node.startPosition.column >= 0,
					'cannot be less than 0, received: ' + node.startPosition.column
				);
				return new Range(
					new Position(node.startPosition.row, node.startPosition.column),
					new Position(node.endPosition.row, node.endPosition.column)
				);
			})
			.sort((a, b) => (a.start.isAfter(b.start) ? 1 : -1));

		while (nodes.length > 0) {
			pointPool.retrieve(nodes.pop()!);
		}
		console.log('ranges', ranges.length);

		const position = this.getPosition(ranges, context.cursor);
		if (!position) {
			return;
		}
		assert(position.start.isBeforeOrEqual(position.end), 'start needs to be first');

		return position;
	}
}
