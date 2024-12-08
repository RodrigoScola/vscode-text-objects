import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { getCommandName } from './motions/commands';

/**
 * this is not supposed to be pretty, this is just so i can generate the keybinds, vim integration or the commands automatically
 *
 */
function makeName(str: string) {
	return `vscode-textobjects.${str}`;
}

function foo(str: string, n: number, other: object, fl: string) {}

function saveCommands(commands: Command[]) {
	const total = [];
	for (const command of commands) {
		let actionName: string = command.action;

		if (command.action === 'goTo') {
			actionName = 'Go To';
		} else {
			actionName = actionName[0].toUpperCase() + actionName.slice(1);
		}

		const node: Record<string, string> = {
			command: `vscode-textobjects.${getCommandName(command)}`,
			title: `${actionName} previous inner class content`,
		};

		if (command.action === 'change' || command.action === 'yank') {
			node.when = ` editorTextFocus && vim.active && ${makeName(
				'vim_integration'
			)}  && !inDebugRepl && vim.mode != 'Insert'`;
		} else {
			node.when = `editorTextFocus`;
		}

		total.push(node);

		fs.writeFileSync(
			path.join(__dirname, '..', 'commands.json'),

			JSON.stringify(total, null, 2)
		);
	}
}

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
			return 'p';
		}

		case 'rhs': {
			return 'r';
		}

		case 'string': {
			return 's';
		}

		case 'type': {
			return 't';
		}
		case 'variable': {
			return 'v';
		}
		default: {
			throw new Error('forgot to implement: ' + name);
		}
	}
}

function getKeyForCommandActionAndScope(action: CommandAction, scope: CommandScope): string {
	if (action === 'goTo' && scope === 'outer') {
		return 'g';
	} else if (action === 'goTo' && scope === 'inner') {
		return 't';
	} else if (action === 'select' && scope === 'inner') {
		return 'i';
	} else if (action === 'select' && scope === 'outer') {
		return 'n';
	} else if (action === 'delete' && scope === 'outer') {
		return 'x';
	} else if (action === 'delete' && scope === 'inner') {
		return 'l';
	}
	throw new Error('forgot to implement: ' + action);
}

export function saveKeybinds(commands: Command[]) {
	const total = [];

	for (const command of commands) {
		if (command.action === 'change' || command.action === 'yank') {
			//actions that are only with vim integration
			continue;
		}
		let winActivation = ['ctrl'];
		let macActivation = ['cmd'];

		if (command.direction === 'previous') {
			winActivation.push('shift');
			macActivation.push('shift');
			winActivation.push(getKeyForCommandActionAndScope(command.action, command.scope).toUpperCase());
			macActivation.push(getKeyForCommandActionAndScope(command.action, command.scope).toUpperCase());
		} else {
			winActivation.push(getKeyForCommandActionAndScope(command.action, command.scope));
			macActivation.push(getKeyForCommandActionAndScope(command.action, command.scope));
		}
		let winKey = ['ctrl'];
		let macKey = ['cmd'];

		if (command.direction === 'previous') {
			winKey.push('shift');
			macKey.push('shift');
			winKey.push(getkeyForCommandName(command.name).toUpperCase());
			macKey.push(getkeyForCommandName(command.name).toUpperCase());
		} else {
			winKey.push(getkeyForCommandName(command.name));
			macKey.push(getkeyForCommandName(command.name));
		}

		const node = {
			command: `${makeName(getCommandName(command))}`,
			when: 'editorTextFocus',
			key: [winActivation.join('+'), winKey.join('+')].join(' '),
			mac: [macActivation.join('+'), macKey.join('+')].join(' '),
		};
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

function getGoToKeyForDirection(dir: CommandDirection): string {
	if (dir === 'next') {
		return '[';
	} else if (dir === 'previous') {
		return ']';
	}
	throw new Error('forgot to implement:' + dir);
}

export function saveVimKeybinds(commands: Command[]) {
	const total = [];
	for (const command of commands) {
		let key: string[] = [];
		if (command.action === 'goTo') {
			let dirKey = getkeyForCommandName(command.name);

			if (command.scope === 'inner') {
				dirKey = dirKey.toUpperCase();
			}

			key = [getGoToKeyForDirection(command.direction), dirKey];
		} else {
			key = [
				getVimKeyForCommandAction(command.action),
				getKeyForCommandScope(command.scope),
				command.direction === 'next'
					? getkeyForCommandName(command.name)
					: getkeyForCommandName(command.name).toUpperCase(),
			];
		}

		const node: Record<string, any> = {
			before: key,
			//just to be sure

			when: ` editorTextFocus && vim.active && ${makeName(
				'vim_integration'
			)}  && !inDebugRepl && vim.mode != 'Insert'`,
			commands: [`vscode-textobjects.${getCommandName(command)}`],
		};

		total.push(node);
	}
	assert.equal(total.length, commands.length);

	fs.writeFileSync(
		path.join(__dirname, '..', 'vim_keybinds.json'),

		JSON.stringify(total, null, 1)
	);
}
