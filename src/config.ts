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
	groupElements(): boolean {
		const inspection = this.config.inspect('selection.groupElements');
		assert(inspection, 'group elements config should be defined');

		assert(typeof inspection.defaultValue === 'boolean', 'group elements type is boolean');
		const configValue = this.value(inspection);
		assert(typeof configValue === 'boolean', 'current configuration value is not boolean');

		return configValue;
	}
}
