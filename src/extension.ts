import assert from 'assert';
import fs from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { Config } from './config';
import { initCommands } from './motions/commands';
import { JoinedPoint } from './motions/selection';
import { LanguageParser } from './parsing/parser';

// Initialize the parser with the correct path to the WebAssembly file

export function visualize(start: JoinedPoint, end: JoinedPoint): void {
	const editor = getEditor();
	if (!editor) {
		return;
	}
	const startPos = new vscode.Position(
		start.endPosition.row,
		start.endPosition.column
	);
	const endPos = new vscode.Position(
		end.startPosition.row,
		end.startPosition.column
	);
	editor.revealRange(new vscode.Range(startPos, endPos));
	editor.selection = new vscode.Selection(startPos, endPos); // Move cursor to that position
}

class Editor {
	private editor: vscode.TextEditor | undefined;
	getEditor() {
		assert(this.editor, 'editor has not been setup yet');
		return this.editor;
	}
	setEditor(editor: vscode.TextEditor) {
		assert(editor, 'invalid editor');
		this.editor = editor;
	}
}

let currentEditor: vscode.TextEditor | undefined;

export function getEditor() {
	return currentEditor;
}
export function setEditor() {}

let config: Config;

function getConfig(): Config {
	assert(config, 'configuration has not setup yet');
	return config;
}
export const editor = new Editor();

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
	LanguageParser.init();

	config = new Config(
		vscode.workspace.getConfiguration('vscode-textobjects')
	);

	await initCommands(context);

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'vscode-textobjects.bugFile',
			async () => {
				const editor = vscode.window.activeTextEditor;
				if (!editor) {
					return;
				}

				let text = editor.document.getText();

				//get the range of the selected text
				let selection = editor.selection;

				if (!selection.start.isEqual(selection.end)) {
					text = editor.document.getText(selection);
				}
				//make a better way to log files like this, maybe a config for the path

				const bugsDir = config.bugPath();
				console.log(bugsDir);

				if (!bugsDir) {
					return;
				}

				fs.mkdirSync(bugsDir, { recursive: true });

				fs.writeFileSync(
					path.join(bugsDir, new Date().toUTCString()),
					text,
					{
						encoding: 'utf-8',
					}
				);
			}
		)
	);
}

export function deactivate() {}

function foo() {
	return 1;
}

