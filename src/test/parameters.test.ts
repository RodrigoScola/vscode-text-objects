import * as assert from 'assert';
import * as vscode from 'vscode';
import { commands, getCommandName, setupCommand } from '../motions/commands';
import { LanguageParser } from '../parsing/parser';

type ParamsCase = {
	language: string;
	content: string;
	// function names in document order, each one is followed by its parameter list
	functions: string[];
};

// every case has an empty parameter list between two non empty ones
const cases: ParamsCase[] = [
	{
		language: 'javascript',
		content: ['function withArg(a) {}', 'function noArgs() {}', 'function twoArgs(b, c) {}'].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'javascriptreact',
		content: ['function withArg(a) {}', 'function noArgs() {}', 'function twoArgs(b, c) {}'].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'typescript',
		content: [
			'function withArg(a: number) {}',
			'function noArgs() {}',
			'function twoArgs(b: string, c: number) {}',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'typescriptreact',
		content: [
			'function withArg(a: number) {}',
			'function noArgs() {}',
			'function twoArgs(b: string, c: number) {}',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'python',
		content: [
			'def withArg(a):',
			'    pass',
			'def noArgs():',
			'    pass',
			'def twoArgs(b, c):',
			'    pass',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'c',
		content: ['void withArg(int a) {}', 'void noArgs() {}', 'void twoArgs(int b, int c) {}'].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'cpp',
		content: ['void withArg(int a) {}', 'void noArgs() {}', 'void twoArgs(int b, int c) {}'].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'csharp',
		content: [
			'class Test {',
			'    void withArg(int a) {}',
			'    void noArgs() {}',
			'    void twoArgs(int b, int c) {}',
			'}',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'java',
		content: [
			'class Test {',
			'    void withArg(int a) {}',
			'    void noArgs() {}',
			'    void twoArgs(int b, int c) {}',
			'}',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'go',
		content: [
			'package main',
			'',
			'func withArg(a int) {}',
			'func noArgs() {}',
			'func twoArgs(b int, c int) {}',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'rust',
		content: ['fn with_arg(a: i32) {}', 'fn no_args() {}', 'fn two_args(b: i32, c: i32) {}'].join('\n'),
		functions: ['with_arg', 'no_args', 'two_args'],
	},
	{
		language: 'lua',
		content: ['function withArg(a) end', 'function noArgs() end', 'function twoArgs(b, c) end'].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
	{
		language: 'php',
		content: [
			'<?php',
			'function withArg($a) {}',
			'function noArgs() {}',
			'function twoArgs($b, $c) {}',
		].join('\n'),
		functions: ['withArg', 'noArgs', 'twoArgs'],
	},
];

function findCommand(
	name: CommandNames,
	direction: CommandDirection,
	position: CommandPosition
): Command {
	const command = commands.find(
		(c) =>
			c.action === 'goTo' &&
			c.name === name &&
			c.scope === 'outer' &&
			c.direction === direction &&
			c.position === position
	);
	assert.ok(command, `could not find go to ${direction} ${name} ${position} command`);
	return command;
}

// position of the opening paren of each function's parameter list
function openParens(doc: vscode.TextDocument, functions: string[]): vscode.Position[] {
	const text = doc.getText();
	return functions.map((name) => {
		const index = text.indexOf(name + '(');
		assert.notEqual(index, -1, `could not find ${name}( in test content`);
		return doc.positionAt(index + name.length);
	});
}

// position of the closing paren of each function's parameter list
function closeParens(doc: vscode.TextDocument, functions: string[]): vscode.Position[] {
	const text = doc.getText();
	return openParens(doc, functions).map((open) => {
		const index = text.indexOf(')', doc.offsetAt(open));
		assert.notEqual(index, -1, 'could not find closing paren in test content');
		return doc.positionAt(index);
	});
}

function moveCursor(editor: vscode.TextEditor, pos: vscode.Position): void {
	editor.selection = new vscode.Selection(pos, pos);
}

async function expectJumps(
	editor: vscode.TextEditor,
	command: Command,
	expected: vscode.Position[]
): Promise<void> {
	for (const [i, pos] of expected.entries()) {
		await setupCommand(command);
		const cursor = editor.selection.active;
		assert.deepEqual(
			{ line: cursor.line, character: cursor.character },
			{ line: pos.line, character: pos.character },
			`${getCommandName(command)} jump ${i + 1}`
		);
	}
}

suite('go to parameters', () => {
	suiteSetup(async () => {
		await LanguageParser.init();
	});

	suiteTeardown(async () => {
		await vscode.commands.executeCommand('workbench.action.closeAllEditors');
	});

	for (const c of cases) {
		suite(c.language, () => {
			let editor: vscode.TextEditor;

			setup(async () => {
				const doc = await vscode.workspace.openTextDocument({ content: c.content, language: c.language });
				editor = await vscode.window.showTextDocument(doc);
			});

			test('go to next parameters start does not skip empty parameters', async () => {
				moveCursor(editor, new vscode.Position(0, 0));
				await expectJumps(editor, findCommand('parameters', 'next', 'start'), openParens(editor.document, c.functions));
			});

			test('go to previous parameters start does not skip empty parameters', async () => {
				const doc = editor.document;
				moveCursor(editor, doc.lineAt(doc.lineCount - 1).range.end);
				await expectJumps(
					editor,
					findCommand('parameters', 'previous', 'start'),
					openParens(doc, c.functions).reverse()
				);
			});

			test('go to next parameters end does not skip empty parameters', async () => {
				moveCursor(editor, new vscode.Position(0, 0));
				await expectJumps(editor, findCommand('parameters', 'next', 'end'), closeParens(editor.document, c.functions));
			});

			test('go to previous parameters end does not skip empty parameters', async () => {
				const doc = editor.document;
				moveCursor(editor, doc.lineAt(doc.lineCount - 1).range.end);
				await expectJumps(editor, findCommand('parameters', 'previous', 'end'), closeParens(doc, c.functions).reverse());
			});
		});
	}
});

type FunctionCase = {
	language: string;
	content: string;
	// lines where each function ends, in document order
	endLines: number[];
};

const functionCases: FunctionCase[] = [
	{
		language: 'javascript',
		content: ['function a() {}', 'function b(x) {}', 'function c() {}'].join('\n'),
		endLines: [0, 1, 2],
	},
	{
		language: 'typescript',
		content: ['function a(): void {}', 'function b(x: number) {}', 'function c() {}'].join('\n'),
		endLines: [0, 1, 2],
	},
	{
		language: 'python',
		content: ['def a():', '    pass', 'def b(x):', '    pass', 'def c():', '    pass'].join('\n'),
		endLines: [1, 3, 5],
	},
];

suite('go to function end', () => {
	suiteSetup(async () => {
		await LanguageParser.init();
	});

	suiteTeardown(async () => {
		await vscode.commands.executeCommand('workbench.action.closeAllEditors');
	});

	for (const c of functionCases) {
		suite(c.language, () => {
			let editor: vscode.TextEditor;
			let ends: vscode.Position[];

			setup(async () => {
				const doc = await vscode.workspace.openTextDocument({ content: c.content, language: c.language });
				editor = await vscode.window.showTextDocument(doc);
				ends = c.endLines.map((line) => doc.lineAt(line).range.end.translate(0, -1));
			});

			test('go to next function end moves past the function the cursor is at the end of', async () => {
				moveCursor(editor, ends[0]);
				await expectJumps(editor, findCommand('function', 'next', 'end'), ends.slice(1));
			});

			test('go to previous function end moves past the function the cursor is at the end of', async () => {
				moveCursor(editor, ends[ends.length - 1]);
				await expectJumps(editor, findCommand('function', 'previous', 'end'), ends.slice(0, -1).reverse());
			});

			test('go to previous function end from right after a function goes to that function', async () => {
				moveCursor(editor, ends[1].translate(0, 1));
				await expectJumps(editor, findCommand('function', 'previous', 'end'), [ends[1], ends[0]]);
			});
		});
	}
});
