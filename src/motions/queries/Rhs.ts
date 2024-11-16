import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [`(assignment_expression right:(_) @lhs)`, `(init_declarator value: (_) @rhs ) `].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			` (init_declarator value:(_) @variable ) `,
			` (field_declaration default_value:(_) @variable)`,
			` (assignment_expression right:(_) @rhs) `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (equals_value_clause (_) @rhs )`, ` (assignment_expression right:(_) @rhs )`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			`(short_var_declaration right: (_) @rhs)`,
			`(assignment_statement right:(_)+ @rhs)`,
			`(var_spec value:(expression_list (_) @rhs ))`,
			`(const_spec value:(expression_list (_) @rhs))`,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			`(assignment_expression left:(identifier) right:(_) @rhs) `,
			`(variable_declarator value:(_) @rhs) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			`(variable_declarator value: (_) @rhs)`,
			`(assignment_expression right:(_) @rhs) `,
			`(field_definition  value:(_) @rhs) `,
		].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: [`(pair value: (_) @rhs)`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [
			` (local_variable_declaration (expression_list value:(_) @rhs)) `,
			` (variable_assignment (expression_list value:(_) @rhs )) `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (assignment right:(_) @rhs)`].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [` (let_declaration value:(_) @rhs) `, ` (assignment_expression right:(_) @rhs) `].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(pair (bare_key) (_) @rhs)`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: [
			`(variable_declarator value: (_) @rhs)`,
			`(assignment_expression right:(_) @rhs) `,
			` (class_declaration body:(class_body (public_field_definition value:(_) @rhs ))) `,
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
