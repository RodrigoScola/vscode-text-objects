import assert from 'assert';

import fs from 'fs';
import path from 'path';
import { commands, getCommandName, getCommandNameWithoutPosition } from '../motions/commands';

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
function getkeyForCommandName(name: CommandNames): string {
	switch (name) {
		case 'array': {
			return 'a';
		}
		case 'call': {
			return 'm';
		}
		case 'class': {
			return 'k';
		}

		case 'comment': {
			return 'c';
		}

		case 'conditional': {
			return 'i';
		}

		case 'function': {
			return 'f';
		}

		case 'lhs': {
			return 'h';
		}

		case 'loop': {
			return 'l';
		}

		case 'node': {
			return 'n';
		}

		case 'object': {
			return 'o';
		}

		case 'parameters': {
			return 'e';
		}

		case 'rhs': {
			return 'r';
		}

		case 'string': {
			return 'q';
		}

		case 'type': {
			return 'y';
		}
		case 'variable': {
			return 'v';
		}
		default: {
			throw new Error('forgot to implement: ' + name);
		}
	}
}

function getKeyForCommand(command: Command): string {
	if (command.action === 'goTo' && command.position === 'start') {
		return 'f';
	} else if (command.action === 'goTo' && command.position === 'end') {
		return 't';
	} else if (command.action === 'select' && command.scope === 'inner') {
		return 'n';
	} else if (command.action === 'select' && command.scope === 'outer') {
		return 's';
	} else if (command.action === 'delete' && command.scope === 'outer') {
		return 'd';
	} else if (command.action === 'delete' && command.scope === 'inner') {
		return 'x';
	} else if (command.action === 'yank' && command.scope === 'outer') {
		return 'y';
	}
	throw new Error('forgot to implement: ' + getCommandName(command));
}

export function saveKeybinds(commands: Command[]) {
	const total = [];

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
			winActivation.push(getKeyForCommand(command).toUpperCase());
			macActivation.push(getKeyForCommand(command).toUpperCase());

			winKey.push('shift');
			macKey.push('shift');
			winKey.push(getkeyForCommandName(command.name).toUpperCase());
			macKey.push(getkeyForCommandName(command.name).toUpperCase());
		} else {
			winActivation.push(getKeyForCommand(command));
			macActivation.push(getKeyForCommand(command));

			winKey.push(getkeyForCommandName(command.name));
			macKey.push(getkeyForCommandName(command.name));
		}

		node.key = [winActivation.join('+'), winKey.join('+')].join(' ');
		node.mac = [macActivation.join('+'), macKey.join('+')].join(' ');

		total.push(node);
	}

	fs.writeFileSync(
		path.join(__dirname, '..', 'keybinds.json'),

		JSON.stringify(total, null, 2)
	);
}

function getVimKeyForCommandAction(action: CommandAction): string {
	if (action === 'change') {
		return 'c';
	} else if (action === 'delete') {
		return 'd';
	} else if (action === 'select') {
		return 'v';
	} else if (action === 'yank') {
		return 'y';
	}
	throw new Error('forgot to implement: ' + action);
}

function getKeyForCommandScope(scope: CommandScope): string {
	if (scope === 'inner') {
		return 'i';
	} else if (scope === 'outer') {
		return 'a';
	}

	throw new Error('forgot to implement: ' + scope);
}

function getGoToKeyForDirectionAndPosition(dir: CommandDirection, pos: CommandPosition): string[] {
	if (dir === 'next' && pos === 'start') {
		return ['['];
	} else if (dir === 'previous' && pos === 'start') {
		return [']'];
	} else if (dir === 'next' && pos === 'end') {
		return ['[', '['];
	} else if (dir === 'previous' && pos === 'end') {
		return [']', ']'];
	}
	throw new Error('forgot to implement:' + dir);
}

export type VimKeybinding = { before: string[]; commands: string[] };

export function GetVimKeybindings(commands: Command[]) {
	const keybindings: VimKeybinding[] = [];
	for (const command of commands) {
		let key: string[] = [];

		if (command.action === 'goTo') {
			let dirKey = getkeyForCommandName(command.name);

			if (command.scope === 'inner') {
				dirKey = dirKey.toUpperCase();
			}

			key = getGoToKeyForDirectionAndPosition(command.direction, command.position).concat(dirKey);
		} else {
			key = [
				getVimKeyForCommandAction(command.action),
				getKeyForCommandScope(command.scope),
				command.direction === 'next'
					? getkeyForCommandName(command.name)
					: getkeyForCommandName(command.name).toUpperCase(),
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

export function saveVimKeybinds(commands: Command[]) {
	const total = GetVimKeybindings(commands);

	assert.equal(total.length, commands.length);

	fs.writeFileSync(
		path.join(__dirname, '..', 'vim_keybinds.json'),

		JSON.stringify(total, null, 1)
	);
}
