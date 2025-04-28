import * as vscode from 'vscode';
import { getKeyboardKeybinds } from './configGeneration';
import { commands } from '../motions/commands';
import { getConfig } from '../config';
export async function GenerateKeyboardKeybindings(): Promise<void> {
	const keyboardConfig = getConfig().keybindingConfig();
	const total = getKeyboardKeybinds(commands, keyboardConfig);

	const doc = await vscode.workspace.openTextDocument({
		language: 'jsonc',
		content: JSON.stringify(total, null, 1),
	});

	await vscode.window.showTextDocument(doc, { preview: true });

	try {
		vscode.commands.executeCommand('editor.action.formatDocument');
	} catch (err) {}
}
