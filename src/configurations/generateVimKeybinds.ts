import * as vscode from 'vscode';
import { GetVimKeybindings, makeName } from './configGeneration';
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

// export async function GenerateVimKeybinds(): Promise<void> {
// 	const keybinds = GetVimKeybindings(commands);

// 	const config = vscode.workspace.getConfiguration('vim');

// 	if (!config) {
// 		return;
// 	}

// 	const keybind = config.inspect('normalModeKeyBindings');

// 	if (!keybind) {
// 		return;
// 	}

// 	let keybindValues: VimKeybinding[] = (keybind.globalValue as VimKeybinding[]) || [];

// 	const previousKeybinds: VimKeybinding[] = [];
// 	const nameToCommand: Record<string, VimKeybinding> = {};

// 	for (const keybind of keybindValues) {
// 		if (
// 			!('commands' in keybind) ||
// 			!Array.isArray(keybind.commands) ||
// 			keybind.commands.length !== 1 ||
// 			!keybind.commands[0] ||
// 			!keybind.commands[0].includes(makeName(''))
// 		) {
// 			previousKeybinds.push(keybind);
// 			continue;
// 		}

// 		nameToCommand[keybind.commands[0]] = keybind;
// 	}

// 	for (const keybind of keybinds) {
// 		if (
// 			!(keybind.commands[0] in nameToCommand) ||
// 			('before' in keybind &&
// 				keybind.before.join(',') !== nameToCommand[keybind.commands[0]].before.join(','))
// 		) {
// 			nameToCommand[keybind.commands[0]] = keybind;
// 		}
// 	}

// 	config
// 		.update('normalModeKeyBindings', previousKeybinds.concat(Object.values(nameToCommand)), true)
// 		.then(() => {
// 			vscode.window.showInformationMessage('Keybinds updated in normalModeKeybindings');
// 		});
// }
