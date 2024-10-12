import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { editor } from '../extension';
import { filterLargestMatches, groupNodes } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { nextPosition } from './nextPos';
import {
	closestPos,
	closestToLine,
	JoinedPoint,
	previousToLine,
	select,
} from './selection';
import { GoQuery } from './selectors/go';
import { JsQuery } from './selectors/javascript';
import { JsonSelector } from './selectors/json';
import { TsSelector } from './selectors/typescript';

/**
 * this
 */
//toggle this coommme
//toggle this coommme
//toggle this coommme
//toggle this coommme
//toggle this coommme
//toggle this coommme

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
	innerType(): string;
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

		const position = nextPosition(groupNodes(matches), context.cursor);

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
	async select(context: QueryContext) {
		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name]();

		assert(
			selector,
			this.name + ' is an invalid selector for ' + context.language
		);

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

export const commands = {
	function: new QueryCommand('function', closestToLine, function (matches) {
		return filterLargestMatches(matches);
	}),
	innerFunction: new QueryCommand('innerFunction', closestToLine),
	loop: new QueryCommand('loop', closestToLine),
	innerLoop: new QueryCommand('innerLoop', closestToLine),
	conditional: new QueryCommand('conditional', closestPos),
	rhs: new QueryCommand('rhs', closestToLine),
	variables: new QueryCommand('variables', closestToLine),
	innerString: new QueryCommand('innerString', closestToLine),
	//bug on going to class
	class: new QueryCommand('class', closestToLine),
	innerClass: new QueryCommand('innerClass', closestToLine),
	array: new QueryCommand('array', closestPos),
	object: new QueryCommand('object', closestPos),
	string: new QueryCommand('string', closestToLine),
	parameters: new QueryCommand('parameters', closestToLine),
	//think of a good keybind for call
	//make sure call works, at this moment dont know
	call: new QueryCommand('call', closestToLine),
	innerCall: new QueryCommand('innerCall', closestToLine),
	innerParameters: new QueryCommand('innerParameters', closestToLine),
	type: new QueryCommand('type', closestToLine),
	comments: new QueryCommand('comments', closestToLine),
	innerConditional: new QueryCommand('innerConditional', closestToLine),
	innerType: new QueryCommand('innerType', closestToLine),
};

export const previousCommands = {
	function: new QueryCommand('function', previousToLine, function (matches) {
		return filterLargestMatches(matches);
	}),
	innerFunction: new QueryCommand('innerFunction', previousToLine),
	loop: new QueryCommand('loop', previousToLine),
	innerLoop: new QueryCommand('innerLoop', previousToLine),
	conditional: new QueryCommand('conditional', previousToLine),
	rhs: new QueryCommand('rhs', previousToLine),
	variables: new QueryCommand('variables', previousToLine),
	innerString: new QueryCommand('innerString', previousToLine),
	class: new QueryCommand('class', previousToLine),
	innerClass: new QueryCommand('innerClass', previousToLine),
	array: new QueryCommand('array', closestPos),
	object: new QueryCommand('object', closestPos),
	string: new QueryCommand('string', closestPos),
	parameters: new QueryCommand('parameters', previousToLine),
	call: new QueryCommand('call', previousToLine),
	innerCall: new QueryCommand('innerCall', previousToLine),
	innerParameters: new QueryCommand('innerParameters', previousToLine),
	type: new QueryCommand('type', previousToLine),
	comments: new QueryCommand('comments', previousToLine),
	innerConditional: new QueryCommand('innerConditional', previousToLine),
	innerType: new QueryCommand('innerType', previousToLine),
};

function goTo(position: { start: vscode.Position; end: vscode.Position }) {
	const ceditor = editor.getEditor();
	ceditor.selection = new vscode.Selection(position.start, position.start);
}

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(previousCommands)) {
		context.subscriptions.push(
			InitCommand(
				makeName(`select.previous.${command.name}`),
				command.select,
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
	for (const command of Object.values(commands)) {
		InitCommand(
			makeName(`goTo.next.${command.name}`),
			(ctx) => command.goTo(ctx),
			goTo
		);
		context.subscriptions.push(
			InitCommand(
				makeName(`select.${command.name}`),
				(context) => command.select(context),
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

const greedyChars = [';', ','];
function InitCommand(
	name: string,
	execFunc: (context: QueryContext) => Promise<
		| {
				start: vscode.Position;
				end: vscode.Position;
		  }
		| undefined
	>,

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
		const position = await execFunc(context);

		if (!position) {
			return;
		}

		const endPos = new vscode.Position(
			position.end.line,
			position.end.character + 1
		);
		const endLine = currentEditor.document.getText(
			new vscode.Range(position.start, endPos)
		);

		if (greedyChars.includes(endLine.at(-1)!)) {
			position.end = endPos;
		}

		afterEnd(position);
	});
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
