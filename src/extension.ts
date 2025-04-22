import { init } from './motions/commands';
import { LanguageParser } from './parsing/parser';

export async function activate() {
	await Promise.all([LanguageParser.init(), init()]);
}

export function deactivate() {}
