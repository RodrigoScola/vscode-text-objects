import { ExtensionContext, Memento } from 'vscode';

enum ProcessFlow {
	DONT_ASK = 0,
}

enum EditorScope {
	global = 1,
	workspace = 2,
}

const keys = {
	checkedKeys: ProcessFlow.DONT_ASK,
} as const;

export class EditorContext {
	private ctx: ExtensionContext;
	constructor(c: ExtensionContext) {
		this.ctx = c;
	}

	private getState(scope: EditorScope): Memento {
		if (scope === EditorScope.global) {
			return this.ctx.globalState;
		} else if (scope === EditorScope.workspace) {
			return this.ctx.workspaceState;
		}

		throw new Error(`invalid state ${scope}`);
	}

	getConfig<T extends keyof typeof keys, K extends (typeof keys)[T]>(
		key: T,
		scope: EditorScope
	): K | undefined {
		const config = this.getState(scope);

		return config.get(key);
	}
}
