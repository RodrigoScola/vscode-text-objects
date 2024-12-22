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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.c'),
			language: 'c',
		});
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.js'),
			language: 'javascript',
		});
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.cpp'),
			language: 'cpp',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.cs'),
			language: 'cs',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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
	test('tests all the go language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.go'),
			language: 'go',
		});
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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

	test('tests all the java language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.java'),
			language: 'java',
		});
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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

	test('tests all the json language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.json'),
			language: 'json',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

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

	test('tests all the jsonc language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.jsonc'),
				language: 'jsonc',
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

	test('tests all the jsx language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.jsx'),
				language: 'jsx',
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

	test('tests all the lua language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.lua'),
				language: 'lua',
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

	test('tests all the python language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.py'),
				language: 'python',
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

	test('tests all the rust language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.rs'),
				language: 'rust',
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

	test('tests all the toml language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.toml'),
				language: 'toml',
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

	test('tests all the tsx language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.tsx'),
				language: 'typescriptreact',
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

	test('tests all the ts language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.ts'),
				language: 'typescript',
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
	test('tests all the yaml language', async () => {
		const [doc] = await Promise.all([
			vscode.workspace.openTextDocument({
				content: getFile('playground.yaml'),
				language: 'yaml',
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
