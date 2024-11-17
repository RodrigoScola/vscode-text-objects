function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(declaration declarator: (init_declarator)) @variable`].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (declaration) @variable `, ` (field_declaration) @variable `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [`(variable_declaration) @variable`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (short_var_declaration) @variable `,
			` (var_declaration) @variable `,
			` (const_declaration) @variable `,
			` (const_spec) @variable `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (local_variable_declaration) @variable `,
			`(expression_statement (assignment_expression)) @variable`,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			` (export_statement (lexical_declaration (variable_declarator) @variable)) @lexical_declaration `,
			` (lexical_declaration (variable_declarator ) @variable ) @lexical_declaration `,
		].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: [`(pair) @variable`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [`(variable_assignment) @variable`, `(local_variable_declaration) @variable`].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		selector: [` (expression_statement) @variable `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [`(let_declaration) @variable`, `(const_item) @variable`, `(static_item) @variable`].join(
			'\n'
		),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: ['(pair) @variable'].join('\n'),
	};
}

function typescript(): QuerySelector {
	const tsSelector = javascript().selector + '\n' + `(type_alias_declaration) @type`;
	return {
		language: 'typescript',
		selector: tsSelector,
	};
}

function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [` (block_mapping_pair) @variable `].join('\n'),
	};
}
function typescriptreact(): QuerySelector {
	const tsSelector = javascript().selector + '\n' + `(type_alias_declaration) @type`;
	return {
		language: 'typescriptreact',
		selector: tsSelector,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		selector: javascript().selector,
	};
}
export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	json,
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
