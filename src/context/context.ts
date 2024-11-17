import assert from 'assert';
import { Editor } from '../extension';

let context: QueryContext;

export function getContext(): QueryContext {
	assert(context, ' context is not defined');
	return context;
}

export function updateContext(ctx: QueryContext) {
	context = ctx;
}

export function getDefaultContext(): QueryContext {
	return {
		editor: new Editor(),
		command: null,
		parsing: {
			parser: undefined,
		},
	};
}
