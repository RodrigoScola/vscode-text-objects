import assert from 'assert';
import * as vscode from 'vscode';
import { default as parser } from 'web-tree-sitter';
import { closestToPosition, JoinedPoint } from './motions/selection';
import { LanguageParser } from './parsing/parser';

// Initialize the parser with the correct path to the WebAssembly file

export function visualize(start: JoinedPoint, end: JoinedPoint): void {
     const editor = getEditor();
     if (!editor) {
          return;
     }
     const startPos = new vscode.Position(
          start.endPosition.row,
          start.endPosition.column
     );
     const endPos = new vscode.Position(
          end.startPosition.row,
          end.startPosition.column
     );
     editor.revealRange(new vscode.Range(startPos, endPos));
     editor.selection = new vscode.Selection(startPos, endPos); // Move cursor to that position
}

function makeName(str: string) {
     return `vscode-textobjects.${str}`;
}

function groupNodes(matches: parser.QueryMatch[]) {
     const nodes: JoinedPoint[] = [];

     for (const match of matches) {
          match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
          const firstNode = match.captures.at(0);
          const lastNode = match.captures.at(-1);
          if (!firstNode || !lastNode) {
               continue;
          }
          const node = {
               startPosition: firstNode.node.startPosition,
               endPosition: lastNode.node.endPosition,
               startIndex: firstNode.node.startIndex,
               endIndex: firstNode.node.endIndex,
          };
          visualize(node, node);
          nodes.push(node);
     }
     return nodes;
}

let currentEditor: vscode.TextEditor | undefined;
export function getEditor() {
     return currentEditor;
}

class QueryCommand {
     selector: string;

     constructor(query: string) {
          this.selector = query;
     }
     async exec() {
          const editor = vscode.window.activeTextEditor;
          if (!editor) {
               return;
          }
          currentEditor = editor;

          const cursor = editor.selection.active;

          assert(this.selector, 'invalid query');
          assert(this.selector.length > 0, 'invalid query');

          const parser = await LanguageParser.get('javascript');
          assert(parser, 'could not init parser');

          const tree = parser.parser.parse(editor.document.getText());

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

          select(startPos, endPos, editor);
     }
}

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
     LanguageParser.init();

     const fncommand = new QueryCommand(
          `
         (export_statement 
           (function_declaration
             name: (identifier) @function.name
             body: (statement_block) @function.body
           ) @exportedFunction) ? @export

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

     //to do variable declaration
     //const assValue = vscode.commands.registerCommand('no.assValue', () => {
     //});

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

function select(
     startPos: vscode.Position,
     endPos: vscode.Position,
     editor: vscode.TextEditor
) {
     editor.selection = new vscode.Selection(startPos, endPos); // Move cursor to that position
     editor.revealRange(
          new vscode.Range(startPos, endPos),
          vscode.TextEditorRevealType.InCenter
     );

     return editor;
}

export function deactivate() {}

