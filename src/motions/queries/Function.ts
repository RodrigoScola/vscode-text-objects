function C(): Selector {
	return {
		language: 'c',
		query: [
			`(function_definition) @function`,
			`(declaration declarator: (function_declarator)) @function`,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			` (function_definition) @function `,
			`(template_declaration (function_definition)) @function`,
			` (declaration (init_declarator value: (lambda_expression declarator: (abstract_function_declarator)) )) @function `,
			` (lambda_expression declarator: (abstract_function_declarator)) @function `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			`(local_function_statement) @function`,
			`(method_declaration) @function`,
			` (lambda_expression)  @function `,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			`
  (go_statement
 (call_expression
function:(parenthesized_expression
  (func_literal)))) @function
        `,
			`
  (var_declaration
 (var_spec
 value:(expression_list
  (func_literal)))) @function
        `,
			`(function_declaration) @function`,
			` (func_literal) @function `,
			`(method_declaration) @function`,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			`(method_declaration) @function`,
			`(local_variable_declaration
 declarator:(variable_declarator
 value:(lambda_expression))) @function`,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			`(export_statement (_ (_ (function_expression) @function ))) @export `,
			`(_ (_ (function_expression) @function )) @declaration `,
			`(method_definition) @function`,
			`(arguments (function_expression)  @function ) @arguments `,
			`(arrow_function ) @function `,
			`(export_statement (function_declaration) @function ) @export `,
			`(function_declaration) @function `,
			`(_ (_    (arrow_function) @function  )) @export `,
			`(export_statement (_ (_ value: (arrow_function) @function )) ) @export `,
			`(_ arguments:(_ (arrow_function) @function )) `,
		].join('\n'),
	};
}
function lua(): Selector {
	return {
		language: 'lua',
		query: [
			` (function_definition_statement) @function `,
			` (local_function_definition_statement) @function `,
			` (local_variable_declaration
  (expression_list value:(function_definition))) @function `,
			`(variable_assignment
  (expression_list value:(function_definition))) @function `,
			`(field value:(function_definition)) @function`,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [` (function_definition) @function `].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [
			`(let_declaration pattern: (identifier) (_) ) @anonymous_function`,
			`(function_item ) @function.declaration`,
			`(function_signature_item) @function.declaration`,
		].join('\n'),
	};
}
function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}

function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: javascript().query,
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
	lua,
	python,
	rust,
	typescript,
	typescriptreact,
	javascriptreact,
};
