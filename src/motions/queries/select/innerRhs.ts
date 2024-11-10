import { QuerySelector } from '../../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			`( field_expression field:(field_identifier) @rhs ) `,
			` (init_declarator value:(initializer_list (_) @rhs))`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (init_declarator value:(_ (_)@rhs ))`].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			` (equals_value_clause (_ (_)@rhs)   )`,
			` (assignment_expression right:(_ (_) @rhs)   )`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (var_declaration (var_spec name:(identifier) @variable  ))  `,
			` (const_declaration (const_spec name:(identifier) @variable   ))  `,
			` (short_var_declaration right :(expression_list (_) @variable )) `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (assignment_expression  right:(_ (_) @rhs)) `,
			` (local_variable_declaration
 declarator:(variable_declarator
 value:(_ (_) @rhs ))) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [` (variable_declarator value:(_ (_) @rhs)) `].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: ['(pair value : (_ (_) @rhs))'].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [
			` (local_variable_declaration
  (expression_list value:(_ (_) @rhs ) ))
        `,
			`
        (variable_assignment
 (variable_list)
  (expression_list value:(_ (_) @rhs )  ))
        `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (assignment right:(_ (_)@rhs)) `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [
			` (let_declaration value: (_ (_) @rhs)) `,
			` (static_item value:(_(_) @rhs) )`,
			` (let_declaration   value: (_(_) @rhs) )`,
			` (const_item value:(_(_) @lhs) )`,
		].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(pair (bare_key) (_ (_) @rhs) )`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
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
};
