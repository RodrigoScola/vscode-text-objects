import { Position, Range } from 'vscode';
import Parser, { Language, QueryMatch } from 'web-tree-sitter';
import { Editor } from '../extension';
import { QueryCommand } from '../motions/commands';
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

	export type QueryContext = {
		editor: Editor;
		parsing: {
			parser: Parsing | undefined;
		};
		command: QueryCommand | null;
	};

	export type Parsing = {
		module: string;
		language: Language;
		parser: Parser;
	};

	export interface QuerySelector {
		language: SupportedLanguages;
		selector: string;
	}

	export type OnMatchFunc = (ctx: QueryContext, matches: QueryMatch[]) => QueryMatch[];
	export type GetPositionFunc = (points: Range[], index: Position) => Range | undefined;

	export type OnFinish = (Ctx: QueryContext, range: Range | undefined) => unknown;

	export type JoinedPoint = {
		start: Parser.Point;
		end: Parser.Point;
	};
}
