import assert from 'assert';
import * as vscode from 'vscode';
import { Selection } from 'vscode';
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

export class QueryCommand {
	selector: Record<SupportedLanguages, string>;
	readonly name: string;

	private onMatch: ((matches: QueryMatch[]) => QueryMatch[]) | undefined;

	constructor(
		name: string,
		query: Record<SupportedLanguages, string>,
		onMatch?: ((matches: QueryMatch[]) => QueryMatch[]) | undefined
	) {
		this.name = name;
		this.selector = query;
		this.onMatch = onMatch;
	}

	async goTo(context: QueryContext) {
		const parser = await LanguageParser.get(context.language);
		assert(
			parser,
			'could not init parser for ' + context.language + 'language'
		);
		const tree = parser.parser.parse(context.text);

		const selector = this.selector[context.language];
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
		assert(this.selector, 'invalid query');

		const parser = await LanguageParser.get(context.language);

		assert(parser, `could not init parser for ${context.language}`);

		const tree = parser.parser.parse(context.text);

		const selector = this.selector[context.language];

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

export class JsCommands {
	getAll(): QueryCommand[] {
		return [
			this.function(),
			this.innerFunction(),
			this.loop(),
			this.innerLoop(),
			this.conditional(),
			this.innerConditional(),
			this.rhs(),
			this.variables(),
		];
	}
	function(): QueryCommand {
		const commands = [
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

		return new QueryCommand(
			makeName('selectFunction'),
			{
				javascript: `[${commands}]`,
				typescript: `[${commands}]`,
				javascriptreact: `[${commands}]`,
				typescriptreact: `[${commands}]`,
			},
			function (matches) {
				return filterLargestMatches(matches);
			}
		);
	}
	innerFunction(): QueryCommand {
		const commands = [
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
               (statement_block
               (_)* @function_body
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
		].join('\n');

		return new QueryCommand(makeName('innerFunction'), {
			javascript: `[${commands}]`,
			typescript: `[${commands}]`,
			javascriptreact: `[${commands}]`,
			typescriptreact: `[${commands}]`,
		});
	}
	loop() {
		const commands = [
			` (for_statement) @loop
          (for_in_statement) @loop `,
		].join('\n');
		return new QueryCommand(makeName('selectLoop'), {
			javascript: commands,
			typescript: commands,
			javascriptreact: commands,
			typescriptreact: commands,
		});
	}
	innerLoop() {
		const commands = [
			`     
(for_statement
  body: (statement_block
    (_)* @loop_body))

(for_in_statement
  body: (statement_block
    (_)* @loop_body))
`,
		].join('\n');
		return new QueryCommand(makeName('innerLoops'), {
			javascript: commands,
			typescript: commands,
			javascriptreact: commands,
			typescriptreact: commands,
		});
	}
	innerConditional() {
		const commands = [
			` (if_statement
  consequence: (statement_block
    (_) @inner_statement))
`,
		].join('\n');
		return new QueryCommand(makeName('innerConditional'), {
			javascript: commands,
			typescript: commands,
			javascriptreact: commands,
			typescriptreact: commands,
		});
	}
	conditional() {
		const commands = [
			` (
        (if_statement) @if.statement
    ) `,
		].join('\n');
		return new QueryCommand(makeName('selectConditional'), {
			javascript: commands,
			typescript: commands,
			javascriptreact: commands,
			typescriptreact: commands,
		});
	}
	rhs() {
		const commands = [
			`(variable_declarator
  value: (_) @rhs)`,
		].join('\n');
		return new QueryCommand(makeName('selectRhs'), {
			javascript: commands,
			typescript: commands,
			javascriptreact: commands,
			typescriptreact: commands,
		});
	}
	variables() {
		const commands = [
			` (lexical_declaration

               (variable_declarator 
                    name: (identifier  )
                    value: (_) 
                    ) @variable_declarator
               ) @lexical_declaration `,
		].join('\n');
		return new QueryCommand(makeName('selectVariable'), {
			javascript: commands,
			typescript: commands,
			javascriptreact: commands,
			typescriptreact: commands,
		});
	}
}

const jsCommands = new JsCommands();

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
	command: QueryCommand,
	afterEnd: (position: {
		start: vscode.Position;
		end: vscode.Position;
	}) => unknown
) {
	return vscode.commands.registerCommand(command.name, async () => {
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
	const gotoFunction = vscode.commands.registerCommand(
		makeName('goToFunction'),

		async () => {
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
			editor.getEditor().selection = new Selection(
				position.start,
				position.start
			);
		}
	);

	context.subscriptions.push(gotoFunction);

	for (const command of jsCommands.getAll()) {
		context.subscriptions.push(
			InitSelect(command, function (position) {
				select(position.start, position.end, editor.getEditor());
			})
		);
	}
}

