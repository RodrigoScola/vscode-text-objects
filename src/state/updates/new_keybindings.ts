import * as vscode from 'vscode';
import { getContext } from '../../context/context';
import { EditorScope, ProcessFlow } from '../../editor/editorContext';

export function showUpdateKeybindingsWelcomeScreen(): void {
	try {
		const ctx = getContext().extensionContext;
		if (!ctx) {
			return;
		}
		const state = ctx.getState('showed_new_positionals_and_migrations', EditorScope.global);

		if (state === ProcessFlow.EXECUTED) {
			return;
		}

		ctx.updateState('showed_new_positionals_and_migrations', ProcessFlow.EXECUTED, EditorScope.global).then(
			() => {
				const panel = vscode.window.createWebviewPanel(
					'Version 0.2.0 is Live!',
					'Version 0.2.0 is Live!',
					vscode.ViewColumn.One,
					{}
				);

				panel.webview.html = getHTML();
			}
		);
	} catch (err) {
		console.error(err);
	}
}

function getHTML(): string {
	return `
    <!DOCTYPE html>
    <html lang="en">
    <head><meta charset="UTF-8"><title>Welcome</title></head>
    <body>

    <h1>Version 0.2.0 is Live</h1>
    <p>
     
This is a big one 🎊🎊🎊! We added a new motion specification, new way to configure and generate your keybindings and migration to the new model!
</p>

<h2> New motion specification: Position</h2>

<p> This was a big thing that was missing in the initial release. A way for you to explicitelly go to the end of an object, either forwards or backwards.</p>

<p>For now only the <i>go to</i> motion has this hability, but if theres a community want for this, we can add it to all the other ones.</p>

<p>To migrate your old configuration to the new configuration, either accept the migration prompt, or execute the command <i>vscode-textobjects.migrateVimPositionals</i>.</p>

<h2> A New way to configure and generate your keybindings</h2>

<p>There was a lot to improve in the keybinds and configuration department. If you wanted to change a motion key you had to update all the motions to update the one keystroke. Now you can update your settings in <i>vscode-textobjects.keybindings</i> or <i>vscode-textobjects.vimKeybindings</i> if you use vim mode. Then to regenerate your keybinds, use the commands <i>vscode-textobjects.generateKeybinds</i> or <i>vscode-textobjects.generateVimKeybinds</i> and then press <i>CTRL+SHIFT+P</i> and either paste your new keybindings on <i>Preferences: Open Keyboard shortcuts (JSON)</i> or on your json settings on your <i>vim</i> keybinds.</p>

<h2>Contribute</h2>

<p>If you enjoy how the extension has been coming along, please consider contributing! I love developing tools and this helps me a ton!</p>

<h3>
<a href="https://ko-fi.com/rodrigoscola" target="_blank" src="https://ko-fi.com/rodrigoscola">Donate Here</a></h3>
    </body>
    </html>
  `;
}
