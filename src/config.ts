import assert from 'assert';
import * as vscode from 'vscode';
import { WorkspaceConfiguration } from 'vscode';

export class Config {
	private config: WorkspaceConfiguration;
	constructor(configuration: WorkspaceConfiguration) {
		this.config = configuration;
	}

	experimentalNode(): boolean {
		assert(this.config, ' config has not been setup');

		const value = this.config.get('experimentalNodeQuery');

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
