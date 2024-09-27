import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { NODES } from '../constants';
import { editor } from '../extension';
import { filterLargestMatches, groupNodes } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { closestToPosition, select } from './selection';

export function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}

export type QueryContext = {
	cursor: vscode.Position;
	text: string;
	language: SupportedLanguages;
};

export class QueryCommand {
	selector: string;

	private onMatch: ((matches: QueryMatch[]) => QueryMatch[]) | undefined;

	constructor(
		query: string,
		onMatch?: ((matches: QueryMatch[]) => QueryMatch[]) | undefined
	) {
		this.selector = query;
		this.onMatch = onMatch;
	}
	async exec(context: QueryContext) {
		assert(this.selector, 'invalid query');
		assert(this.selector.length > 0, 'invalid query');

		const parser = await LanguageParser.get('javascript');
		assert(parser, 'could not init parser');

		const tree = parser.parser.parse(context.text);

		const query = parser.language.query(this.selector);

		let matches = query.matches(tree.rootNode);

		if (this.onMatch && typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const position = closestToPosition(
			groupNodes(matches),
			context.cursor
		);

		if (!position) {
			console.log('function not actually found');
			return;
		}

		const startPos = new vscode.Position(
			position.startPosition.row,
			position.startPosition.column
		);

		const endPos = new vscode.Position(
			position.endPosition.row,
			position.endPosition.column
		);

		const ret = {
			start: startPos,
			end: endPos,
		};

		console.log(ret);
		console.log('start', {
			line: ret.start.line,
			char: ret.start.character,
		});

		console.log('end', {
			line: ret.end.line,
			char: ret.end.character,
		});
		return ret;
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

export class JsCommands {
	function() {
		return new QueryCommand(
			` [
   ; Match the exported function declaration
   (export_statement
     (function_declaration
       name: (identifier) @function.name
       body: (statement_block) @function.body
     ) @exportedFunction
   ) @export

   ; Match only the non-exported function declarations
   (function_declaration
     name: (identifier) @function.name
     body: (statement_block) @function.body
     (#not-any? export_statement)
   ) @function
 ] `,
			function (matches) {
				return filterLargestMatches(matches, NODES.FUNCTION_NAME);
			}
		);
	}
}

const jsCommands = new JsCommands();

function getContext(currentEditor: vscode.TextEditor): QueryContext {
	return {
		text: currentEditor.document.getText(),
		cursor: currentEditor.selection.active,
		language: 'javascript',
	};
}

export function initCommands(context: vscode.ExtensionContext) {
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
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await innerfn.exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);

	const outerFunction = vscode.commands.registerCommand(
		makeName('function'),
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await jsCommands.function().exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);

	const forLoops = vscode.commands.registerCommand(
		makeName('loops'),
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await loopcommand.exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);

	const innerConditional = vscode.commands.registerCommand(
		makeName('innerConditional'),
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await innerConditionalCommand.exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);

	const conditional = vscode.commands.registerCommand(
		makeName('conditional'),
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await conditionalCommand.exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);
	const innerLoops = vscode.commands.registerCommand(
		makeName('innerLoops'),
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await innerloopcommand.exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);
	const rhsCommand = vscode.commands.registerCommand(
		makeName('rhs'),
		async () => {
			const currentEditor = vscode.window.activeTextEditor;
			if (!currentEditor) {
				return;
			}
			editor.setEditor(currentEditor);
			const context = getContext(currentEditor);
			const position = await rhscommand.exec(context);
			if (!position) {
				return;
			}

			select(position.start, position.end, editor.getEditor());
		}
	);

	context.subscriptions.push(rhsCommand);
	context.subscriptions.push(innerLoops);
	context.subscriptions.push(conditional);
	context.subscriptions.push(innerConditional);
	context.subscriptions.push(forLoops);
	context.subscriptions.push(outerFunction);
	context.subscriptions.push(innerFn);
}

