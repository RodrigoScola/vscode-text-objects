function C(): Selector {
	return {
		language: 'c',
		query: [`(assignment_expression right:(_) @lhs)`, `(init_declarator value: (_) @rhs ) `].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			` (init_declarator value:(_) @variable ) `,
			` (field_declaration default_value:(_) @variable)`,
			` (assignment_expression right:(_) @rhs) `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (equals_value_clause (_) @rhs )`, ` (assignment_expression right:(_) @rhs )`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			`(short_var_declaration right: (_) @rhs)`,
			`(assignment_statement right:(_)+ @rhs)`,
			`(var_spec value:(expression_list (_) @rhs ))`,
			`(const_spec value:(expression_list (_) @rhs))`,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			`(assignment_expression left:(identifier) right:(_) @rhs) `,
			`(variable_declarator value:(_) @rhs) `,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`(assignment_expression right:(_) @rhs) `,
			`(field_definition  value:(_) @rhs) `,
		].join('\n'),
	};
}

function jsonc(): Selector {
	return {
		language: 'jsonc',
		query: [`(pair value: (_) @rhs)`].join('\n'),
	};
}
function json(): Selector {
	return {
		language: 'json',
		query: [`(pair value: (_) @rhs)`].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: [
			` (local_variable_declaration (expression_list value:(_) @rhs)) `,
			` (variable_assignment (expression_list value:(_) @rhs )) `,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [` (assignment right:(_) @rhs)`].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [` (let_declaration value:(_) @rhs) `, ` (assignment_expression right:(_) @rhs) `].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) (_) @rhs)`].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		//todo revise the selectors
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`(assignment_expression right:(_) @rhs) `,
			` (class_declaration body:(class_body (public_field_definition value:(_) @rhs ))) `,
		].join('\n'),
	};
}
function yaml(): Selector {
	return {
		language: 'yaml',
		//todo revise the selectors
		query: [` (block_mapping_pair value:(_) @rhs) `].join('\n'),
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		//todo revise the selectors
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`(assignment_expression right:(_) @rhs) `,
			` (class_declaration body:(class_body (public_field_definition value:(_) @rhs ))) `,
		].join('\n'),
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		//todo revise the selectors
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`(assignment_expression right:(_) @rhs) `,
			`(field_definition  value:(_) @rhs) `,
		].join('\n'),
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
