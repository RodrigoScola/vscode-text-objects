import * as assert from 'assert';
import * as vscode from 'vscode';
import { init, commands, addSelectors, getCommandName, setupCommand } from '../motions/commands';
import fs from 'fs';
import path from 'path';
import Function from '../motions/queries/Function';
import { createYankNext } from '../motions/modifiers';
import { LanguageParser } from '../parsing/parser';

function getFile(filename: string): string {
	const cpath = path.join(__dirname, '..', '..', 'src', 'playgrounds', filename);
	assert.equal(fs.existsSync(cpath), true, 'playground file for c does not exist:' + cpath);
	return fs.readFileSync(cpath, 'utf-8');
}

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

	test('tests all the c language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.c'),
				language: 'c',
			}),
			LanguageParser.init(),
		]);
		const editor = await vscode.window.showTextDocument(doc);

		for (const command of commands) {
			if (command.action !== 'select') {
				continue;
			}
			await setupCommand(command);

			assert.equal(
				editor.selection.start.isBefore(editor.selection.end),
				true,
				`did not ${getCommandName(command)} correctly`
			);
			vscode.commands.executeCommand('cancelSelection');
		}
	});

	test('tests all the javascript language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.js'),
				language: 'javascript',
			}),
			LanguageParser.init(),
		]);
		const editor = await vscode.window.showTextDocument(doc);

		for (const command of commands) {
			if (command.action !== 'select' || command.name === 'type') {
				continue;
			}
			await setupCommand(command);

			assert.equal(
				editor.selection.start.isBefore(editor.selection.end),
				true,
				`did not ${getCommandName(command)} correctly`
			);
			vscode.commands.executeCommand('cancelSelection');
		}
	});
	test('tests all the cpp language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.cpp'),
				language: 'cpp',
			}),
			LanguageParser.init(),
		]);
		const editor = await vscode.window.showTextDocument(doc);

		for (const command of commands) {
			if (command.action !== 'select') {
				continue;
			}
			await setupCommand(command);

			assert.equal(
				editor.selection.start.isBefore(editor.selection.end),
				true,
				`did not ${getCommandName(command)} correctly`
			);
			vscode.commands.executeCommand('cancelSelection');
		}
	});
	test('tests all the cs language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.cs'),
				language: 'cs',
			}),
			LanguageParser.init(),
		]);
		const editor = await vscode.window.showTextDocument(doc);

		for (const command of commands) {
			if (command.action !== 'select') {
				continue;
			}
			await setupCommand(command);

			assert.equal(
				editor.selection.start.isBefore(editor.selection.end),
				true,
				`did not ${getCommandName(command)} correctly`
			);
			vscode.commands.executeCommand('cancelSelection');
		}
	});
});
