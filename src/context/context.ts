import { ExtensionContext } from 'vscode';
import assert from 'assert';
import { Editor } from '../editor/editor';
import { EditorContext } from '../editor/editorContext';

let context: Context;

export function getContext(): Context {
	assert(context, ' context is not defined');
	return context;
}

export function updateContext(ctx: Context): Context {
	context = ctx;
	return context;
}
export function updateCommand(cmd: Command): void {
	context.command = cmd;
	context.command.currentSelector = undefined;
}

export function getDefaultContext(): Context {
	return {
		editor: new Editor(),
		command: null,
		parsing: {
			parser: undefined,
		},
		extensionContext: null,
	};
}

export function setExtensionContext(c: ExtensionContext): void {
	context.extensionContext = new EditorContext(c);
}
