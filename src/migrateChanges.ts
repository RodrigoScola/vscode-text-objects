import * as vscode from 'vscode';
import { Config } from './config';
import { getCommandName, getCommandNameWithoutPosition } from './motions/commands';
import { GetVimKeybindings, VimKeybinding } from './configGeneration';
import { getContext } from './context/context';

const commands: Command[] = [];

type VimConfig = {
	get: (s: string) => unknown;
	update: (s: string, v: unknown) => void;
};

type MotionCommand = {
	before: string[];
	commands: string[];
};

enum workspace {
	global = 1,
	project = 2,
	other = 3,
}

function getConfigPerWorkspace(space: workspace) {
	if (space === workspace.global) {
		return true;
	} else if (space == workspace.other) {
		return false;
	} else if (space == workspace.project) {
		return undefined;
	}

	throw new Error('this is the worst config way ');
}

enum generatedOptions {
	dont_generate = 0,
	already_generated = 1,
	still_ask = 2,
}

const configKey = {
	update_position_config_dont_show: false,
	generate_vim_keybinds: generatedOptions.still_ask,
} as const;

async function migratePositionals() {
	const response = getContext().extensionState.get(
		'update_position_config_dont_show',
		configKey.update_position_config_dont_show
	);
	if (response) {
		return;
	}
	const globalConfig = vscode.workspace.getConfiguration(
		'vim',
		getConfigPerWorkspace(workspace.global)
	) as VimConfig;

	const workspaceConfig = vscode.workspace.getConfiguration(
		'vim',
		getConfigPerWorkspace(workspace.project)
	) as VimConfig;

	const projectConfig = vscode.workspace.getConfiguration(
		'vim',
		getConfigPerWorkspace(workspace.other)
	) as VimConfig;
	const names = getCommandNamesWithoutPosition(commands);

	if (
		hasDifferentNamingConfig(globalConfig, names) ||
		hasDifferentNamingConfig(workspaceConfig, names) ||
		hasDifferentNamingConfig(projectConfig, names)
	) {
		const dontAsk = 'dont ask me again';
		const update = 'update';
		const response = await vscode.window.showWarningMessage(
			'Some confguration are using a legacy system, do you want to update them?',
			update,
			dontAsk
		);

		if (!response) return;

		if (response == update) {
			updateConfig(globalConfig, names);
			updateConfig(workspaceConfig, names);
			updateConfig(projectConfig, names);
		} else if (response == dontAsk) {
			getContext().extensionState.update('update_position_config_dont_show', true);
		}
	}
}

export async function automaticProcess() {
	migratePositionals();
	generateVimKeybindings();
}

function hasDifferentNamingConfig(
	currentConfig: VimConfig,
	commandNamesWithoutPosition: Record<string, Command>
) {
	for (const config of getVimSettingsName()) {
		const macros = currentConfig.get(config) as any;
		if (!Array.isArray(macros)) continue;
		for (let i = 0; i < macros.length; i++) {
			const macro = macros[i];
			if (!isVimMacro(macro)) {
				continue;
			}
			const commands = macro.commands;

			for (let j = 0; j < commands.length; j++) {
				const command = commands[j];
				if (command in commandNamesWithoutPosition) {
					return true;
				}
				macro.commands = commands;
			}
		}
	}

	return false;
}

function updateConfig(currentConfig: VimConfig, commandNamesWithoutPosition: Record<string, Command>) {
	for (const config of getVimSettingsName()) {
		const macros = currentConfig.get(config) as any;
		if (!Array.isArray(macros)) continue;
		for (let i = 0; i < macros.length; i++) {
			const macro = macros[i];
			if (!isVimMacro(macro)) {
				continue;
			}
			const commands = macro.commands;

			for (let j = 0; j < commands.length; j++) {
				const command = commands[j];
				if (command in commandNamesWithoutPosition) {
					commands[j] = getCommandName(commandNamesWithoutPosition[command]);
				}
				macro.commands = commands;
			}
		}
		currentConfig.update(config, macros);
	}
}

function isVimMacro(m: any): m is MotionCommand {
	if (
		typeof m === 'object' &&
		m &&
		'commands' in m &&
		typeof m.commands === 'object' &&
		m.commands &&
		Array.isArray(m.commands)
	) {
		return true;
	}
	return false;
}

function getVimSettingsName() {
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
function getCommandNamesWithoutPosition(commands: Command[]) {
	return commands.reduce((items, command) => {
		if (command.position === 'end') {
			return items;
		}
		items[getCommandNameWithoutPosition(command)] = command;
		return items;
	}, {} as Record<string, Command>);
}

function generateVimKeybindings() {
	const globalConfig = vscode.workspace.getConfiguration(
		'vim',
		getConfigPerWorkspace(workspace.global)
	) as VimConfig;

	if (!globalConfig) {
		return;
	}

	const response = getContext().extensionState.get<generatedOptions>(
		'generate_vim_keybinds',
		generatedOptions.still_ask
	);

	if (response === generatedOptions.dont_generate || response === generatedOptions.already_generated) {
		return;
	}

	const currentKeybindings: MotionCommand[] = globalConfig.get('normalModeKeyBindings') as MotionCommand[];

	if (!Array.isArray(currentKeybindings)) {
		return;
	}

	const allNames: Set<string> = new Set();
	for (const macro of currentKeybindings as MotionCommand[]) {
		if (!isVimMacro(macro)) {
			continue;
		}
		for (const m of macro.commands) {
			allNames.add(m);
		}
	}

	for (const bind of GetVimKeybindings(commands)) {
		assert(
			bind.commands.length == 1,
			`vim commands binds should have only 1 len, got ${bind.commands.length}`
		);

		const name = bind.commands[0];

		if (allNames.has(name)) {
			continue;
		}

		currentKeybindings.push(bind);
	}
	globalConfig.update('normalModeKeyBindings', currentKeybindings);
}
