import * as vscode from 'vscode';
import { GetVimKeybindings } from './configGeneration';
import { commands } from '../motions/commands';
export async function GenerateVimKeybinds(): Promise<void> {
	const doc = await vscode.workspace.openTextDocument({
		language: 'jsonc',
		content: JSON.stringify(GetVimKeybindings(commands), null, 1),
	});

	await vscode.window.showTextDocument(doc);

	try {
		vscode.commands.executeCommand('editor.action.formatDocument');
	} catch (err) {}
}
