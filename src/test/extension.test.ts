// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import assert from 'assert';
import * as vscode from 'vscode';
import { JsCommands } from '../motions/commands';
import { LanguageParser } from '../parsing/parser';

suite('the main one', () => {
	test('normal selection', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: ['function foo () {', '  return 1;', '}'].join('\n'),
		});
		await LanguageParser.init();
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: document.getText(),
		});
		assert(position, 'position not found');

		assert.equal(position.start.character, 0);
		assert.equal(position.start.line, 0);
		assert.equal(position.end.character, 1);
		assert.equal(position.end.line, 2);
	});

	test('can select exports on functions', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: ['export function foo () {', '  return 1;', '}'].join(
				'\n'
			),
		});
		await LanguageParser.init();
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: document.getText(),
		});
		assert(position, 'position not found');
		assert.equal(position.start.character, 0);
		assert.equal(position.start.line, 0);
		assert.equal(position.end.character, 1);
		assert.equal(position.end.line, 2);
	});

	test('can select exports on functions from the inside', async () => {
		const document = await vscode.workspace.openTextDocument({
			content: ['export function foo () {', '  return 1;', '}'].join(
				'\n'
			),
		});
		await LanguageParser.init();
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: document.getText(),
		});
		assert(position, 'position not found');

		assert.equal(position.start.character, 0);
		assert.equal(position.start.line, 0);
		assert.equal(position.end.character, 1);
		assert.equal(position.end.line, 2);
	});
});

