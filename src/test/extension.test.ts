import * as assert from 'assert';
import * as vscode from 'vscode';
import { init, commands, addSelectors, getCommandName, setupCommand } from '../motions/commands';
import fs from 'fs';
import path from 'path';
import Function from '../motions/queries/Function';
import { createYankNext } from '../motions/modifiers';
import { LanguageParser } from '../parsing/parser';
import { getContext } from '../context/context';
import { start } from 'repl';

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

/**
 *  todo: maybe think of a better way to do this?
 *
 * 	this is working. its just a lot of things to change if it goes wrong
 */

// suite('yank suite', () => {
// 	test('should yank outer function', async () => {
// 		const doc = await vscode.workspace.openTextDocument({
// 			content: getFile('playground.js'),
// 			language: 'javascript',
// 		});

// 		LanguageParser.init();
// 		const editor = await vscode.window.showTextDocument(doc);

// 		const command = commands.find((command) => {
// 			return (
// 				command.name === 'function' &&
// 				command.direction === 'next' &&
// 				command.scope === 'outer' &&
// 				command.action === 'yank'
// 			);
// 		});
// 		assert.equal(Boolean(command), true, 'cannot find select function command?');

// 		setupCommand(command!);

// 		await wait(200);

// 		assert.equal(
// 			editor.selection.start.isEqual(editor.selection.end),
// 			true,
// 			'not an empty selection after copy'
// 		);
// 		// assert.equal(1, 4);
// 	});
// });

suite('Extension Test Suite', () => {
	// Cleanup after tests
	suiteTeardown(async () => {
		await vscode.commands.executeCommand('workbench.action.closeAllEditors');
	});

	test('tests all the c language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.c'),
			language: 'c',
		});

		await LanguageParser.init();
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc)]);

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
		await LanguageParser.init();
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc)]);

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
		await LanguageParser.init();

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc)]);

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
			language: 'csharp',
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

			// i hate this however i am not going to rewrite the go file to make 5 lines of the test go away...
			if (command.direction === 'next') {
				const start = new vscode.Position(0, 0);
				editor.selection = new vscode.Selection(start, start);
			} else {
				const end = new vscode.Position(editor.document.lineCount, 0);
				editor.selection = new vscode.Selection(end, end);
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
		const invalid: CommandNames[] = [
			'call',
			'node',
			'type',
			'function',
			'parameters',
			'loop',
			'conditional',
			'class',
			'comment',
		];

		for (const command of commands) {
			if (command.action !== 'select' || invalid.includes(command.name)) {
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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.jsonc'),
			language: 'jsonc',
		});
		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

		const invalid: CommandNames[] = [
			'call',
			'type',
			'function',
			'parameters',
			'loop',
			'node',
			'conditional',
			'class',
		];

		for (const command of commands) {
			if (command.action !== 'select' || invalid.includes(command.name)) {
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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.jsx'),
			language: 'javascriptreact',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

		const invalid: CommandNames[] = ['type'];

		for (const command of commands) {
			if (command.action !== 'select' || invalid.includes(command.name)) {
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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.lua'),
			language: 'lua',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);
		const invalid: CommandNames[] = ['type', 'class'];

		for (const command of commands) {
			if (command.action !== 'select' || invalid.includes(command.name)) {
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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.py'),
			language: 'python',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

		const invalidNames: CommandNames[] = ['type'];

		for (const command of commands) {
			if (command.action !== 'select' || invalidNames.includes(command.name)) {
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
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.rs'),
			language: 'rust',
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

	/** toml is not as a language. it displays plaintext as of dec 2024 */
	// test('tests all the toml language', async () => {
	// 	const doc = await vscode.workspace.openTextDocument({
	// 		content: getFile('playground.toml'),
	// 		language: 'toml',
	// 	});

	// 	const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

	// 	const unavailable: CommandNames[] = ['function'];

	// 	for (const command of commands) {
	// 		if (command.action !== 'select') {
	// 			continue;
	// 		}
	// 		await setupCommand(command);

	// 		assert.equal(
	// 			editor.selection.start.isBefore(editor.selection.end),
	// 			true,
	// 			`did not ${getCommandName(command)} correctly`
	// 		);
	// 		vscode.commands.executeCommand('cancelSelection');
	// 	}
	// });

	test('tests all the tsx language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.tsx'),
			language: 'typescriptreact',
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

	test('tests all the ts language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.ts'),
			language: 'typescript',
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
	test('tests all the yaml language', async () => {
		const doc = await vscode.workspace.openTextDocument({
			content: getFile('playground.yaml'),
			language: 'yaml',
		});

		const [editor] = await Promise.all([vscode.window.showTextDocument(doc), LanguageParser.init()]);

		const invalid: CommandNames[] = ['array', 'function', 'loop', 'conditional', 'parameters', 'type'];

		for (const command of commands) {
			if (command.action !== 'select' || invalid.includes(command.name)) {
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
