import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			` (field_expression field:(field_identifier) @lhs ) `,
			` (init_declarator declarator:(identifier) @lhs)`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (declaration   declarator:(init_declarator (_ (_) @lhs) )) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (variable_declaration  (variable_declarator (_ (_) @lhs) )) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (var_declaration (var_spec value:(expression_list (_) @variable )    ))  `,
			` (const_declaration (const_spec value:(expression_list (_) @variable )    ))  `,
			` (short_var_declaration left:(expression_list (_) @variable )) `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			`(local_variable_declaration declarator:(variable_declarator name:(identifier) @lhs)) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [` (variable_declarator name:(_ (_) @lhs) ) `].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: [`(pair key : (string (_) @key))`].join('\n'),
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
		selector: [`(assignment left:(_ attribute: (_)@lhs))`].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [
			` (let_declaration pattern:(tuple_pattern (_) @lhs)) `,
			` (static_item name:(_) @lhs )`,
			` (let_declaration   pattern:(identifier) @lhs )`,
			` (const_item name:(_) @lhs )`,
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
		].join('\n'),
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		//todo revise the selectors
		selector: [`(block_mapping_pair key : (flow_node (_) @lhs ))`].join('\n'),
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		//todo revise the selectors
		selector: [
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
};
