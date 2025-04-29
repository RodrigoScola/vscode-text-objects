function C(): Selector {
	return {
		language: 'c',
		query: [
			`(assignment_expression left:(_) @lhs) `,
			`(declaration type:(_) @lhs declarator:(_ declarator:(_) @lhs)) `,
			`(declaration (_) @lhs type:(_) @lhs declarator:(_ declarator:(_) @lhs))`,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			` (declaration type:(_)  @lhs declarator:(init_declarator declarator:(_) @lhs) ) `,
			` (assignment_expression left:(_) @lhs) `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (variable_declaration  (variable_declarator (_) @lhs)) `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (short_var_declaration left : (_) @variable ) `,
			` (var_declaration (var_spec name:(identifier) @variable type:(_)* @variable ))  `,
			` (const_declaration (const_spec name:(identifier) @variable  type:(_)* @variable ))  `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (local_variable_declaration type:(_) @lhs declarator:(variable_declarator name:(identifier) @lhs)) `,
			` (assignment_expression left:(_) @lhs ) `,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [` (variable_declarator name:(_) @lhs) `].join('\n'),
	};
}
function jsonc(): Selector {
	return {
		language: 'jsonc',
		query: [`(pair key :(_) @key)`].join('\n'),
	};
}
function json(): Selector {
	return {
		language: 'json',
		query: [`(pair key :(_) @key)`].join('\n'),
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
		query: [` (assignment left: (_) @lhs) `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [
			` (let_declaration pattern:(_) @lhs)`,
			` (static_item name:(_) @lhs type:(_)+ @lhs)`,
			` (let_declaration (mutable_specifier) @lhs pattern:(identifier) @lhs )`,
			` (const_item name:(_) @lhs type:(_)+ @lhs)`,
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
		query: [` (variable_declarator name:(_) @lhs) `].join('\n'),
	};
}

function yaml(): Selector {
	return {
		language: 'yaml',
		query: [` (block_mapping_pair key:(_) @lhs value:(flow_node (_))) `].join('\n'),
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`( assignment_expression (_) @rhs) `,
			` (type_alias_declaration value: (_) @type   ) `,
			// `( public_field_definition
			// value: (_) @rhs
			// )`,
		].join('\n'),
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: [
			`(variable_declarator value: (_) @rhs)`,
			`( assignment_expression (_) @rhs) `,
			// `( public_field_definition
			// value: (_) @rhs
			// )`,
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
