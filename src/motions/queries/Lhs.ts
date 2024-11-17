function C(): QuerySelector {
	return {
		language: 'c',
		query: [
			` (assignment_expression left:(_) @lhs) `,
			` (declaration (storage_class_specifier) @lhs type:(primitive_type) @lhs declarator:(init_declarator declarator:(identifier) @lhs))`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [` (declaration   declarator:(init_declarator (_) @lhs) ) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [` (variable_declaration  (variable_declarator (_) @lhs)) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [
			` (short_var_declaration left : (_) @variable ) `,
			` (var_declaration (var_spec name:(identifier) @variable type:(_)* @variable ))  `,
			` (const_declaration (const_spec name:(identifier) @variable  type:(_)* @variable ))  `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [
			` (local_variable_declaration type:(_) @lhs declarator:(variable_declarator name:(identifier) @lhs)) `,
			` (assignment_expression left:(_) @lhs ) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [` (variable_declarator name:(_) @lhs) `].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		query: [`(pair key :(_) @key)`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: [` (assignment left: (_) @lhs) `].join('\n'),
	};
}
function rust(): QuerySelector {
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
function toml(): QuerySelector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) @lhs) `].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
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

function yaml(): QuerySelector {
	return {
		language: 'yaml',
		query: [` (block_mapping_pair key:(_) @lhs value:(flow_node (_))) `].join('\n'),
	};
}
function typescriptreact(): QuerySelector {
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
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
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
