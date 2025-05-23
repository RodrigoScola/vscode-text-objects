function C(): Selector {
	return {
		language: 'c',
		query: [`(declaration declarator: (init_declarator)) @variable`].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (declaration) @variable `, ` (field_declaration) @variable `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [`(variable_declaration) @variable`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (short_var_declaration) @variable `,
			` (var_declaration) @variable `,
			` (const_declaration) @variable `,
			` (const_spec) @variable `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (local_variable_declaration) @variable `,
			`(expression_statement (assignment_expression)) @variable`,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			`  (field_definition) @variable`,
			` (export_statement (lexical_declaration (variable_declarator) @variable) @declaration ) @export   `,
			` (lexical_declaration (variable_declarator ) @variable ) @declaration `,
		].join('\n'),
	};
}

function jsonc(): Selector {
	return {
		language: 'jsonc',
		query: [`(pair) @variable`].join('\n'),
	};
}
function json(): Selector {
	return {
		language: 'json',
		query: [`(pair) @variable`].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: [`(variable_assignment) @variable`, `(local_variable_declaration) @variable`].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [` (expression_statement (assignment)) @variable `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(let_declaration) @variable`, `(const_item) @variable`, `(static_item) @variable`].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: ['(pair) @variable'].join('\n'),
	};
}

function typescript(): Selector {
	const tsSelector = [
		` (export_statement (lexical_declaration (variable_declarator) @variable) @declaration ) @export   `,
		` (lexical_declaration (variable_declarator ) @variable ) @declaration `,
		`(assignment_expression) @variable `,
		`(type_alias_declaration) @type`,
		` (public_field_definition ) @variable  `,
	].join('\n');
	return {
		language: 'typescript',
		query: tsSelector,
	};
}

function yaml(): Selector {
	return {
		language: 'yaml',
		query: [` (block_mapping_pair) @variable `].join('\n'),
	};
}
function typescriptreact(): Selector {
	const tsSelector = typescript().query + '\n' + `(type_alias_declaration) @type`;
	return {
		language: 'typescriptreact',
		query: tsSelector,
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
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
	jsonc,
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
