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
exports.JsCommands = exports.QueryCommand = void 0;
exports.makeName = makeName;
exports.initCommands = initCommands;
const assert_1 = __importDefault(require("assert"));
const vscode = __importStar(require("vscode"));
const extension_1 = require("../extension");
const nodes_1 = require("../parsing/nodes");
const parser_1 = require("../parsing/parser");
const selection_1 = require("./selection");
function makeName(str) {
    return `vscode-textobjects.${str}`;
}
class QueryCommand {
    selector;
    name;
    onMatch;
    constructor(name, query, onMatch) {
        this.name = name;
        this.selector = query;
        this.onMatch = onMatch;
    }
    async goTo(context) {
        const parser = await parser_1.LanguageParser.get(context.language);
        (0, assert_1.default)(parser, 'could not init parser for ' + context.language + 'language');
        const tree = parser.parser.parse(context.text);
        const selector = this.selector[context.language];
        (0, assert_1.default)(selector, 'invalid query for ' + context.language);
        const query = parser.language.query(selector);
        let matches = query.matches(tree.rootNode);
        if (typeof this.onMatch === 'function') {
            matches = this.onMatch(matches);
        }
        const position = (0, selection_1.nextToPosition)((0, nodes_1.groupNodes)(matches), context.cursor);
        if (!position) {
            return;
        }
        const startPos = new vscode.Position(position.startPosition.row, position.startPosition.column);
        const endPos = new vscode.Position(position.endPosition.row, position.endPosition.column);
        const ret = {
            start: startPos,
            end: endPos,
        };
        return ret;
    }
    async exec(context) {
        (0, assert_1.default)(this.selector, 'invalid query');
        const parser = await parser_1.LanguageParser.get(context.language);
        (0, assert_1.default)(parser, `could not init parser for ${context.language}`);
        const tree = parser.parser.parse(context.text);
        const selector = this.selector[context.language];
        (0, assert_1.default)(selector, 'invalid selector for ' + context.language);
        const query = parser.language.query(selector);
        let matches = query.matches(tree.rootNode);
        if (typeof this.onMatch === 'function') {
            matches = this.onMatch(matches);
        }
        const group = (0, nodes_1.groupNodes)(matches);
        const position = (0, selection_1.closestToPosition)(group, context.cursor);
        if (!position) {
            return;
        }
        const startPos = new vscode.Position(position.startPosition.row, position.startPosition.column);
        const endPos = new vscode.Position(position.endPosition.row, position.endPosition.column);
        return {
            start: startPos,
            end: endPos,
        };
    }
}
exports.QueryCommand = QueryCommand;
class JsCommands {
    getAll() {
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
    function() {
        const commands = [
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
        return new QueryCommand(makeName('selectFunction'), {
            javascript: `[${commands}]`,
            typescript: `[${commands}]`,
            javascriptreact: `[${commands}]`,
            typescriptreact: `[${commands}]`,
        }, function (matches) {
            return (0, nodes_1.filterLargestMatches)(matches);
        });
    }
    innerFunction() {
        const commands = [
            `(method_definition
               body: (_)* @function.body
               
               ) 
			`,
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
exports.JsCommands = JsCommands;
const jsCommands = new JsCommands();
async function getContext(currentEditor) {
    const langName = currentEditor.document.languageId;
    const parser = await parser_1.LanguageParser.get(currentEditor.document.languageId);
    (0, assert_1.default)(parser, `could not find parser for ${langName}`);
    return {
        text: currentEditor.document.getText(),
        cursor: currentEditor.selection.active,
        language: langName,
    };
}
function InitSelect(command, afterEnd) {
    return vscode.commands.registerCommand(command.name, async () => {
        const currentEditor = vscode.window.activeTextEditor;
        if (!currentEditor) {
            return;
        }
        extension_1.editor.setEditor(currentEditor);
        const context = await getContext(currentEditor);
        const position = await command.exec(context);
        if (!position) {
            return;
        }
        afterEnd(position);
    });
}
function initCommands(context) {
    const gotoFunction = vscode.commands.registerCommand(makeName('goToFunction'), async () => {
        const currentEditor = vscode.window.activeTextEditor;
        if (!currentEditor) {
            return;
        }
        extension_1.editor.setEditor(currentEditor);
        const context = await getContext(currentEditor);
        const position = await jsCommands.function().goTo(context);
        if (!position) {
            return;
        }
        extension_1.editor.getEditor().selection = new vscode.Selection(position.start, position.start);
    });
    context.subscriptions.push(gotoFunction);
    for (const command of jsCommands.getAll()) {
        context.subscriptions.push(InitSelect(command, function (position) {
            (0, selection_1.select)(position.start, position.end, extension_1.editor.getEditor());
        }));
    }
}
//# sourceMappingURL=commands.js.map