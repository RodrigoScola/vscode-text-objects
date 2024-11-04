import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { NODES } from '../constants';
import { editor } from '../extension';
import { filterDuplicates } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { nextPosition } from './position/move';
import { closestPos, formatSelection, previousPosition } from './position/selection';
import { QueryCommand } from './QueryCommand';
import { C } from './selectors/c';
import { CppQuery } from './selectors/cpp';
import { Csharp } from './selectors/csharp';
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
	['inner.rhs']: string;
	['outer.lhs']: string;
	['inner.lhs']: string;
	['outer.class']: string;
	['inner.class']: string;
	['outer.array']: string;
	['inner.array']: string;
	['outer.object']: string;
	['inner.object']: string;
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
SelectorFactory.set('csharp', Csharp);
SelectorFactory.set('rust', Rust);
SelectorFactory.set('c', C);
SelectorFactory.set('yaml', C);
SelectorFactory.set('lua', LUA);
SelectorFactory.set('java', JAVA);
SelectorFactory.set('toml', TOML);

// there is a better way, could make a state class with all the current state of the extension
// just trying to prove the idea for now
function groupElements(matches: QueryMatch[]): QueryMatch[] {
	//remember to turn this on before publishing
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
	const arrays = Array.from(captureParents.values());

	return arrays;
}

export const selectCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(closestPos)
		.setOnMatch((matches) => filterDuplicates(matches, [NODES.FUNCTION])),
	innerFunction: new QueryCommand('inner.function').setGetPosition(closestPos),
	loop: new QueryCommand('outer.loop').setGetPosition(closestPos),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(closestPos),
	conditional: new QueryCommand('outer.conditional').setGetPosition(closestPos),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(closestPos),
	rhs: new QueryCommand('outer.rhs').setGetPosition(closestPos),
	innerRhs: new QueryCommand('inner.rhs').setGetPosition(closestPos),
	lhs: new QueryCommand('outer.lhs').setGetPosition(closestPos),
	innerLhs: new QueryCommand('inner.lhs').setGetPosition(closestPos),
	variables: new QueryCommand('outer.variable').setGetPosition(closestPos),
	string: new QueryCommand('outer.string').setGetPosition(closestPos),
	innerString: new QueryCommand('inner.string').setGetPosition(closestPos),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(closestPos),
	innerClass: new QueryCommand('inner.class').setGetPosition(closestPos),
	array: new QueryCommand('outer.array').setGetPosition(closestPos),
	innerArray: new QueryCommand('inner.array').setGetPosition(closestPos),
	object: new QueryCommand('outer.object').setGetPosition(closestPos),
	innerObject: new QueryCommand('inner.object').setGetPosition(closestPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(closestPos).setOnMatch(groupElements),
	call: new QueryCommand('outer.call').setOnMatch(groupElements).setGetPosition(closestPos),
	innerCall: new QueryCommand('inner.call').setGetPosition(closestPos),
	innerParameters: new QueryCommand('inner.parameters').setGetPosition(closestPos),
	type: new QueryCommand('outer.type').setGetPosition(closestPos),
	innerType: new QueryCommand('inner.type').setGetPosition(closestPos),
	comments: new QueryCommand('outer.comment').setGetPosition(closestPos),
};

export const selectPreviousCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(previousPosition)
		.setOnMatch((matches) => filterDuplicates(matches, [NODES.FUNCTION])),
	innerFunction: new QueryCommand('inner.function').setGetPosition(previousPosition),
	loop: new QueryCommand('outer.loop').setGetPosition(previousPosition),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(previousPosition),
	conditional: new QueryCommand('outer.conditional').setGetPosition(previousPosition),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(previousPosition),
	rhs: new QueryCommand('outer.rhs').setGetPosition(previousPosition),
	innerRhs: new QueryCommand('inner.rhs').setGetPosition(previousPosition),
	lhs: new QueryCommand('outer.lhs').setGetPosition(previousPosition),
	innerLhs: new QueryCommand('inner.lhs').setGetPosition(previousPosition),
	variables: new QueryCommand('outer.variable').setGetPosition(previousPosition),
	innerString: new QueryCommand('inner.string').setGetPosition(previousPosition),
	class: new QueryCommand('outer.class').setGetPosition(previousPosition),
	innerClass: new QueryCommand('inner.class').setGetPosition(previousPosition),
	array: new QueryCommand('outer.array').setGetPosition(closestPos),
	innerarray: new QueryCommand('inner.array').setGetPosition(closestPos),
	object: new QueryCommand('outer.object').setGetPosition(closestPos),
	innerObject: new QueryCommand('inner.object').setGetPosition(closestPos),
	string: new QueryCommand('outer.string').setGetPosition(closestPos),
	parameters: new QueryCommand('outer.parameters').setGetPosition(previousPosition).setOnMatch(groupElements),
	call: new QueryCommand('outer.call').setGetPosition(previousPosition).setOnMatch(groupElements),
	innerCall: new QueryCommand('inner.call').setGetPosition(previousPosition),
	innerParameters: new QueryCommand('inner.parameters').setGetPosition(previousPosition),
	type: new QueryCommand('outer.type').setGetPosition(previousPosition),
	innerType: new QueryCommand('inner.type').setGetPosition(previousPosition),
	comments: new QueryCommand('outer.comment').setGetPosition(previousPosition),
};

export const GotoCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(nextPosition)
		.setOnMatch((m) => filterDuplicates(m, [NODES.FUNCTION])),
	innerFunction: new QueryCommand('inner.function').setGetPosition(nextPosition),
	loop: new QueryCommand('outer.loop').setGetPosition(nextPosition),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(nextPosition),
	conditional: new QueryCommand('outer.conditional').setGetPosition(nextPosition),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(nextPosition),
	rhs: new QueryCommand('outer.rhs').setGetPosition(nextPosition),
	innerRhs: new QueryCommand('inner.rhs').setGetPosition(nextPosition),
	lhs: new QueryCommand('outer.lhs').setGetPosition(nextPosition),
	innerLhs: new QueryCommand('inner.lhs').setGetPosition(nextPosition),
	variables: new QueryCommand('outer.variable').setGetPosition(nextPosition),
	string: new QueryCommand('outer.string').setGetPosition(nextPosition),
	innerString: new QueryCommand('inner.string').setGetPosition(nextPosition),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(nextPosition),
	innerClass: new QueryCommand('inner.class').setGetPosition(nextPosition),
	array: new QueryCommand('outer.array').setGetPosition(nextPosition),
	innerArray: new QueryCommand('inner.array').setGetPosition(nextPosition),
	object: new QueryCommand('outer.object').setGetPosition(nextPosition),
	innerObject: new QueryCommand('inner.object').setGetPosition(nextPosition),
	parameters: new QueryCommand('outer.parameters').setGetPosition(nextPosition).setOnMatch(groupElements),
	call: new QueryCommand('outer.call').setOnMatch(groupElements).setGetPosition(nextPosition),
	innerCall: new QueryCommand('inner.call').setOnMatch(groupElements).setGetPosition(nextPosition),
	innerParameters: new QueryCommand('inner.parameters').setGetPosition(nextPosition).setOnMatch(groupElements),
	type: new QueryCommand('outer.type').setGetPosition(nextPosition),
	innerType: new QueryCommand('inner.type').setGetPosition(nextPosition),
	comments: new QueryCommand('outer.comment').setGetPosition(nextPosition),
};
export const GotoPreviousCommands = {
	function: new QueryCommand('outer.function')
		.setGetPosition(previousPosition)
		.setOnMatch((m) => filterDuplicates(m, [NODES.FUNCTION])),
	innerFunction: new QueryCommand('inner.function').setGetPosition(previousPosition),
	loop: new QueryCommand('outer.loop').setGetPosition(previousPosition),
	innerLoop: new QueryCommand('inner.loop').setGetPosition(previousPosition),
	conditional: new QueryCommand('outer.conditional').setGetPosition(previousPosition),
	innerConditional: new QueryCommand('inner.conditional').setGetPosition(previousPosition),
	rhs: new QueryCommand('outer.rhs').setGetPosition(previousPosition),
	innerRhs: new QueryCommand('inner.rhs').setGetPosition(previousPosition),

	lhs: new QueryCommand('outer.lhs').setGetPosition(previousPosition),
	innerLHS: new QueryCommand('inner.lhs').setGetPosition(previousPosition),
	variables: new QueryCommand('outer.variable').setGetPosition(previousPosition),
	string: new QueryCommand('outer.string').setGetPosition(previousPosition),
	innerString: new QueryCommand('inner.string').setGetPosition(previousPosition),
	//bug on going to class
	class: new QueryCommand('outer.class').setGetPosition(previousPosition),
	innerClass: new QueryCommand('inner.class').setGetPosition(previousPosition),
	array: new QueryCommand('outer.array').setGetPosition(previousPosition),
	innerArray: new QueryCommand('inner.array').setGetPosition(previousPosition),
	object: new QueryCommand('outer.object').setGetPosition(previousPosition),
	innerObject: new QueryCommand('inner.object').setGetPosition(previousPosition),
	parameters: new QueryCommand('outer.parameters').setGetPosition(previousPosition).setOnMatch(groupElements),
	call: new QueryCommand('outer.call').setGetPosition(previousPosition),
	innerCall: new QueryCommand('inner.call').setOnMatch(groupElements).setGetPosition(previousPosition),
	innerParameters: new QueryCommand('inner.parameters').setGetPosition(previousPosition),
	type: new QueryCommand('outer.type').setGetPosition(previousPosition),
	innerType: new QueryCommand('inner.type').setGetPosition(previousPosition),
	comments: new QueryCommand('outer.comment').setGetPosition(previousPosition),
};

function goTo(position: { start: vscode.Position; end: vscode.Position }) {
	const ceditor = editor.getEditor();
	ceditor.selection = new vscode.Selection(position.start, position.start);
	ceditor.revealRange(new vscode.Range(position.start, position.start));
}

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(GotoCommands)) {
		InitCommand(makeName(`goTo.next.${command.name}`), (ctx) => command.select(ctx), goTo);
	}
	for (const command of Object.values(GotoPreviousCommands)) {
		InitCommand(makeName(`goTo.previous.${command.name}`), (ctx) => command.select(ctx), goTo);
	}

	for (const command of Object.values(selectPreviousCommands)) {
		context.subscriptions.push(
			InitCommand(
				makeName(`select.previous.${command.name}`),
				(context) => command.select(context),
				function (position) {
					formatSelection(command, position.start, position.end, editor.getEditor());
				}
			)
		);
	}
	for (const command of Object.values(selectCommands)) {
		InitCommand(
			makeName(`select.next.${command.name}`),
			(context) => command.select(context),
			function (position) {
				formatSelection(command, position.start, position.end, editor.getEditor());
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
		assert(position.start.isBeforeOrEqual(position.end), 'start is before end');

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
