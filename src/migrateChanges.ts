import assert from 'assert';
import { getContext } from './context/context';

export function automaticProcess(): void {
	checkVimPositionals();
}

function checkVimPositionals(): void {
	const ctx = getContext();

	assert(ctx.extensionContext, 'extension started but no vscode extension context?');

	ctx.extensionContext.getConfig(key, scope);
}
