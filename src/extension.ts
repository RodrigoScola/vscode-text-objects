import assert from 'assert';
import fs, { ObjectEncodingOptions } from 'fs';
import path from 'path';
import * as vscode from 'vscode';
import { Config } from './config';
import { CommandHistory, initCommands } from './motions/commands';
import { LanguageParser } from './parsing/parser';

// Initialize the parser with the correct path to the WebAssembly file

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
const bugFileOptions: ObjectEncodingOptions = {
	encoding: 'utf-8',
};

let config: Config;

export function getConfig(): Config {
	assert(config, 'configuration has not setup yet');
	return config;
}
export const editor = new Editor();

export function visualize(start: vscode.Range): void {
	assert(start, 'start needs to be defined');

	const ceditor = editor.getEditor();
	assert(ceditor, 'editor is not present');

	ceditor.revealRange(start);
	ceditor.selection = new vscode.Selection(start.start, start.end); // Move cursor to that position
}

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
	LanguageParser.init();

	config = new Config(vscode.workspace.getConfiguration('vscode-textobjects'));

	// const terminalDataListener = vscode.window.onDidChangeTerminalState(
	// 	(e) => {
	// 		const currentOutput = terminalOutputs.get(e.terminal.name) || '';
	// 		terminalOutputs.set(e.terminal.name, currentOutput + e.data);
	// 	}
	// );

	await initCommands(context);

	context.subscriptions.push(
		vscode.commands.registerCommand('vscode-textobjects.bugFile', async () => {
			const editor = vscode.window.activeTextEditor;
			const bugsDir = config.bugPath();
			if (!editor || !bugsDir) {
				return;
			}

			let text = editor.document.getText();

			let selection = editor.selection;
			let start: string = '';
			let end: string = '';

			if (!selection.start.isEqual(selection.end)) {
				text = editor.document.getText(selection);
				start = editor.document.getText(
					new vscode.Range(new vscode.Position(0, 0), selection.start)
				);
				end = editor.document.getText(
					new vscode.Range(
						selection.end,
						new vscode.Position(editor.document.lineCount, Infinity)
					)
				);
			}

			const name =
				new Date().getTime().toString() + getExtension(editor.document.languageId);

			//add better validation?
			fs.mkdirSync(bugsDir, { recursive: true });

			let comment = '//';
			if (editor.document.languageId === 'python') {
				comment = '#';
			}

			let file = `
                    ${comment} path: ${editor.document.fileName}\n
                    `;

			const lastCommand = CommandHistory.last();
			if (lastCommand) {
				file += `${comment} last command: ${lastCommand.name}\n`;
			}

			file += `${start}\n`;
			file += `${comment}---- START \n`;
			file += `${text}\n`;
			file += `${comment}------ END \n`;
			file += `${end}`;

			fs.writeFileSync(path.join(bugsDir, name), file, bugFileOptions);
		})
	);
}

export function deactivate() {}

function getExtension(language: string) {
	switch (language.trim()) {
		case 'javascript': {
			return '.js';
		}
		case 'typescript': {
			return '.ts';
		}
		case 'javascriptreact': {
			return '.jsx';
		}
		case 'typescriptreact': {
			return '.tsx';
		}
		case 'python': {
			return '.py';
		}
		default: {
			return language;
		}
	}
}

