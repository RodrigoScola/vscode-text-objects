import { Position, Range } from 'vscode';
import Parser, { Language, QueryMatch } from 'web-tree-sitter';
import { Editor } from '../editor/editor';
import { Languages } from '../parsing/parser';
import { EditorContext } from '../editor/editorContext';

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
		extensionContext: EditorContext | null;
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

	export type EditorCommand = {
		command: string;
		title: string;
		when: string;
		f: () => void;
	};

	type KeyboardConfig = {
		array: string;
		call: string;
		class: string;
		comment: string;
		conditional: string;
		function: string;
		lhs: string;
		loop: string;
		node: string;
		object: string;
		rhs: string;
		parameters: string;
		string: string;
		type: string;
		variable: string;
	};

	type VimMotionConfig = {
		select: string;
		change: string;
		delete: string;
		yank: string;
	};

	type ScopeConfig = {
		inner: string;
		outer: string;
	};

	type VimKeyboardConfig = {
		'go to next start': string;
		'go to next end': string;
		'go to previous start': string;
		'go to previous end': string;
	} & KeyboardConfig &
		VimMotionConfig &
		ScopeConfig;

	type KeyboardMotionConfig = {
		'go to start': 'f';
		'go to end': 't';
		'select inner': 'n';
		'select outer': 's';
		'delete outer': 'd';
		'delete inner': 'x';
		'yank outer': 'y';
	};

	type DefaultKeyboardConfig = KeyboardMotionConfig & KeyboardConfig;

	export type KeyboardKeybind = {
		command: string;
		when: string;
		mac?: string;
		key?: string;
	};
}
