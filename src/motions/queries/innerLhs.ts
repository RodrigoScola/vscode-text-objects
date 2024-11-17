function C(): Selector {
	return {
		language: 'c',
		query: [
			` (field_expression field:(field_identifier) @lhs ) `,
			` (init_declarator declarator:(identifier) @lhs)`,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (declaration   declarator:(init_declarator (_ (_) @lhs) )) `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (variable_declaration  (variable_declarator (_ (_) @lhs) )) `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (var_declaration (var_spec value:(expression_list (_) @variable )    ))  `,
			` (const_declaration (const_spec value:(expression_list (_) @variable )    ))  `,
			` (short_var_declaration left:(expression_list (_) @variable )) `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [`(local_variable_declaration declarator:(variable_declarator name:(identifier) @lhs)) `].join(
			'\n'
		),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [` (variable_declarator name:(_ (_) @lhs) ) `].join('\n'),
	};
}

function json(): Selector {
	return {
		language: 'json',
		query: [`(pair key : (string (_) @key))`].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [`(assignment left:(_ attribute: (_)@lhs))`].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [
			` (let_declaration pattern:(tuple_pattern (_) @lhs)) `,
			` (static_item name:(_) @lhs )`,
			` (let_declaration   pattern:(identifier) @lhs )`,
			` (const_item name:(_) @lhs )`,
		].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) @lhs) `].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`( assignment_expression (_) @rhs) `,
			` (type_alias_declaration value: (_) @type   ) `,
		].join('\n'),
	};
}
function yaml(): Selector {
	return {
		language: 'yaml',
		query: [`(block_mapping_pair key : (flow_node (_) @lhs ))`].join('\n'),
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`( assignment_expression (_) @rhs) `,
			` (type_alias_declaration value: (_) @type   ) `,
		].join('\n'),
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`( assignment_expression (_) @rhs) `,
			` (type_alias_declaration value: (_) @type   ) `,
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
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
