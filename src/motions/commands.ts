import assert from 'assert';
import * as vscode from 'vscode';
import { editor } from '../extension';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { QueryCommand, QueryCommands } from './QueryCommands';
import { select } from './selection';
import { CppQuery } from './selectors/cpp';
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
SelectorFactory.set('cpp', CppQuery);

export class CommandHistory {
	private static commands: QueryCommand[] = [];

	static add(command: QueryCommand) {
		assert(CommandHistory.length >= 0, 'history not initialized');
		CommandHistory.commands.push(command);
	}
	static get(ind: number) {
		return CommandHistory.commands.at(ind);
	}
	static last() {
		return CommandHistory.commands.at(-1);
	}
}

function goTo(position: { start: vscode.Position; end: vscode.Position }) {
	const ceditor = editor.getEditor();
	ceditor.selection = new vscode.Selection(position.start, position.start);
}

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(QueryCommands)) {
		InitCommand(
			makeName(`goTo.next.${command.goTo.name}`),
			(ctx) => command.goTo.exec(ctx),
			goTo
		);
		context.subscriptions.push(
			InitCommand(
				makeName(`select.previous.${command.previous.name}`),
				(context) => command.previous.exec(context),
				function (position) {
					select(
						position.start,
						position.end,
						editor.getEditor()
					);
				}
			)
		);
		context.subscriptions.push(
			InitCommand(
				makeName(`select.next.${command.select.name}`),
				(context) => command.select.exec(context),
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
	const parser = await LanguageParser.get(langName);
	assert(parser, `could not find parser for ${langName}`);
	return {
		text: currentEditor.document.getText(),
		cursor: currentEditor.selection.active,
		language: langName as SupportedLanguages,
	};
}

