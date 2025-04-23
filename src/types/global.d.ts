import { Position, Range } from 'vscode';
import Parser, { Language, QueryMatch } from 'web-tree-sitter';
import { Editor } from '../editor/editor';
import { Languages } from '../parsing/parser';

export {};

declare global {
	export type SupportedLanguages = keyof typeof Languages;
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
	export type CommandAction = 'select' | 'goTo' | 'delete' | 'yank' | 'change';

	export type Context = {
		editor: Editor;
		parsing: {
			parser: Parsing | undefined;
		};
		command: Command | null;
	};

	export type Parsing = {
		module: string;
		language: Language;
		parser: Parser;
	};
	export type CommandPosition = 'start' | 'end';

	export type Command = {
		selectors: Partial<Record<SupportedLanguages, Selector>>;
		currentSelector: Selector | undefined;
		name: CommandNames;
		scope: CommandScope;
		direction: CommandDirection;
		position: CommandPosition;
		action: CommandAction;
		onMatch?: OnMatchFunc;
		end: OnFinish;
		pos: GetPositionFunc;
	};

	export interface Selector {
		language: SupportedLanguages;
		query: string;
	}

	export type OnMatchFunc = (ctx: Context, matches: QueryMatch[]) => QueryMatch[];
	export type GetPositionFunc = (points: Range[], index: Position) => Range | undefined;

	export type OnFinish = (Ctx: Context, range: Range | undefined) => unknown;

	export type JoinedPoint = {
		start: Parser.Point;
		end: Parser.Point;
	};
}
