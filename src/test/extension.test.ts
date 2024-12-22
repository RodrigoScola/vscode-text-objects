import * as assert from 'assert';
import * as vscode from 'vscode';
import { init, addSelectors, getCommandName, setupCommand } from '../motions/commands';
import Function from '../motions/queries/Function';
import { createYankNext } from '../motions/modifiers';

function wait(ms: number) {
	return new Promise((res) => {
		setTimeout(() => res(true), ms);
	});
}

suite('Extension Test Suite', () => {
	// Cleanup after tests
	suiteTeardown(async () => {
		await vscode.commands.executeCommand('workbench.action.closeAllEditors');
	});

	test('should yank outer function', async () => {
		// Arrange
		const doc = await vscode.workspace.openTextDocument({
			content: `
            function absc() {
                console.log("hey there")
            }
            `,
			language: 'javascript',
		});
		const editor = await vscode.window.showTextDocument(doc);

		// Act
		const command = addSelectors(createYankNext('outer', 'function'), Function);

		setupCommand(command);

		await wait(200);

		assert.equal(
			editor.selection.start.isEqual(editor.selection.end),
			true,
			'not an empty selection after copy'
		);
		// assert.equal(1, 4);
	});
});
