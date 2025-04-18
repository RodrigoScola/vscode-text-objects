import assert from 'assert';
import * as vscode from 'vscode';
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

	goTo(_: Context, pos: vscode.Position): void {
		assert(this.editor, 'editor is not defined');
		if (!pos) {
			return;
		}

		this.editor.selection = new vscode.Selection(pos, pos);
		const that = this;
		// there HAS to be a way
		setTimeout(function () {
			assert(that.editor, 'editor is now undefined???');
			that.editor!.revealRange(
				new vscode.Range(pos, pos),
				vscode.TextEditorRevealType.InCenterIfOutsideViewport
			);
		}, 2);
	}
	selectRange(_: Context, range: vscode.Range | undefined): void {
		assert(this.editor, 'editor is not defined');
		if (!range) {
			return;
		}

		this.editor.selection = new vscode.Selection(range.start, range.end);

		const ref = this;

		// there HAS to be a way
		setTimeout(function () {
			assert(ref.editor, 'editor is now undefined???');
			ref.editor.revealRange(range, vscode.TextEditorRevealType.InCenterIfOutsideViewport);
		}, 2);
	}
	exec(command: string, ...rest: any[]) {
		return vscode.commands.executeCommand(command, rest);
	}
}
