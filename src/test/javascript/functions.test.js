"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const assert_1 = __importDefault(require("assert"));
const mocha_1 = require("mocha");
const vscode = __importStar(require("vscode"));
const commands_1 = require("../../motions/commands");
const parser_1 = require("../../parsing/parser");
let fncommand;
(0, mocha_1.before)(async () => {
    await parser_1.LanguageParser.init();
    fncommand = new commands_1.JsCommands().function();
});
async function makeDoc(content) {
    return (await vscode.workspace.openTextDocument({
        content: content,
    })).getText();
}
function assertPos(actual, expected) {
    assert_1.default.equal(actual.character, expected.character, 'invalid character position');
    assert_1.default.equal(expected.line, actual.line, 'invalid line position');
}
suite('function declarations', () => {
    test('can select default functions', async () => {
        const position = await fncommand.exec({
            cursor: new vscode.Position(1, 0),
            language: 'javascript',
            text: await makeDoc(['function foo () {', '  return 1;', '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
    test('can select default exported functions', async () => {
        const position = await fncommand.exec({
            cursor: new vscode.Position(1, 0),
            language: 'javascript',
            text: await makeDoc(['export function foo () {', '  return 1;', '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
    test('can select exports on functions from the inside', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(2, 0),
            language: 'javascript',
            text: await makeDoc(['export function foo () {', '  return 1;', '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
    test('can select arrow functions', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(2, 0),
            language: 'javascript',
            text: await makeDoc(['const name = () => {', 'console.log("this")', '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, {
            line: 2,
            character: 1,
        });
    });
    test('can select exported arrow functions', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(1, 0),
            language: 'javascript',
            text: await makeDoc(['const name = () => {', 'console.log("this")', '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, {
            character: 1,
            line: 2,
        });
    });
    test('can select exported arrow functions from the inside', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(2, 0),
            language: 'javascript',
            text: await makeDoc(['const name = () => {', 'console.log("this")', '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, {
            character: 1,
            line: 2,
        });
    });
});
suite('higher order functions', () => {
    test('can select higher order functions', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(1, 0),
            language: 'javascript',
            text: await makeDoc(['setup(function () {', "console.log('this')", '})'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 6, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
    test('can select higher order arrow functions', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(1, 0),
            language: 'javascript',
            text: await makeDoc(['setup(() => {', "console.log('this')", '})'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 6, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
});
suite('anonymous functions', () => {
    test('can select anonymous arrow functions', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(2, 0),
            language: 'javascript',
            text: await makeDoc(['() => {', "console.log('this')", '}'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 0, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
    test('can select anonymous functions', async () => {
        const position = await new commands_1.JsCommands().function().exec({
            cursor: new vscode.Position(2, 0),
            language: 'javascript',
            text: await makeDoc(['(function()  {', "console.log('this')", '})'].join('\n')),
        });
        (0, assert_1.default)(position, 'position not found');
        assertPos(position.start, { character: 1, line: 0 });
        assertPos(position.end, { character: 1, line: 2 });
    });
});
//todo ->
// suite('variable functions', () => {
// 	test('can select functions assigned on variables', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'const name = function (name) {',
// 					'console.log(name)',
// 					'}',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 0 });
// 		assertPos(position.end, { character: 1, line: 2 });
// 	});
// 	test('can select inside the array of functions', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'const fns = [',
// 					'function () {',
// 					"console.log('this')",
// 					'},',
// 					'function () {',
// 					"console.log('this')",
// 					'},',
// 					']',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 1 });
// 		assertPos(position.end, { character: 1, line: 3 });
// 	});
// 	test('can select inside the array of arrow functions', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'const fns = [',
// 					' {',
// 					"console.log('this')",
// 					'},',
// 					'() => {',
// 					"console.log('this')",
// 					'},',
// 					']',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 1 });
// 		assertPos(position.end, { character: 1, line: 3 });
// 	});
// });
// suite('functions within classes', () => {
// 	test('can select methods', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'class Person {',
// 					'greet() {',
// 					"console.log('this')",
// 					'}',
// 					'}',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 1 });
// 		assertPos(position.end, { character: 1, line: 3 });
// 	});
// 	test('can select arrow function methods', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'class Person {',
// 					'greet = () => {',
// 					"console.log('this')",
// 					'}',
// 					'}',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 1 });
// 		assertPos(position.end, { character: 1, line: 3 });
// 	});
// });
// suite('functions in objects', () => {
// 	test('can select functions inside objects', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'const p = {',
// 					'greet() {',
// 					"console.log('this')",
// 					'}',
// 					'}',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 1 });
// 		assertPos(position.end, { character: 1, line: 3 });
// 	});
// 	test('can select arrow functions inside objects', async () => {
// 		const position = await new JsCommands().function().exec({
// 			cursor: new vscode.Position(2, 0),
// 			language: 'javascript',
// 			text: await makeDoc(
// 				[
// 					'const p = {',
// 					'greet: () => {',
// 					"console.log('this')",
// 					'}',
// 					'}',
// 				].join('\n')
// 			),
// 		});
// 		assert(position, 'position not found');
// 		assertPos(position.start, { character: 0, line: 1 });
// 		assertPos(position.end, { character: 1, line: 3 });
// 	});
// });
// suite('generator functions', () => {
// 	test('can select generator functions', async () => {
// 		const doc = await makeDoc(
// 			['function* generate() {', "console.log('this')", '}'].join('\n')
// 		);
// 		const position = await new JsCommands().function().exec({
// 		cursor: new vscode.Position(2,0),
// 		language: 'javascript',
// 		text: doc,
//           });
//           assert(position);
// 		assertPos(position.start, { character: 0, line: 0 });
// 		assertPos(position.end, { character: 1, line: 2 });
// 	});
// });
//# sourceMappingURL=functions.test.js.map