import * as vscode from 'vscode';
import { init, deactivate as quit } from './motions/commands';
import { LanguageParser } from './parsing/parser';
import { setExtensionContext } from './context/context';

export async function activate(context: vscode.ExtensionContext): Promise<void> {
	setExtensionContext(context);
	await Promise.all([LanguageParser.init(), init()]);
}

export function deactivate(): void {
	quit();
}
