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
exports.editor = void 0;
exports.visualize = visualize;
exports.getEditor = getEditor;
exports.setEditor = setEditor;
exports.activate = activate;
exports.deactivate = deactivate;
const assert_1 = __importDefault(require("assert"));
const vscode = __importStar(require("vscode"));
const config_1 = require("./config");
const commands_1 = require("./motions/commands");
const parser_1 = require("./parsing/parser");
// Initialize the parser with the correct path to the WebAssembly file
function visualize(start, end) {
    const editor = getEditor();
    if (!editor) {
        return;
    }
    const startPos = new vscode.Position(start.endPosition.row, start.endPosition.column);
    const endPos = new vscode.Position(end.startPosition.row, end.startPosition.column);
    editor.revealRange(new vscode.Range(startPos, endPos));
    editor.selection = new vscode.Selection(startPos, endPos); // Move cursor to that position
}
class Editor {
    editor;
    getEditor() {
        (0, assert_1.default)(this.editor, 'editor has not been setup yet');
        return this.editor;
    }
    setEditor(editor) {
        (0, assert_1.default)(editor, 'invalid editor');
        this.editor = editor;
    }
}
let currentEditor;
function getEditor() {
    return currentEditor;
}
function setEditor() { }
let config;
function getConfig() {
    (0, assert_1.default)(config, 'configuration has not setup yet');
    return config;
}
exports.editor = new Editor();
// This method is called when your extension is activated
async function activate(context) {
    parser_1.LanguageParser.init();
    config = new config_1.Config(vscode.workspace.getConfiguration('vscode-textobjects'));
    await (0, commands_1.initCommands)(context);
}
function deactivate() { }
function foo() {
    return 1;
}
//# sourceMappingURL=extension.js.map