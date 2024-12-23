import assert from 'assert';
import * as vscode from 'vscode';
import { WorkspaceConfiguration } from 'vscode';

export class Config {
	private config: WorkspaceConfiguration;
	constructor(configuration: WorkspaceConfiguration) {
		this.config = configuration;
	}

	vimActive(): boolean {
		assert(this.config, ' config has not been setup');

		const value = this.config.get('vimEnabled');

		assert(typeof value !== 'undefined' && value !== null, 'value was not found');

		return Boolean(value);
	}

	copyOnDelete(): boolean {
		assert(this.config, ' config has not been setup');

		const value = this.config.get('copyOnDelete');

		assert(typeof value !== 'undefined' && value !== null, 'value was not found');
		return Boolean(value);
	}
}
let config: Config;
export function getConfig(): Config {
	//good one asserts!
	if (!config) {
		config = new Config(vscode.workspace.getConfiguration('vscode-textobjects'));
	}

	assert(config, 'configuration has not setup yet');
	return config;
}
