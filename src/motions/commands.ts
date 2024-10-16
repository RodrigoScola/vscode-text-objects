import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { editor } from '../extension';
import { filterLargestMatches, groupNodes } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import {
	closestPos,
	JoinedPoint,
	nextPosition,
	previousToLine,
	select,
} from './selection';
import { GoQuery } from './selectors/go';
import { JsQuery } from './selectors/javascript';
import { JsonSelector } from './selectors/json';
import { PythonQuery } from './selectors/python';
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
	['outer.comment']: string;
	['outer.type']: string;
	['inner.type']: string;
	['outer.function']: string;
	['inner.function']: string;
	['outer.call']: string;
	['inner.call']: string;
	['outer.parameters']: string;
	['inner.parameters']: string;
	['outer.loop']: string;
	['inner.loop']: string;
	['outer.conditional']: string;
	['inner.conditional']: string;
	['outer.variable']: string;
	['outer.rhs']: string;
	['outer.class']: string;
	['inner.class']: string;
	['outer.array']: string;
	['outer.object']: string;
	['outer.string']: string;
	['inner.string']: string;
}

export class SelectorFactory {
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
SelectorFactory.set('python', PythonQuery);

// there is a better way, could make a state class with all the current state of the extension
// just trying to prove the idea for now
let lastCommand: QueryCommand | undefined;
export function getLastExecCommand() {
	return lastCommand;
}

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

	async goTo(context: QueryContext) {
		lastCommand = this;
		const Parsing = await LanguageParser.get(context.language);
		assert(
			Parsing,
			'could not init parser for ' + context.language + 'language'
		);

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

		return this.makePosition(
			this.getPosition(groupNodes(matches), context.cursor)
		);
	}
	private makePosition(position?: JoinedPoint) {
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

function groupElements(matches: QueryMatch[]): QueryMatch[] {
	// remember to turn this on before publishing
	// if (getConfig().groupElements() === false) {
	// 	return matches;
	// }

	const captureParents = new Map<number, QueryMatch>();

	for (const match of matches) {
		for (const capture of match.captures) {
			assert(capture.node.parent, 'i should worry about this now');

			const parentId = capture.node.parent.id;
			const parentNode = captureParents.get(parentId);
			if (!parentNode) {
				captureParents.set(parentId, match);
				continue;
			}

			parentNode.captures.push(capture);
			captureParents.set(parentId, parentNode);
		}
	}

	return Array.from(captureParents.values());
}

export const commands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(closestPos)
		.setOnMatch(function (matches) {
			return filterLargestMatches(matches);
		}),
	innerFunction: new QueryCommand('inner.function').setGetPosition(
		closestPos
	),
	loop: new QueryCommand('outer.loop').setGetPosition(closestPos),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(closestPos),
	conditional: new QueryCommand('outer.conditional').setGetPosition(
		closestPos
	),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(
		closestPos
	),
	rhs: new QueryCommand('outer.rhs').setGetPosition(closestPos),
	variables: new QueryCommand('outer.variable').setGetPosition(closestPos),
	string: new QueryCommand('outer.string').setGetPosition(closestPos),
	innerString: new QueryCommand('inner.string').setGetPosition(closestPos),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(closestPos),
	innerClass: new QueryCommand('inner.class').setGetPosition(closestPos),
	array: new QueryCommand('outer.array').setGetPosition(closestPos),
	object: new QueryCommand('outer.object').setGetPosition(closestPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(
		closestPos
	),
	//think of a good keybind for call
	//make sure call works, at this moment dont know
	call: new QueryCommand('outer.call').setGetPosition(closestPos),
	innerCall: new QueryCommand('inner.call').setGetPosition(closestPos),
	innerParameters: new QueryCommand('inner.parameters')
		.setGetPosition(closestPos)
		.setOnMatch(groupElements),
	type: new QueryCommand('outer.type').setGetPosition(closestPos),
	innerType: new QueryCommand('inner.type').setGetPosition(closestPos),
	comments: new QueryCommand('outer.comment').setGetPosition(closestPos),
};

export const previousCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(previousToLine)
		.setOnMatch(filterLargestMatches),
	innerFunction: new QueryCommand('inner.function').setGetPosition(
		previousToLine
	),
	loop: new QueryCommand('outer.loop').setGetPosition(previousToLine),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(previousToLine),
	conditional: new QueryCommand('outer.conditional').setGetPosition(
		previousToLine
	),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(
		previousToLine
	),
	rhs: new QueryCommand('outer.rhs').setGetPosition(previousToLine),
	variables: new QueryCommand('outer.variable').setGetPosition(
		previousToLine
	),
	innerString: new QueryCommand('inner.string').setGetPosition(
		previousToLine
	),
	class: new QueryCommand('outer.class').setGetPosition(previousToLine),
	innerClass: new QueryCommand('inner.class').setGetPosition(previousToLine),
	array: new QueryCommand('outer.array').setGetPosition(closestPos),
	object: new QueryCommand('outer.object').setGetPosition(closestPos),
	string: new QueryCommand('outer.string').setGetPosition(closestPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(
		previousToLine
	),
	call: new QueryCommand('outer.call').setGetPosition(previousToLine),
	innerCall: new QueryCommand('inner.call').setGetPosition(previousToLine),
	innerParameters: new QueryCommand('inner.parameters').setGetPosition(
		previousToLine
	),
	type: new QueryCommand('outer.type').setGetPosition(previousToLine),
	innerType: new QueryCommand('inner.type').setGetPosition(previousToLine),
	comments: new QueryCommand('outer.comment').setGetPosition(previousToLine),
};

function goTo(position: { start: vscode.Position; end: vscode.Position }) {
	const ceditor = editor.getEditor();
	ceditor.selection = new vscode.Selection(position.start, position.start);
}

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(previousCommands)) {
		InitCommand(
			makeName(`goTo.previous.${command.name}`),
			(ctx) => command.goTo(ctx),
			goTo
		);
		context.subscriptions.push(
			InitCommand(
				makeName(`select.previous.${command.name}`),
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
	for (const command of Object.values(commands)) {
		InitCommand(
			makeName(`goTo.next.${command.name}`),
			(ctx) => command.goTo(ctx),
			goTo
		);
		context.subscriptions.push(
			InitCommand(
				makeName(`select.next.${command.name}`),
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
