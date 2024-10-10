import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { editor } from '../extension';
import { filterLargestMatches, groupNodes } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import {
	closestPos,
	closestToLine,
	JoinedPoint,
	nextToPosition,
	select,
} from './selection';
import { GoQuery } from './selectors/go';
import { JsQuery } from './selectors/javascript';
import { JsonSelector } from './selectors/json';
import { TsSelector } from './selectors/typescript';

export function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}

export type QueryContext = {
	cursor: vscode.Position;
	text: string;
	language: SupportedLanguages;
};

export interface Selector {
	comments(): string;
	type(): string;
	function(): string;
	call(): string;
	innerCall(): string;
	parameters(): string;
	innerParameters(): string;
	innerFunction(): string;
	loop(): string;
	innerLoop(): string;
	conditional(): string;
	innerConditional(): string;
	rhs(): string;
	variables(): string;
	class(): string;
	innerClass(): string;
	array(): string;
	object(): string;
	string(): string;
	innerString(): string;
}

class SelectorFactory {
	private static selectors: Record<string, Selector> = {};
	static set(lang: SupportedLanguages, selector: Selector) {
		SelectorFactory.selectors[lang] = selector;
	}
	static get(lang: SupportedLanguages): Selector {
		assert(
			lang in SelectorFactory.selectors,
			`language ${lang} not found in selectors`
		);
		return SelectorFactory.selectors[lang];
	}
}

SelectorFactory.set('go', GoQuery);
SelectorFactory.set('javascript', JsQuery);
SelectorFactory.set('javascriptreact', JsQuery);
SelectorFactory.set('typescript', TsSelector);
SelectorFactory.set('typescriptreact', TsSelector);
SelectorFactory.set('json', JsonSelector);
SelectorFactory.set('jsonc', JsonSelector);

// there is a better way, could make a state class with all the current state of the extension
// just trying to prove the idea for now
let lastCommand: QueryCommand | undefined;
export function getLastExecCommand() {
	return lastCommand;
}

export class QueryCommand {
	readonly name: keyof Selector;
	readonly getPosition: (
		points: JoinedPoint[],
		index: vscode.Position
	) => JoinedPoint | undefined;

	private onMatch: ((matches: QueryMatch[]) => QueryMatch[]) | undefined;

	constructor(
		name: keyof Selector,
		getPosition: (
			points: JoinedPoint[],
			index: vscode.Position
		) => JoinedPoint | undefined,
		onMatch?: ((matches: QueryMatch[]) => QueryMatch[]) | undefined
	) {
		this.name = name;
		this.getPosition = getPosition;
		this.onMatch = onMatch;
	}

	async goTo(context: QueryContext) {
		const parser = await LanguageParser.get(context.language);
		assert(
			parser,
			'could not init parser for ' + context.language + 'language'
		);
		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name]();
		assert(selector, 'invalid query for ' + context.language);

		const query = parser.language.query(selector);
		let matches = query.matches(tree.rootNode);
		if (typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const position = nextToPosition(groupNodes(matches), context.cursor);

		if (!position) {
			return;
		}

		const startPos = new vscode.Position(
			position.startPosition.row,
			position.startPosition.column
		);

		const endPos = new vscode.Position(
			position.endPosition.row,
			position.endPosition.column
		);

		const ret = {
			start: startPos,
			end: endPos,
		};

		lastCommand = this;
		return ret;
	}
	async exec(context: QueryContext) {
		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name]();

		assert(selector, 'invalid selector for ' + context.language);

		const query = parser.language.query(selector);

		let matches = query.matches(tree.rootNode);

		if (typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const group = groupNodes(matches);

		const position = this.getPosition(group, context.cursor);

		if (!position) {
			return;
		}

		const startPos = new vscode.Position(
			position.startPosition.row,
			position.startPosition.column
		);

		const endPos = new vscode.Position(
			position.endPosition.row,
			position.endPosition.column
		);

		lastCommand = this;
		return {
			start: startPos,
			end: endPos,
		};
	}
}

async function getContext(
	currentEditor: vscode.TextEditor
): Promise<QueryContext> {
	const langName = currentEditor.document.languageId;
	const parser = await LanguageParser.get(currentEditor.document.languageId);
	assert(parser, `could not find parser for ${langName}`);
	return {
		text: currentEditor.document.getText(),
		cursor: currentEditor.selection.active,
		language: langName as SupportedLanguages,
	};
}
function InitSelect(
	name: string,
	command: QueryCommand,
	afterEnd: (position: {
		start: vscode.Position;
		end: vscode.Position;
	}) => unknown
) {
	return vscode.commands.registerCommand(name, async () => {
		const currentEditor = vscode.window.activeTextEditor;
		if (!currentEditor) {
			return;
		}
		editor.setEditor(currentEditor);
		const context = await getContext(currentEditor);
		const position = await command.exec(context);

		if (!position) {
			return;
		}

		afterEnd(position);
	});
}
export const commands = {
	function: new QueryCommand('function', closestToLine, function (matches) {
		return filterLargestMatches(matches);
	}),
	innerFunction: new QueryCommand('innerFunction', closestToLine),
	loop: new QueryCommand('loop', closestToLine),
	innerLoop: new QueryCommand('innerLoop', closestToLine),
	conditional: new QueryCommand('conditional', closestToLine),
	rhs: new QueryCommand('rhs', closestToLine),
	variables: new QueryCommand('variables', closestToLine),
	innerString: new QueryCommand('innerString', closestToLine),
	class: new QueryCommand('class', closestToLine),
	innerClass: new QueryCommand('innerClass', closestToLine),
	array: new QueryCommand('array', closestPos),
	object: new QueryCommand('object', closestPos),
	string: new QueryCommand('string', closestToLine),
	parameters: new QueryCommand('parameters', closestToLine),
	call: new QueryCommand('call', closestToLine),
	innerCall: new QueryCommand('innerCall', closestToLine),
	innerParameters: new QueryCommand('innerParameters', closestToLine),
	type: new QueryCommand('type', closestToLine),
};

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(commands)) {
		context.subscriptions.push(
			InitSelect(
				makeName(`select.${command.name}`),
				command,
				function (position) {
					select(
						position.start,
						position.end,
						editor.getEditor()
					);
				}
			)
		);
	}
}
