import { ExtensionContext, Memento } from 'vscode';

export enum ProcessFlow {
	DONT_ASK = 0,
	ALREADY_MIGRATED = 1,
	SHOULD_ASK = 2,
}

export enum EditorScope {
	global = 1,
	workspace = 2,
}

const keys = {
	check_vim_positional_commands: ProcessFlow.DONT_ASK as ProcessFlow,
} as const;

export class EditorContext {
	private ctx: ExtensionContext;
	constructor(c: ExtensionContext) {
		this.ctx = c;
	}

	private getEditorState(scope: EditorScope): Memento {
		if (scope === EditorScope.global) {
			return this.ctx.globalState;
		} else if (scope === EditorScope.workspace) {
			return this.ctx.workspaceState;
		}

		throw new Error(`invalid state ${scope}`);
	}

	getState<T extends keyof typeof keys, K extends (typeof keys)[T]>(
		key: T,
		scope: EditorScope
	): K | undefined {
		const config = this.getEditorState(scope);

		return config.get(key);
	}

	updateState<T extends keyof typeof keys, K extends (typeof keys)[T]>(
		key: T,
		v: K,
		scope: EditorScope
	): Thenable<void> {
		const config = this.getEditorState(scope);

		return config.update(key, v);
	}
}
