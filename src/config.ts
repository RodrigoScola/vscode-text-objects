import assert from 'assert';
import { WorkspaceConfiguration } from 'vscode';

export class Config {
	private config: WorkspaceConfiguration;
	constructor(configuration: WorkspaceConfiguration) {
		this.config = configuration;

		console.log('config', this.config);
	}

	experimentalNode(): boolean {
		assert(this.config, ' config has not been setup');

		const value = this.config.get('experimentalNodeQuery');

		assert(typeof value !== 'undefined' && value !== null, 'value was not found');
		return Boolean(value);
	}
}
