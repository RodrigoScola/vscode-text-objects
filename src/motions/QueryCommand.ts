import assert from 'assert';
import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { groupNodes, pointPool } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { QueryContext, QuerySelector } from './commands';

let lastCommand: QueryCommand | undefined;
export function getLastExecCommand() {
	return lastCommand;
}

type CommandNames =
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
	| 'string';

type CommandScope = 'inner' | 'outer';
type CommandDirection = 'next' | 'previous';
type CommandAction = 'select' | 'goTo';

type CommandProps = {
	name: CommandNames;
	scope: CommandScope;
	direction: CommandDirection;
	action: CommandAction;
	onMatch?: OnMatchFunc;
	pos: GetPositionFunc;
};

type OnMatchFunc = (matches: QueryMatch[], context: QueryContext) => QueryMatch[];
type GetPositionFunc = (points: Range[], index: Position) => Range | undefined;

export class QueryCommand {
	readonly name: CommandNames;
	private getPosition: GetPositionFunc | undefined;

	readonly scope: CommandScope;
	selectors: Partial<Record<SupportedLanguages, QuerySelector>>;

	readonly direction: CommandDirection;
	readonly action: CommandAction;
	private readonly onMatch: OnMatchFunc | undefined;

	constructor(props: CommandProps) {
		this.name = props.name;
		this.scope = props.scope;
		this.direction = props.direction;
		this.action = props.action;
		this.selectors = {};
		this.onMatch = props.onMatch;
		this.getPosition = props.pos;
	}

	addSelector(selector: QuerySelector) {
		this.selectors[selector.language] = selector;
		return this;
	}

	//make a better name
	commandName() {
		return `${this.action}.${this.direction}.${this.scope}.${this.name}`;
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

		const selector = this.selectors[context.language];

		assert(selector, this.name + ' is an invalid selector for ' + context.language);

		const query = parser.language.query(selector.selector);
		assert(query, 'invalid query came out');

		let matches = query.matches(tree.rootNode);

		if (this.onMatch) {
			assert(typeof this.onMatch === 'function', 'match function is function');
			matches = this.onMatch(matches, context);
			assert(matches.length > 0, 'needs to return an array of matches');
		}

		const nodes = groupNodes(matches);

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

		const position = this.getPosition(ranges, context.cursor);

		if (position) {
			assert(position.start.isBeforeOrEqual(position.end), 'start needs to be first');
		}

		return position;
	}
}
