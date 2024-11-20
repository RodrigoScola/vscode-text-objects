import assert from 'assert';
import { Editor } from '../extension';

let context: Context;

export function getContext(): Context {
	assert(context, ' context is not defined');
	return context;
}

export function updateContext(ctx: Context): Context {
	context = ctx;
	return context;
}
export function updateCommand(cmd: Command) {
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
	};
}
