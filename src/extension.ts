import assert from 'assert';
import * as vscode from 'vscode';
import { init } from './motions/commands';
import { LanguageParser } from './parsing/parser';

// Initialize the parser with the correct path to the WebAssembly file

export class Editor {
	private editor: vscode.TextEditor | undefined;

	constructor() {
		// cursor: new vscode.Position(0, 0),
		// language: 'tree-sitter',
		// text: '',
	}

	cursor(): vscode.Position {
		assert(this.editor, 'editor is undefined');
		return this.editor.selection.active;
	}

	getText() {
		assert(this.editor, 'editor is not defined');
		return this.editor.document.getText();
	}
	getRange(startLine: number, startChar: number, endLine: number, endChar: number) {
		assert(this.editor, 'editor is not defined');
		return this.editor.document.getText(
			new vscode.Range(new vscode.Position(startLine, startChar), new vscode.Position(endLine, endChar))
		);
	}
	language(): string {
		assert(this.editor, 'editor is not defined');
		return this.editor.document.languageId;
	}

	getEditor(): vscode.TextEditor {
		assert(this.editor, 'editor has not been setup yet');
		return this.editor;
	}
	setEditor(editor: vscode.TextEditor) {
		assert(editor, 'invalid editor');
		this.editor = editor;
	}

	goTo(_: Context, pos: vscode.Range | undefined) {
		assert(this.editor, 'editor is not defined');
		if (!pos) {
			return;
		}

		this.editor.selection = new vscode.Selection(pos.start, pos.start);
		this.editor.revealRange(new vscode.Range(pos.start, pos.start));
	}
	selectRange(_: Context, range: vscode.Range | undefined): void {
		assert(this.editor, 'editor is not defined');
		if (!range) {
			return;
		}

		const start = range.start;
		const end = range.end;

		this.editor.selection = new vscode.Selection(start, end);
		this.editor.revealRange(range);
	}
}

// This method is called when your extension is activated
export async function activate() {
	await Promise.all([LanguageParser.init(), init()]);
}

export function deactivate() {}
