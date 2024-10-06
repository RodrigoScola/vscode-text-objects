import assert from 'assert';
import * as vscode from 'vscode';
import { QueryMatch } from 'web-tree-sitter';
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

interface Selector {
	function(): string;
	innerFunction(): string;
	loop(): string;
	innerLoop(): string;
	conditional(): string;
	innerConditional(): string;
	rhs(): string;
	variables(): string;
	class(): string;
	innerClass(): string;
	array(): string;
	object(): string;
	string(): string;
	innerString(): string;
}

class SelectorFactory {
	private static selectors: Record<string, Selector> = {};
	static set(lang: SupportedLanguages, selector: Selector) {
		SelectorFactory.selectors[lang] = selector;
	}
	static get(lang: SupportedLanguages): Selector {
		assert(
			lang in SelectorFactory.selectors,
			`language ${lang} not found in selectors`
		);
		return SelectorFactory.selectors[lang];
	}
}

export const GoQuery: Selector = {
	function() {
		return [
			`(function_declaration
               name :(identifier)? @function.name
               body: (_)? @function.body
               ) @function`,
			`
                (func_literal
                body: (_) @function.body
                ) @function
                `,
		].join('\n');
	},
	array() {
		return '';
	},
	class() {
		return '';
	},
	conditional() {
		return '';
	},
	innerClass() {
		return '';
	},
	innerConditional() {
		return '';
	},
	innerFunction() {
		return [
			`
                (func_literal
                block (_) @function.body
                ) 
                `,
		].join('\n');
	},
	innerLoop() {
		return '';
	},
	innerString() {
		return '';
	},
	loop() {
		return '';
	},
	object() {
		return '';
	},
	rhs() {
		return '';
	},
	string() {
		return '';
	},
	variables() {
		return '';
	},
};

SelectorFactory.set('go', GoQuery);

export const JsQuery: Selector = {
	function() {
		return [
			`(method_definition
               name: (property_identifier) @function.name
               body: (_) @function.body
               
               ) @function
               `,
			`(function_expression
  (identifier)? @function_name
  (#not-eq? @function_name "identifier")) @anonymous_function`,

			`
               (arrow_function 
            parameters: (formal_parameters 
              (identifier)) 
            body: (statement_block ) @function.body) @anonymous_function`,

			`(export_statement
                    (function_declaration
                    name: (identifier) @function.name
                    body: (statement_block) @function.body
                    ) @exportedFunction
               ) @export`,
			`
   (function_declaration
     name: (identifier) @function.name
     body: (statement_block) @function.body
     (#not-any? export_statement)
   ) @function
                `,
			`
   (lexical_declaration
               (variable_declarator
               name : (identifier) @function.name
   value: (arrow_function) @function.body
     )
   ) @function
                `,
			`
               (export_statement 
               (lexical_declaration
               (variable_declarator
               name: (identifier) @function.name
               value: (arrow_function) @function.body
          )
          )
          ) @function
                `,
			`
               (arrow_function
  (identifier)? @function_name
  (#not-eq? @function_name "identifier")) @anonymous_function
                `,
		].join('\n');
	},

	innerFunction() {
		return [
			`
                         (
                              (function_declaration
                              body: (statement_block
                                   (_)* @function_body
                              )
                         )
                    )
                         `,
			`

                    (function_expression
                    body: (statement_block
                    (_)* @function.body
                    )

               )
                    `,
			`
                              (arrow_function
                              body: (statement_block
                         (_)* @function_body
                         )
                         )
                              `,
			`(method_definition
                              body: (statement_block
                         (_)* @function.body
                              )

                              )
                              `,
		].join('\n');
	},

	loop() {
		return [
			` (for_statement) @loop
               (for_in_statement) @loop `,
		].join('\n');
	},

	innerLoop() {
		return [
			`     
     (for_statement
     body: (statement_block
     (_)* @loop_body))

     (for_in_statement
     body: (statement_block
     (_)* @loop_body))
     `,
		].join('\n');
	},

	conditional() {
		return [
			` (
          (if_statement) @if.statement
     ) `,
		].join('\n');
	},

	innerConditional() {
		return [
			` (if_statement
     consequence: (statement_block
     (_) @inner_statement))
     `,
		].join('\n');
	},

	rhs() {
		return [
			`(variable_declarator
     value: (_) @rhs)`,
		].join('\n');
	},

	variables() {
		return [
			` (lexical_declaration

                    (variable_declarator 
                         name: (identifier  )
                         value: (_) 
                         ) @variable_declarator
                    ) @lexical_declaration `,
		].join('\n');
	},

	class() {
		return [
			`
                    (export_statement
                    declaration: (
                    class_declaration 
                    name: (identifier) @class.name
                    body: (class_body) @class.body
                    ) @class
                    ) @export
                    `,
		].join('\n');
	},

	innerClass() {
		return [
			`
                    (export_statement
                    declaration: (
                    class_declaration 
                    body: (class_body
               (_)* @class.body
                    ) 
                    )
                    )
                    `,
		].join('\n');
	},

	array() {
		return ['(array) @array'].join('\n');
	},

	object() {
		return ['(object) @object'].join('\n');
	},

	innerString() {
		return [
			`(string
                    (_)* @string
               ) `,
			`(string`,
		].join('\n');
	},

	string() {
		return [`( string_fragment) @string`].join('\n');
	},
};

SelectorFactory.set('javascript', JsQuery);
SelectorFactory.set('javascriptreact', JsQuery);
SelectorFactory.set('typescript', JsQuery);
SelectorFactory.set('typescriptreact', JsQuery);
export class QueryCommand {
	readonly name: keyof Selector;

	private onMatch: ((matches: QueryMatch[]) => QueryMatch[]) | undefined;

	constructor(
		name: keyof Selector,
		onMatch?: ((matches: QueryMatch[]) => QueryMatch[]) | undefined
	) {
		this.name = name;
		this.onMatch = onMatch;
	}

	async goTo(context: QueryContext) {
		const parser = await LanguageParser.get(context.language);
		assert(
			parser,
			'could not init parser for ' + context.language + 'language'
		);
		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name]();
		assert(selector, 'invalid query for ' + context.language);

		const query = parser.language.query(selector);
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
		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = SelectorFactory.get(context.language)[this.name]();

		assert(selector, 'invalid selector for ' + context.language);

		const query = parser.language.query(selector);

		let matches = query.matches(tree.rootNode);

		if (typeof this.onMatch === 'function') {
			matches = this.onMatch(matches);
		}

		const group = groupNodes(matches);

		const position = closestToPosition(group, context.cursor);

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

		return {
			start: startPos,
			end: endPos,
		};
	}
}

async function getContext(
	currentEditor: vscode.TextEditor
): Promise<QueryContext> {
	const langName = currentEditor.document.languageId;
	const parser = await LanguageParser.get(currentEditor.document.languageId);
	assert(parser, `could not find parser for ${langName}`);
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
export const commands = {
	function: new QueryCommand('function', function (matches) {
		return filterLargestMatches(matches);
	}),

	innerFunction: new QueryCommand('innerFunction'),
	loop: new QueryCommand('loop'),
	innerLoop: new QueryCommand('innerLoop'),
	conditional: new QueryCommand('conditional'),
	rhs: new QueryCommand('rhs'),
	variables: new QueryCommand('variables'),
	innerString: new QueryCommand('innerString'),
	class: new QueryCommand('class'),
	innerClass: new QueryCommand('innerClass'),
	array: new QueryCommand('array'),
	object: new QueryCommand('object'),
	string: new QueryCommand('string'),
};

export function initCommands(context: vscode.ExtensionContext) {
	for (const command of Object.values(commands)) {
		context.subscriptions.push(
			InitSelect(
				makeName(`select.${command.name}`),
				command,
				function (position) {
					select(
						position.start,
						position.end,
						editor.getEditor()
					);
				}
			)
		);
	}
}

