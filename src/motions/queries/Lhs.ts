import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			` (assignment_expression left:(_) @lhs) `,
			` (declaration (storage_class_specifier) @lhs type:(primitive_type) @lhs declarator:(init_declarator declarator:(identifier) @lhs))`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (declaration   declarator:(init_declarator (_) @lhs) ) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (variable_declaration  (variable_declarator (_) @lhs)) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (short_var_declaration left : (_) @variable ) `,
			` (var_declaration (var_spec name:(identifier) @variable type:(_)* @variable ))  `,
			` (const_declaration (const_spec name:(identifier) @variable  type:(_)* @variable ))  `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (local_variable_declaration type:(_) @lhs declarator:(variable_declarator name:(identifier) @lhs)) `,
			` (assignment_expression left:(_) @lhs ) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [` (variable_declarator name:(_) @lhs) `].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: [`(pair key :(_) @key)`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (assignment left: (_) @lhs) `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [
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
		selector: [`(pair (bare_key) @lhs) `].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: [
			`(variable_declarator value: (_) @rhs)`,
			`( assignment_expression (_) @rhs) `,
			` (type_alias_declaration value: (_) @type   ) `,
			//todo: go to a class with the public and check if node is good name
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
};