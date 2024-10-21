import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { editor } from '../extension';
import { filterLargestMatches } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { nextPos } from './move';
import { closestPos, previousPos, select } from './position/selection';
import { QueryCommand } from './QueryCommand';
import { C } from './selectors/c';
import { CppQuery } from './selectors/cpp';
import { GoQuery } from './selectors/go';
import { JAVA } from './selectors/java';
import { JsQuery } from './selectors/javascript';
import { JsonSelector } from './selectors/json';
import { LUA } from './selectors/lua';
import { PythonQuery } from './selectors/python';
import { Rust } from './selectors/rust';
import { TOML } from './selectors/toml';
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
		assert(lang in SelectorFactory.selectors, `language ${lang} not found in selectors`);
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
SelectorFactory.set('cpp', CppQuery);
SelectorFactory.set('csharp', CppQuery);
SelectorFactory.set('rust', Rust);
SelectorFactory.set('c', C);
SelectorFactory.set('yaml', C);
SelectorFactory.set('lua', LUA);
SelectorFactory.set('java', JAVA);
SelectorFactory.set('toml', TOML);

// there is a better way, could make a state class with all the current state of the extension
// just trying to prove the idea for now

function groupElements(matches: QueryMatch[]): QueryMatch[] {
	// remember to turn this on before publishing
	// if (getConfig().groupElements() === false) {
	// return matches;
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
	const arrays = Array.from(captureParents.values());

	return arrays;
}

export const selectCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(closestPos)
		.setOnMatch(function (matches) {
			return filterLargestMatches(matches);
		}),
	innerFunction: new QueryCommand('inner.function').setGetPosition(closestPos),
	loop: new QueryCommand('outer.loop').setGetPosition(closestPos),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(closestPos),
	conditional: new QueryCommand('outer.conditional').setGetPosition(closestPos),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(closestPos),
	rhs: new QueryCommand('outer.rhs').setGetPosition(closestPos),
	variables: new QueryCommand('outer.variable').setGetPosition(closestPos),
	string: new QueryCommand('outer.string').setGetPosition(closestPos),
	innerString: new QueryCommand('inner.string').setGetPosition(closestPos),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(closestPos),
	innerClass: new QueryCommand('inner.class').setGetPosition(closestPos),
	array: new QueryCommand('outer.array').setGetPosition(closestPos),
	object: new QueryCommand('outer.object').setGetPosition(closestPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(closestPos),
	//think of a good keybind for call
	//make sure call works, at this moment dont know
	call: new QueryCommand('outer.call').setGetPosition(closestPos),
	innerCall: new QueryCommand('inner.call').setOnMatch(groupElements).setGetPosition(closestPos),
	innerParameters: new QueryCommand('inner.parameters')
		.setGetPosition(closestPos)
		.setOnMatch(groupElements),
	type: new QueryCommand('outer.type').setGetPosition(closestPos),
	innerType: new QueryCommand('inner.type').setGetPosition(closestPos),
	comments: new QueryCommand('outer.comment').setGetPosition(closestPos),
};

export const selectPreviousCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(previousPos)
		.setOnMatch(filterLargestMatches),
	innerFunction: new QueryCommand('inner.function').setGetPosition(previousPos),
	loop: new QueryCommand('outer.loop').setGetPosition(previousPos),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(previousPos),
	conditional: new QueryCommand('outer.conditional').setGetPosition(previousPos),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(previousPos),
	rhs: new QueryCommand('outer.rhs').setGetPosition(previousPos),
	variables: new QueryCommand('outer.variable').setGetPosition(previousPos),
	innerString: new QueryCommand('inner.string').setGetPosition(previousPos),
	class: new QueryCommand('outer.class').setGetPosition(previousPos),
	innerClass: new QueryCommand('inner.class').setGetPosition(previousPos),
	array: new QueryCommand('outer.array').setGetPosition(closestPos),
	object: new QueryCommand('outer.object').setGetPosition(closestPos),
	string: new QueryCommand('outer.string').setGetPosition(closestPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(previousPos),
	call: new QueryCommand('outer.call').setGetPosition(previousPos),
	innerCall: new QueryCommand('inner.call').setGetPosition(previousPos),
	innerParameters: new QueryCommand('inner.parameters').setGetPosition(previousPos),
	type: new QueryCommand('outer.type').setGetPosition(previousPos),
	innerType: new QueryCommand('inner.type').setGetPosition(previousPos),
	comments: new QueryCommand('outer.comment').setGetPosition(previousPos),
};

export const GotoCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(nextPos)
		.setOnMatch(function (matches) {
			return filterLargestMatches(matches);
		}),
	innerFunction: new QueryCommand('inner.function').setGetPosition(nextPos),
	loop: new QueryCommand('outer.loop').setGetPosition(nextPos),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(nextPos),
	conditional: new QueryCommand('outer.conditional').setGetPosition(nextPos),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(nextPos),
	rhs: new QueryCommand('outer.rhs').setGetPosition(nextPos),
	variables: new QueryCommand('outer.variable').setGetPosition(nextPos),
	string: new QueryCommand('outer.string').setGetPosition(nextPos),
	innerString: new QueryCommand('inner.string').setGetPosition(nextPos),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(nextPos),
	innerClass: new QueryCommand('inner.class').setGetPosition(nextPos),
	array: new QueryCommand('outer.array').setGetPosition(nextPos),
	object: new QueryCommand('outer.object').setGetPosition(nextPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(nextPos),
	call: new QueryCommand('outer.call').setGetPosition(nextPos),
	innerCall: new QueryCommand('inner.call').setOnMatch(groupElements).setGetPosition(nextPos),
	innerParameters: new QueryCommand('inner.parameters')
		.setGetPosition(nextPos)
		.setOnMatch(groupElements),
	type: new QueryCommand('outer.type').setGetPosition(nextPos),
	innerType: new QueryCommand('inner.type').setGetPosition(nextPos),
	comments: new QueryCommand('outer.comment').setGetPosition(nextPos),
};
export const GotoPreviousCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(previousPos)
		.setOnMatch(function (matches) {
			return filterLargestMatches(matches);
		}),
	innerFunction: new QueryCommand('inner.function').setGetPosition(previousPos),
	loop: new QueryCommand('outer.loop').setGetPosition(previousPos),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(previousPos),
	conditional: new QueryCommand('outer.conditional').setGetPosition(previousPos),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(previousPos),
	rhs: new QueryCommand('outer.rhs').setGetPosition(previousPos),
	variables: new QueryCommand('outer.variable').setGetPosition(previousPos),
	string: new QueryCommand('outer.string').setGetPosition(previousPos),
	innerString: new QueryCommand('inner.string').setGetPosition(previousPos),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(previousPos),
	innerClass: new QueryCommand('inner.class').setGetPosition(previousPos),
	array: new QueryCommand('outer.array').setGetPosition(previousPos),
	object: new QueryCommand('outer.object').setGetPosition(previousPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(previousPos),
	call: new QueryCommand('outer.call').setGetPosition(previousPos),
	innerCall: new QueryCommand('inner.call')
		.setOnMatch(groupElements)
		.setGetPosition(previousPos),
	innerParameters: new QueryCommand('inner.parameters')
		.setGetPosition(previousPos)
		.setOnMatch(groupElements),
	type: new QueryCommand('outer.type').setGetPosition(previousPos),
	innerType: new QueryCommand('inner.type').setGetPosition(previousPos),
	comments: new QueryCommand('outer.comment').setGetPosition(previousPos),
};

function goTo(position: { start: vscode.Position; end: vscode.Position }) {
	const ceditor = editor.getEditor();
	ceditor.selection = new vscode.Selection(position.start, position.start);
	ceditor.revealRange(new vscode.Range(position.start, position.start));
}
const greedyChars = [';', ','];

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(GotoCommands)) {
		InitCommand(makeName(`goTo.next.${command.name}`), (ctx) => command.select(ctx), goTo);
	}
	for (const command of Object.values(GotoPreviousCommands)) {
		InitCommand(
			makeName(`goTo.previous.${command.name}`),
			(ctx) => command.select(ctx),
			goTo
		);
	}

	for (const command of Object.values(selectPreviousCommands)) {
		context.subscriptions.push(
			InitCommand(
				makeName(`select.previous.${command.name}`),
				(context) => command.select(context),
				function (position) {
					const currentEditor = editor.getEditor();

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
					select(position.start, position.end, editor.getEditor());
				}
			)
		);
	}
	for (const command of Object.values(selectCommands)) {
		InitCommand(
			makeName(`select.next.${command.name}`),
			(context) => command.select(context),
			function (position) {
				const currentEditor = editor.getEditor();

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
				select(position.start, position.end, editor.getEditor());
			}
		);
	}
}

function InitCommand(
	name: string,
	execFunc: (context: QueryContext) => Promise<
		| {
				start: vscode.Position;
				end: vscode.Position;
		  }
		| undefined
	>,

	afterEnd: (position: { start: vscode.Position; end: vscode.Position }) => unknown
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

		afterEnd(position);
	});
}

async function getContext(currentEditor: vscode.TextEditor): Promise<QueryContext> {
	const langName = currentEditor.document.languageId;
	const parser = await LanguageParser.get(currentEditor.document.languageId);
	assert(parser, `could not find parser for ${langName}`);
	return {
		text: currentEditor.document.getText(),
		cursor: currentEditor.selection.active,
		language: langName as SupportedLanguages,
	};
}

export class CommandHistory {
	private static commands: QueryCommand[] = [];
	static last() {
		return CommandHistory.commands.at(-1);
	}

	static get(ind: number) {
		return CommandHistory.commands.at(ind);
	}
	static add(command: QueryCommand) {
		assert(command, 'this should never happen');
		CommandHistory.commands.push(command);
	}
}

