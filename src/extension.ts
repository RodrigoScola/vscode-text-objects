import assert from 'assert';
import * as vscode from 'vscode';
import { init } from './motions/commands';
import { LanguageParser } from './parsing/parser';

// Initialize the parser with the correct path to the WebAssembly file

// This method is called when your extension is activated
export async function activate() {
	await Promise.all([LanguageParser.init(), init()]);

}

export function deactivate() {}
