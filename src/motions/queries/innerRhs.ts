import { QuerySelector } from '../commands';

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
		selector: [
			// lambda_expression
			`(init_declarator value:(_ body:(_ (_)+ @rhs ))) `,
			`(init_declarator value:(_ value: (_(_)@rhs ))) `,
			`(init_declarator value:(_ arguments:(argument_list (lambda_expression body:(_ (_) @rhs ))))) `,
			`(init_declarator value:(_  arguments:(_ (_) @rhs))) `,
		].join('\n'),
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
			` (expression_list (_ body:(_ (_) @rhs ))) `,
			` (expression_list (_ function:(_ body:(_ (_)+ @rhs )))) `,
			` (expression_list (_ arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (_ declarator:(_ value:(object_creation_expression (_ (_) @rhs )))) `,
			` (_ value:(array_initializer (_)@rhs)) `,
			` (_ declarator:(_ value:(_ arguments:(_ (_) @rhs)))) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			` (variable_declarator value:(object (_) @rhs))`,
			` (assignment_expression right:(_ (_)@rhs )) `,
			` (variable_declarator value:(_ body:(_ (_)+ @rhs ))) `,
			` (variable_declarator value:(_ arguments:(_ (_) @rhs))) `,
		].join('\n'),
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
			` (variable_assignment (variable_list) (expression_list value:(_ (_) @rhs )  )) `,
			` (local_variable_declaration (expression_list value:(_ (_) @rhs ) )) `,
			// there is the call one gets the first item, idk late :)
			` (local_variable_declaration (_ value:(_ arguments:(_ (_) @rhs )))) `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
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
