// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import assert from 'assert';
import { before } from 'mocha';
import * as vscode from 'vscode';
import { JsCommands, QueryCommand } from '../../motions/commands';
import { LanguageParser } from '../../parsing/parser';

let fncommand: QueryCommand;

before(async () => {
	await LanguageParser.init();
	fncommand = new JsCommands().function();
});

async function makeDoc(content: string) {
	return (
		await vscode.workspace.openTextDocument({
			content: content,
		})
	).getText();
}

type testChar = { character: number; line: number };
function assertPos(actual: testChar, expected: testChar) {
	assert.equal(expected.character, actual.character);
	assert.equal(expected.line, actual.line);
}

suite('function declarations', () => {
	test('can select default functions', async () => {
		const position = await fncommand.exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: await makeDoc(
				['function foo () {', '  return 1;', '}'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select default exported functions', async () => {
		const position = await fncommand.exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: await makeDoc(
				['export function foo () {', '  return 1;', '}'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select exports on functions from the inside', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				['export function foo () {', '  return 1;', '}'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select arrow functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				['const name = () => {', 'console.log("this")', '}'].join(
					'\n'
				)
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 1, line: 1 });
		assertPos(position.end, {
			character: 'const age = () => 2'.length,
			line: 1,
		});
	});
	test('can select exported arrow functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: await makeDoc(
				['const name = () => {', 'console.log("this")', '}'].join(
					'\n'
				)
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 1, line: 1 });
		assertPos(position.end, {
			character: 'const age = () => 2'.length,
			line: 1,
		});
	});
	test('can select exported arrow functions from the inside', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				['const name = () => {', 'console.log("this")', '}'].join(
					'\n'
				)
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 1, line: 1 });
		assertPos(position.end, {
			character: 'const age = () => 2'.length,
			line: 1,
		});
	});
	test('can select implicit arrow function returns', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: await makeDoc(
				[' ', 'const age = () => 2', ' '].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 1, line: 1 });
		assertPos(position.end, {
			character: 'const age = () => 2'.length,
			line: 1,
		});
	});
});

suite('higher order functions', () => {
	test('can select higher order functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: await makeDoc(
				['setup(function () {', "console.log('this')", '})'].join(
					'\n'
				)
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select higher order arrow functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(1, 0),
			language: 'javascript',
			text: await makeDoc(
				['setup(() => {', "console.log('this')", '})'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 6, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});
});

suite('functions within classes', () => {
	test('can select methods', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'class Person {',
					'greet() {',
					"console.log('this')",
					'}',
					'}',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 1 });
		assertPos(position.end, { character: 1, line: 3 });
	});

	test('can select arrow function methods', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'class Person {',
					'greet = () => {',
					"console.log('this')",
					'}',
					'}',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 1 });
		assertPos(position.end, { character: 1, line: 3 });
	});
});

suite('functions in objects', () => {
	test('can select functions inside objects', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'const p = {',
					'greet() {',
					"console.log('this')",
					'}',
					'}',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 1 });
		assertPos(position.end, { character: 1, line: 3 });
	});

	test('can select arrow functions inside objects', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'const p = {',
					'greet: () => {',
					"console.log('this')",
					'}',
					'}',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 1 });
		assertPos(position.end, { character: 1, line: 3 });
	});
});

suite('anonymous functions', () => {
	test('can select anonymous functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				['() => {', "console.log('this')", '})'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select anonymous arrow functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				['() => {', "console.log('this')", '}'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select anonymous functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				['(function()  {', "console.log('this')", '})'].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});
});

suite('variable functions', () => {
	test('can select functions assigned on variables', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'const name = function (name) {',
					'console.log(name)',
					'}',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});

	test('can select inside the array of functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'const fns = [',
					'function () {',
					"console.log('this')",
					'},',
					'function () {',
					"console.log('this')",
					'},',
					']',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 1 });
		assertPos(position.end, { character: 1, line: 3 });
	});

	test('can select inside the array of arrow functions', async () => {
		const position = await new JsCommands().function().exec({
			cursor: new vscode.Position(2, 0),
			language: 'javascript',
			text: await makeDoc(
				[
					'const fns = [',
					' {',
					"console.log('this')",
					'},',
					'() => {',
					"console.log('this')",
					'},',
					']',
				].join('\n')
			),
		});
		assert(position, 'position not found');
		assertPos(position.start, { character: 0, line: 1 });
		assertPos(position.end, { character: 1, line: 3 });
	});
});

suite('generator functions', () => {
	test('can select generator functions', async () => {
		const doc = await makeDoc(
			['function* generate() {', "console.log('this')", '}'].join('\n')
		);
		const position = await new JsCommands().function().exec({
		cursor: new vscode.Position(2,0),
		language: 'javascript',
		text: doc,

          });
          assert(position);
		assertPos(position.start, { character: 0, line: 0 });
		assertPos(position.end, { character: 1, line: 2 });
	});
});