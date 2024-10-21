import { WorkspaceConfiguration } from 'vscode';

interface Inspection {
	defaultLanguageValue?: unknown;
	defaultValue?: unknown;
	globalLanguageValue?: unknown;
	globalValue?: unknown;
	key: string;
	languageIds?: string[] | undefined;
	workspaceFolderLanguageValue?: unknown;
	workspaceFolderValue?: unknown;
	workspaceLanguageValue?: unknown;
	workspaceValue?: unknown;
}

export class Config {
	private config: WorkspaceConfiguration;
	constructor(configuration: WorkspaceConfiguration) {
		this.config = configuration;
	}
	private value(configKey: Inspection) {
		if (configKey.workspaceValue) {
			return configKey.workspaceValue;
		} else if (configKey.globalValue) {
			return configKey.globalValue;
		}
		return configKey.defaultValue;
	}
}

