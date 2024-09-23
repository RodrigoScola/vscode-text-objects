import assert from 'assert';
import * as path from 'path';
import * as vscode from 'vscode';
import { default as Parser, default as parser } from 'web-tree-sitter';

// Initialize the parser with the correct path to the WebAssembly file

function getWasmPath(name: string) {
     return path.join(__dirname, '..', 'parsers', `${name}.wasm`); // Adjust the path if necessary
}
async function initParser(name: string) {
     const wasmPath = getWasmPath(name);
     await parser.init({
          locateFile: () => wasmPath,
     });
}

function makeName(str: string) {
     return `vscode-textobjects.${str}`;
}

const languages = {
     javascript: {
          parser: 'javascript',
     },
     treeSitter: {
          parser: 'tree-sitter',
     },
};

let p: Parser | null = null;

function getParser() {
     if (!p) {
          p = new Parser();
     }
     return p!;
}

type JoinedPoint = {
     startPosition: Parser.Point;
     endPosition: Parser.Point;
     startIndex: number;
     endIndex: number;
};

function groupNodes(matches: parser.QueryMatch[]) {
     const nodes: JoinedPoint[] = [];

     for (const match of matches) {
          match.captures.sort((a, b) => a.node.startIndex - b.node.startIndex);
          const firstNode = match.captures.at(0);
          const lastNode = match.captures.at(-1);
          if (!firstNode || !lastNode) {
               continue;
          }
          nodes.push({
               startPosition: firstNode.node.startPosition,
               endPosition: lastNode.node.endPosition,
               startIndex: firstNode.node.startIndex,
               endIndex: firstNode.node.endIndex,
          });
     }
     return nodes;
}

function closestToPosition(
     nodes: JoinedPoint[],
     index: vscode.Position
): JoinedPoint | null {
     if (nodes.length === 0) {
          return null;
     }
     let closestNode = nodes[0];
     let closestDistance =
          Math.abs(index.line - closestNode.startPosition.row) +
          Math.abs(index.character - closestNode.startPosition.column);

     for (const node of nodes) {
          const start = node.startPosition;
          const end = node.endPosition;

          // Check if the cursor is within the node's range
          if (
               (index.line > start.row ||
                    (index.line === start.row &&
                         index.character >= start.column)) &&
               (index.line < end.row ||
                    (index.line === end.row && index.character <= end.column))
          ) {
               return node;
          }

          if (
               start.row < index.line ||
               (start.row === index.line && start.column > index.character)
          ) {
               continue;
          }

          // Calculate the distance to the cursor position
          const distance =
               Math.abs(index.line - start.row) +
               Math.abs(index.character - start.column);
          if (distance < closestDistance) {
               closestNode = node;
               closestDistance = distance;
          }
     }

     return closestNode;
}

async function getLang() {
     const lang = await parser.Language.load(
          getWasmPath(languages.javascript.parser)
     );
     return lang;
}

class QueryCommand {
     myQuery: string;

     constructor(query: string) {
          this.myQuery = query;
     }
     async exec() {
          const editor = vscode.window.activeTextEditor;
          if (!editor) {
               return;
          }
          assert(this.myQuery, 'invalid query');
          assert(this.myQuery.length > 0, 'invalid query');

          const tree = getParser().parse(editor.document.getText());

          const cursor = editor.selection.active;

          const lang = await getLang();

          const textQuery = lang.query(this.myQuery);

          let matches = textQuery.matches(tree.rootNode);

          console.log(matches);
          const nodes = groupNodes(matches);
          const position = closestToPosition(nodes, cursor);

          if (!position) {
               vscode.window.showInformationMessage('no position found');
               return;
          }

          moveTo(position.startPosition, position.endPosition, editor);
     }
}

// This method is called when your extension is activated
export async function activate(context: vscode.ExtensionContext) {
     await initParser(languages.treeSitter.parser);

     const fncommand = new QueryCommand(
          `
(
  [
    (export_statement
      (function_declaration
        name: (identifier) @function.name
        body: (statement_block) @function.body
      ) @function) @export

    (function_declaration
      name: (identifier) @function.name
      body: (statement_block) @function.body
    ) @function
  ]
)

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

     const lang = await parser.Language.load(
          getWasmPath(languages.javascript.parser)
     );

     const p = getParser();
     p.setLanguage(lang);

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

function moveTo(
     startPosition: parser.Point,
     endPosition: parser.Point,
     editor: vscode.TextEditor
) {
     const endPos = new vscode.Position(endPosition.row, endPosition.column);
     const position = new vscode.Position(
          startPosition.row,
          startPosition.column
     ); // Create a new position object

     editor.selection = new vscode.Selection(position, endPos); // Move cursor to that position

     // Reveal the new cursor position in the editor
     editor.revealRange(new vscode.Range(position, position));
}

// This method is called when your extension is deactivated
export function deactivate() {}

