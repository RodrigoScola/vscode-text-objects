import assert from 'assert';
import * as vscode from 'vscode';
import { Selection } from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
import { NODES } from '../constants';
import { editor } from '../extension';
import { filterLargestMatches, groupNodes } from '../parsing/nodes';
import { LanguageParser, SupportedLanguages } from '../parsing/parser';
import { closestToPosition, nextToPosition, select } from './selection';

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

	async goTo(context: QueryContext) {
		assert(this.selector, 'invalid query');
		assert(this.selector.length > 0, 'invalid query');

		const parser = await LanguageParser.get(context.language);
		assert(parser, 'could not init parser');

		const tree = parser.parser.parse(context.text);

		const query = parser.language.query(this.selector);

		let matches = query.matches(tree.rootNode);

		if (typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const position = nextToPosition(groupNodes(matches), context.cursor);

		if (!position) {
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

		return ret;
	}
	async exec(context: QueryContext) {
		assert(this.selector, 'invalid query');
		assert(this.selector.length > 0, 'invalid query');

		const parser = await LanguageParser.get(context.language);
		assert(parser, 'could not init parser');

		const tree = parser.parser.parse(context.text);

		const query = parser.language.query(this.selector);

		let matches = query.matches(tree.rootNode);

		if (typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const position = closestToPosition(
			groupNodes(matches),
			context.cursor
		);

		if (!position) {
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

		return ret;
	}
}

export class JsCommands {
	function(): QueryCommand {
		return new QueryCommand(
			` [

               ( call_expression
                arguments: (arguments
(arrow_function
  parameters: (formal_parameters) @function.name
  body: (statement_block) @body
  @arrow-function) @function))


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

   ; arrow functions
   (lexical_declaration
               (variable_declarator
   value: (arrow_function) @function.body
     )
   ) @function
               (export_statement 
               (lexical_declaration
               (variable_declarator
               name: (identifier) @function.name
               value: (arrow_function) @function.body
          )
          )
          ) @function


 ] `,
			function (matches) {
				return filterLargestMatches(matches, NODES.FUNCTION_NAME);
			}
		);
	}
	innerFunction(): QueryCommand {
		return new QueryCommand(
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
	}
	loop() {
		return new QueryCommand(
			` (for_statement) @loop
          
          (for_in_statement) @loop `
		);
	}
	innerLoop() {
		return new QueryCommand(
			`     
(for_statement
  body: (statement_block
    (_)* @loop_body))

(for_in_statement
  body: (statement_block
    (_)* @loop_body))
`
		);
	}
	innerConditional() {
		return new QueryCommand(
			`
(if_statement
  consequence: (statement_block
    (_) @inner_statement))
`
		);
	}
	conditional() {
		return new QueryCommand(
			`
    (
        (if_statement) @if.statement
    )
    `
		);
	}
	rhs() {
		return new QueryCommand(
			`(variable_declarator
  value: (_) @rhs)`
		);
	}
}

const jsCommands = new JsCommands();

async function getContext(
	currentEditor: vscode.TextEditor
): Promise<QueryContext> {
	const langName = currentEditor.document.languageId;
	const parser = await LanguageParser.get(langName);
	assert(parser, 'could not find parser');
	return {
		text: currentEditor.document.getText(),
		cursor: currentEditor.selection.active,
		language: langName as SupportedLanguages,
	};
}
function InitSelect(
	name: string,
	command: QueryCommand,
	afterEnd: (position: {
		start: vscode.Position;
		end: vscode.Position;
	}) => unknown
) {
	return vscode.commands.registerCommand(name, async () => {
		const currentEditor = vscode.window.activeTextEditor;
		if (!currentEditor) {
			return;
		}
		editor.setEditor(currentEditor);
		const context = await getContext(currentEditor);
		const position = await command.exec(context);
		if (!position) {
			return;
		}
		afterEnd(position);
	});
}
export function initCommands(context: vscode.ExtensionContext) {
	const selectRange = function (position: {
		start: vscode.Position;
		end: vscode.Position;
	}): void {
		select(position.start, position.end, editor.getEditor());
	};
	const innerFn = InitSelect(
		makeName('innerFunction'),
		jsCommands.innerFunction(),
		selectRange
	);

	const gotoFunction  = vscode.commands.registerCommand(
          makeName('goToFunction')
          
          , async () => {
		const currentEditor = vscode.window.activeTextEditor;
		if (!currentEditor) {
			return;
		}
		editor.setEditor(currentEditor);
		const context = await getContext(currentEditor);
		const position = await jsCommands.function().goTo(context);
		if (!position) {
			return;
		}
          editor.getEditor().selection = new Selection(position.start, position.start);
	});

	const outerFunction = InitSelect(
		makeName('function'),
		jsCommands.function(),
		function (position) {
			select(position.start, position.end, editor.getEditor());
		}
	);
	const forLoops = InitSelect(
		makeName('loops'),
		jsCommands.loop(),
		function (position) {
			select(position.start, position.end, editor.getEditor());
		}
	);

	const innerConditional = InitSelect(
		makeName('innerConditional'),
		jsCommands.innerConditional(),
		function (position) {
			select(position.start, position.end, editor.getEditor());
		}
	);

	const conditional = InitSelect(
		makeName('conditional'),
		jsCommands.conditional(),
		function (position) {
			select(position.start, position.end, editor.getEditor());
		}
	);

	const innerLoops = InitSelect(
		makeName('innerLoops'),
		jsCommands.innerLoop(),

		function (position) {
			select(position.start, position.end, editor.getEditor());
		}
	);

	const rhsCommand = InitSelect(
		makeName('rhs'),
		jsCommands.rhs(),
		function (position) {
			select(position.start, position.end, editor.getEditor());
		}
	);

	context.subscriptions.push(rhsCommand);
	context.subscriptions.push(innerLoops);
	context.subscriptions.push(conditional);
	context.subscriptions.push(innerConditional);
	context.subscriptions.push(forLoops);
	context.subscriptions.push(outerFunction);
	context.subscriptions.push(gotoFunction);
	context.subscriptions.push(innerFn);
}
