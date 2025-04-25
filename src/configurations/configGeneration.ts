import assert from 'assert';

import fs from 'fs';
import path from 'path';
import { getCommandName, getCommandNameWithoutPosition } from '../motions/commands';
import { getConfig } from '../config';

/**
 * this is not supposed to be pretty, this is just so i can generate the keybinds, vim integration or the commands automatically
 *
 */
export function makeName(str: string): string {
	return `vscode-textobjects.${str}`;
}

export function formatKeybindCommands(commands: Command[]): Record<string, string>[] {
	const keybindCommands: Record<string, Record<string, string>> = {};

	for (const command of commands) {
		let actionName: string = command.action;

		if (command.action === 'goTo') {
			actionName = 'Go To';
		} else {
			actionName = actionName[0].toUpperCase() + actionName.slice(1);
		}
		if (command.action === 'yank') {
			actionName = 'Copy';
		}

		const node: Record<string, string> = {
			command: makeName(getCommandName(command)),
			title: `${actionName} ${command.direction} ${command.scope} ${command.name} ${command.position}`,
			when: `editorTextFocus  `,
		};

		//remove this in a future patch
		if (command.action === 'goTo') {
			const nodeWithoutPosition = {
				command: makeName(getCommandNameWithoutPosition(command)),
				title: `${actionName} ${command.direction} ${command.scope} ${command.name}`,
				when: `editorTextFocus  `,
			};

			keybindCommands[nodeWithoutPosition.command] = nodeWithoutPosition;
		}

		keybindCommands[node.command] = node;
	}
	return Object.values(keybindCommands);
}

export function saveCommands(commands: Record<string, string>[]): void {
	fs.writeFileSync(
		path.join(__dirname, '..', 'commands.json'),

		JSON.stringify(commands, null, 2)
	);
}

//todo: if this becomes a bigger thing, see if the values still need to be hardcoded, they could be in the user config and we get the defaults or the user preffered keybind from there
function getkeyForCommandName(name: CommandNames, config: KeyboardConfig): string {
	if (!(name in config)) {
		throw new Error(`invalid keybinding for ${name}`);
	}
	return config[name];
}

function getKeyForCommand(command: Command, config: KeyboardMotionConfig): string {
	if (command.action === 'goTo' && command.position === 'start') {
		return config['go to start'];
	} else if (command.action === 'goTo' && command.position === 'end') {
		return config['go to end'];
	} else if (command.action === 'select' && command.scope === 'inner') {
		return config['select inner'];
	} else if (command.action === 'select' && command.scope === 'outer') {
		return config['select outer'];
	} else if (command.action === 'delete' && command.scope === 'outer') {
		return config['delete outer'];
	} else if (command.action === 'delete' && command.scope === 'inner') {
		return config['delete inner'];
	} else if (command.action === 'yank' && command.scope === 'outer') {
		return config['yank outer'];
	}
	throw new Error('did not implement: ' + getCommandName(command));
}

export function getKeyboardKeybinds(commands: Command[], config: DefaultKeyboardConfig): KeyboardKeybind[] {
	const total: KeyboardKeybind[] = [];
	for (const command of commands) {
		if (
			command.action === 'change' ||
			(command.action === 'yank' && command.scope === 'inner') ||
			(command.action === 'goTo' && command.scope === 'inner')
		) {
			//actions that are only with vim integration
			continue;
		}
		let winActivation = ['ctrl+alt'];
		let macActivation = ['cmd+alt'];

		const node: {
			command: string;
			when: string;
			mac?: string;
			key?: string;
		} = {
			command: `${makeName(getCommandName(command))}`,
			when: 'editorTextFocus',
		};

		let winKey = ['ctrl+alt'];
		let macKey = ['cmd+alt'];

		if (command.direction === 'previous') {
			winActivation.push('shift');
			macActivation.push('shift');
			winActivation.push(getKeyForCommand(command, config).toUpperCase());
			macActivation.push(getKeyForCommand(command, config).toUpperCase());

			winKey.push('shift');
			macKey.push('shift');
			winKey.push(getkeyForCommandName(command.name, config).toUpperCase());
			macKey.push(getkeyForCommandName(command.name, config).toUpperCase());
		} else {
			winActivation.push(getKeyForCommand(command, config));
			macActivation.push(getKeyForCommand(command, config));

			winKey.push(getkeyForCommandName(command.name, config));
			macKey.push(getkeyForCommandName(command.name, config));
		}

		node.key = [winActivation.join('+'), winKey.join('+')].join(' ');
		node.mac = [macActivation.join('+'), macKey.join('+')].join(' ');

		total.push(node);
	}
	return total;
}

export function saveKeybinds(commands: Command[]): void {
	const keyboardConfig = getConfig().keybindingConfig();
	const total = getKeyboardKeybinds(commands, keyboardConfig);

	fs.writeFileSync(
		path.join(__dirname, '..', 'keybinds.json'),

		JSON.stringify(total, null, 2)
	);
}

function getVimKeyForCommandAction(action: CommandAction, config: VimMotionConfig): string {
	if (action === 'change') {
		return config.change;
	} else if (action === 'delete') {
		return config.delete;
	} else if (action === 'select') {
		return config.select;
	} else if (action === 'yank') {
		return config.yank;
	}
	throw new Error('forgot to implement: ' + action);
}

function getKeyForCommandScope(scope: CommandScope, config: ScopeConfig): string {
	if (scope === 'inner') {
		return config.inner;
	} else if (scope === 'outer') {
		return config.outer;
	}

	throw new Error('forgot to implement: ' + scope);
}

function getGoToKeyForDirectionAndPosition(dir: CommandDirection, pos: CommandPosition): string[] {
	const config = getConfig().vimkeybindingConfig();

	if (dir === 'next' && pos === 'start') {
		return config['go to next start'].split(' ');
	} else if (dir === 'previous' && pos === 'start') {
		return config['go to previous start'].split(' ');
	} else if (dir === 'next' && pos === 'end') {
		return config['go to next end'].split(' ');
	} else if (dir === 'previous' && pos === 'end') {
		return config['go to previous end'].split(' ');
	}
	throw new Error('forgot to implement:' + dir);
}

export type VimKeybinding = { before: string[]; commands: string[] };

export function GetVimKeybindings(commands: Command[]): VimKeybinding[] {
	const keybindings: VimKeybinding[] = [];

	const keybindConfig = getConfig().vimkeybindingConfig();

	for (const command of commands) {
		let key: string[] = [];

		if (command.action === 'goTo') {
			let dirKey = getkeyForCommandName(command.name, keybindConfig);

			if (command.scope === 'inner') {
				dirKey = dirKey.toUpperCase();
			}

			key = getGoToKeyForDirectionAndPosition(command.direction, command.position).concat(dirKey);
		} else {
			key = [
				getVimKeyForCommandAction(command.action, keybindConfig),
				getKeyForCommandScope(command.scope, keybindConfig),
				command.direction === 'next'
					? getkeyForCommandName(command.name, keybindConfig)
					: getkeyForCommandName(command.name, keybindConfig).toUpperCase(),
			];
		}

		const node: VimKeybinding = {
			before: key,
			commands: [makeName(getCommandName(command))],
		};

		keybindings.push(node);
	}
	return keybindings;
}

export function saveVimKeybinds(commands: Command[]): void {
	const total = GetVimKeybindings(commands);

	assert.equal(total.length, commands.length);

	fs.writeFileSync(
		path.join(__dirname, '..', 'vim_keybinds.json'),

		JSON.stringify(total, null, 1)
	);
}
