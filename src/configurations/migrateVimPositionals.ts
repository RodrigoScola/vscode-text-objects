import * as vscode from 'vscode';
import assert from 'assert';
import { getContext } from '../context/context';
import { EditorScope, ProcessFlow } from '../editor/editorContext';
import { commands, getCommandName, getCommandNameWithoutPosition } from '../motions/commands';
import { makeName } from './configGeneration';

export function automaticProcess(): void {
	checkVimPositionals();
}
export function getVimSettingsNames(): string[] {
	return [
		'insertModeKeyBindingsNonRecursive',
		'insertModeKeyBindings',
		'normalModeKeyBindings',
		'normalModeKeyBindingsNonRecursive',
		'visualModeKeyBindingsNonRecursive',
		'visualModeKeyBindings',
		'operatorPendingModeKeyBindingsNonRecursive',
		'operatorPendingModeKeyBindings',
	];
}

function checkVimPositionals(): void {
	const ctx = getContext();

	ctx.extensionContext?.updateState(
		'check_vim_positional_commands',
		ProcessFlow.SHOULD_ASK,
		EditorScope.global
	);

	const config = vscode.workspace.getConfiguration('vim');
	if (!config) {
		return;
	}

	assert(ctx.extensionContext, 'extension started but no vscode extension context?');

	const shouldCheck = ctx.extensionContext.getState('check_vim_positional_commands', EditorScope.global);

	if (Boolean(shouldCheck) && shouldCheck === ProcessFlow.DONT_ASK) {
		return;
	}

	if (!hasInvalidVimPositionals(config)) {
		return;
	}

	vscode.window
		.showWarningMessage(
			'you have an invalid command. do you want to migrate changes?',
			'yes',
			'dont ask me again'
		)
		.then((r) => {
			if (!r) {
				return;
			}

			if (r === 'dont ask me again') {
				ctx.extensionContext?.updateState(
					'check_vim_positional_commands',
					ProcessFlow.DONT_ASK,
					EditorScope.global
				);
				return;
			}

			MigratePositionalCommand(config);

			ctx.extensionContext?.updateState(
				'check_vim_positional_commands',
				ProcessFlow.ALREADY_MIGRATED,
				EditorScope.global
			);
		});
}

export function MigratePositionalCommand(config: vscode.WorkspaceConfiguration): void {
	if (!config) {
		return;
	}
	const settings = getVimSettingsNames();
	for (let i = 0; i < settings.length; i++) {
		const settingName = settings[i];

		const conf = config.inspect(settingName);
		if (!conf) {
			continue;
		}

		if (isConfig(conf.globalValue)) {
			config.update(settingName, migratePositionals(conf.globalValue), true);
		}

		if (isConfig(conf.workspaceValue)) {
			config.update(settingName, migratePositionals(conf.workspaceValue), false);
		}

		if (isConfig(conf.workspaceFolderValue)) {
			config.update(settingName, migratePositionals(conf.workspaceFolderValue), null);
		}
	}
}

function isConfig(conf: unknown): conf is { commands: string[] }[] {
	return (typeof conf === 'object' && conf && Array.isArray(conf)) as boolean;
}

function migratePositionals(conf: { commands: string[] }[]): { commands: string[] }[] {
	const names: Record<string, Command> = commands.reduce((all: Record<string, Command>, item) => {
		if (item.action === 'goTo' && item.position === 'end') {
			return all;
		}
		all[makeName(getCommandNameWithoutPosition(item))] = item;
		return all;
	}, {});

	for (const command of conf) {
		if (!('commands' in command) || !Array.isArray(command.commands)) {
			continue;
		}

		for (let i = 0; i < command.commands.length; i++) {
			const name = command.commands[i];

			if (name in names) {
				command.commands[i] = makeName(getCommandName(names[name]));
			}
		}
	}
	return conf;
}

function hasMissingPositional(conf: { commands: string[] }[]): boolean {
	const names = new Set(commands.map((c) => makeName(getCommandNameWithoutPosition(c))));

	for (const command of conf) {
		if (!('commands' in command) || !Array.isArray(command.commands)) {
			continue;
		}

		for (const name of command.commands) {
			if (names.has(name)) {
				return true;
			}
		}
	}
	return false;
}

function hasInvalidVimPositionals(config: vscode.WorkspaceConfiguration): boolean {
	let hasInvalid = false;
	const settings = getVimSettingsNames();
	for (let i = 0; i < settings.length; i++) {
		const settingName = settings[i];

		const conf = config.inspect(settingName);
		if (!conf) {
			continue;
		}

		if (isConfig(conf.globalValue)) {
			hasInvalid ||= hasMissingPositional(conf.globalValue);
		}

		if (isConfig(conf.workspaceValue)) {
			hasInvalid ||= hasMissingPositional(conf.workspaceValue);
		}

		if (isConfig(conf.workspaceFolderValue)) {
			hasInvalid ||= hasMissingPositional(conf.workspaceFolderValue);
		}

		if (hasInvalid === true) {
			return true;
		}
	}
	return hasInvalid;
}
