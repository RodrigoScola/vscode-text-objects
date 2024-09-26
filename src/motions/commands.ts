import assert from 'assert';
import * as vscode from 'vscode';
import { editor } from '../extension';
import { groupNodes } from '../parsing/nodes';
import { LanguageParser } from '../parsing/parser';
import { closestToPosition, select } from './selection';

export function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}
export class QueryCommand {
	selector: string;

	constructor(query: string) {
		this.selector = query;
	}
	async exec() {
		const currentEditor = vscode.window.activeTextEditor;
		if (!currentEditor) {
			return;
		}
		editor.setEditor(currentEditor);

		const cursor = currentEditor.selection.active;

		assert(this.selector, 'invalid query');
		assert(this.selector.length > 0, 'invalid query');

		const parser = await LanguageParser.get('javascript');
		assert(parser, 'could not init parser');

		const tree = parser.parser.parse(currentEditor.document.getText());

		const query = parser.language.query(this.selector);

		let matches = query.matches(tree.rootNode);

		const position = closestToPosition(groupNodes(matches), cursor);

		if (!position) {
			return;
		}
		const endPos = new vscode.Position(
			position.endPosition.row,
			position.endPosition.column
		);
		const startPos = new vscode.Position(
			position.startPosition.row,
			position.startPosition.column
		);

		select(startPos, endPos, editor.getEditor());
	}
}
// [
//   ; Match the exported function declaration
//   (export_statement
//     (function_declaration
//       name: (identifier) @function.name
//       body: (statement_block) @function.body
//     ) @exportedFunction
//   ) @export

//   ; Match only the non-exported function declarations
//   (function_declaration
//     name: (identifier) @function.name
//     body: (statement_block) @function.body
//     (#not-any? export_statement)
//   ) @function
// ]

export function initCommands(context: vscode.ExtensionContext) {
	const fncommand = new QueryCommand(
		`
[
  ; Match the exported function declaration
  (export_statement
    (function_declaration
      name: (identifier) @function.name
      body: (statement_block) @function.body
    ) @exportedFunction
  ) @export

]


		`
	);

	const innerfn = new QueryCommand(
		`
          (
          (function_declaration
          body: (statement_block
     (_)* @function_body
          )
     )
     )
          `
	);

	const loopcommand = new QueryCommand(
		` (for_statement) @loop
          
          (for_in_statement) @loop `
	);

	const rhscommand = new QueryCommand(
		`(variable_declarator
  value: (_) @rhs)`
	);

	const innerloopcommand = new QueryCommand(
		`     
(for_statement
  body: (statement_block
    (_)* @loop_body))

(for_in_statement
  body: (statement_block
    (_)* @loop_body))
`
	);

	const innerConditionalCommand = new QueryCommand(`
(if_statement
  consequence: (statement_block
    (_) @inner_statement))
`);

	const conditionalCommand = new QueryCommand(
		`
    (
        (if_statement) @if.statement
    )
    `
	);

	const innerFn = vscode.commands.registerCommand(
		makeName('innerFunction'),
		() => {
			innerfn.exec();
		}
	);

	const outerFunction = vscode.commands.registerCommand(
		makeName('function'),
		() => {
			fncommand.exec();
		}
	);

	const forLoops = vscode.commands.registerCommand(makeName('loops'), () => {
		loopcommand.exec();
	});

	const innerConditional = vscode.commands.registerCommand(
		makeName('innerConditional'),
		() => {
			innerConditionalCommand.exec();
		}
	);

	const conditional = vscode.commands.registerCommand(
		makeName('conditional'),
		() => {
			conditionalCommand.exec();
		}
	);
	const innerLoops = vscode.commands.registerCommand(
		makeName('innerLoops'),
		() => {
			innerloopcommand.exec();
		}
	);
	const rhsCommand = vscode.commands.registerCommand(makeName('rhs'), () => {
		rhscommand.exec();
	});

	context.subscriptions.push(rhsCommand);
	context.subscriptions.push(innerLoops);
	context.subscriptions.push(conditional);
	context.subscriptions.push(innerConditional);
	context.subscriptions.push(forLoops);
	context.subscriptions.push(outerFunction);
	context.subscriptions.push(innerFn);
}

