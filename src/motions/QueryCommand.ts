import assert from 'assert';
import { Position, Range } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { pointPool, toNodes, toRange } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { QueryContext as Context, QuerySelector } from './commands';

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

export type OnMatchFunc = (ctx: Context, matches: QueryMatch[]) => QueryMatch[];
export type GetPositionFunc = (points: Range[], index: Position) => Range | undefined;

export type OnFinish = (Ctx: Context, range: Range | undefined) => unknown;

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

	async exec(ctx: Context) {
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

		const nodes = toNodes(matches);

		const ranges = toRange(nodes);

		while (nodes.length > 0) {
			pointPool.retrieve(nodes.pop()!);
		}

		const pos = this.getPosition(ranges, ctx.editor.cursor());

		if (pos) {
			assert(pos.start.isBeforeOrEqual(pos.end), 'start needs to be first');
		}

		this.onFinish(ctx, pos);
	}
}
