import assert from 'assert';
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
	bugPath(): string | undefined {
		const inspection = this.config.inspect('logs.bugsPath');
		if (!inspection) {
			return;
		}
		const configValue = this.value(inspection);

		if (!configValue || typeof configValue !== 'string') {
			return;
		}

		return configValue;
	}
	lookBack(): boolean {
		const inspection = this.config.inspect('lookBack');
		assert(
			inspection && typeof inspection.defaultValue === 'boolean',
			'lookBack configuration is a boolean'
		);
		const configValue = this.value(inspection);
		assert(typeof configValue === 'boolean');

		return configValue;
	}
}

