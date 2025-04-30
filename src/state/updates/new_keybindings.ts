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

<h2>A New way to configure and generate your keybindings</h2>

<p> There was a lot to improve in the keybinds and configuration department. If you wanted to change a motion key you had to update all the motions to update the one keystroke. Now you can update your settings with commands!</p>

<p>to change a specific key, use the <i>vscode-textobjects.keybindings<i>. Then if you are not using the <i>vim</i> extension, use the command <i>Generate Keybindings</i>. It will open a new window with all your new keybindings for you to paste in your keyboard json config. To see that configuration, press CTRL+SHIFT+P and type <i>Preferences: Open Keyboard shortcuts (JSON)</i>.</p>

if you are using the <a href="https://marketplace.visualstudio.com/items?itemName=vscodevim.vim" target="_blank" >Vim extension</a>. Alter your keys in <i>vscode-textobjects.vimKeybindings</i>, then use the command <i>Generate Vim Keybinds</i>. It will now show a window with your new keybindings that you can paste in your <i>vim settings</i>

<h2>Contribute</h2>

<p>If you enjoy how the extension has been coming along, please consider contributing! I love developing tools and this helps me a ton!</p>

<h3>
<a href="https://ko-fi.com/rodrigoscola" target="_blank" src="https://ko-fi.com/rodrigoscola">Donate Here</a></h3>
  <a style="display: 	flex; justify-content: center; align-items: center; height: 100%; width: 50%; " href="https://ko-fi.com/M4M31DOW0A" target="_blank">
<img style=" width: 50%; height: 50%; object-fit: contain; " src="/images/support.png" alt="Support me on Ko-fi">
  </a>
</div>
    </body>

    </html>
  `;
}
