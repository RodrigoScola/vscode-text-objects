import assert from 'assert';
import { ObjectEncodingOptions } from 'fs';
import * as vscode from 'vscode';
import { Config } from './config';
import { initCommands } from './motions/commands';
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
}

export function deactivate() {}

// function getExtension(language: string) {
// 	switch (language.trim()) {
// 		case 'javascript': {
// 			return '.js';
// 		}
// 		case 'typescript': {
// 			return '.ts';
// 		}
// 		case 'javascriptreact': {
// 			return '.jsx';
// 		}
// 		case 'typescriptreact': {
// 			return '.tsx';
// 		}
// 		case 'python': {
// 			return '.py';
// 		}
// 		default: {
// 			return language;
// 		}
// 	}
// }
