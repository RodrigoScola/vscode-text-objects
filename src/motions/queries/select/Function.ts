import { QuerySelector } from '../../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			`(function_definition) @function`,
			`(declaration declarator: (function_declarator)) @function`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			` (function_definition) @function `,
			`(template_declaration (function_definition)) @function`,
			` (declaration (init_declarator value: (lambda_expression declarator: (abstract_function_declarator)) )) @function `,
			` (lambda_expression declarator: (abstract_function_declarator)) @function `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			`(local_function_statement) @function`,
			`(method_declaration) @function`,
			` (lambda_expression)  @function `,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
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
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			`(method_declaration) @function`,
			`(local_variable_declaration
 declarator:(variable_declarator
 value:(lambda_expression))) @function`,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			`(method_definition) @function`,
			`(export_statement (function_declaration)) @function`,

			` (function_declaration) @function `,
			` (arrow_function) @function`,

			` (lexical_declaration (variable_declarator value: (arrow_function) @function.body)) @function `,
			`
		        (export_statement
		        (lexical_declaration
		        (variable_declarator
		        (function_expression)))) @function
					      `,
			`
					     (export_statement
					     (lexical_declaration
					     (variable_declarator
					     value: (arrow_function) ))) @function
					      `,
			,
			`(function_expression) @function`,
		].join('\n'),
	};
}
function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: [
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

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: [` (function_definition) @function `].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [
			`(let_declaration pattern: (identifier) (_) ) @anonymous_function`,
			`(function_item ) @function.declaration`,
			`(function_signature_item) @function.declaration`,
		].join('\n'),
	};
}
function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: [
			`(method_definition 
            name: (_) @function.name
            body: (_) @function.body
            ) @function`,
			`(function_expression
  (identifier)? @function_name
  (#not-eq? @function_name "identifier")) @anonymous_function`,
			` (arrow_function ) @anonymous_function`,
			,
			`(export_statement
                    (function_declaration
                    name: (identifier) @function.name
                    body: (statement_block) @function.body
                    ) @exportedFunction
               ) @export`,
			`
			   (function_declaration
			     name: (identifier) @function.name
			     body: (statement_block) @function.body
			   ) @function
			                `,
			`
			   (lexical_declaration
			               (variable_declarator
			               name : (identifier) @function.name
			   value: (arrow_function) @function.body
			     )
			   ) @function
			                `,
			`
			     (export_statement
			     (lexical_declaration
			     (variable_declarator
			     name: (identifier) @function.name
			     value: (arrow_function) @function.body
			)
			)
			) @function
			      `,
			`
               (arrow_function
  (identifier)? @function_name
  (#not-eq? @function_name "identifier")) @anonymous_function
                `,
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
	lua,
	python,
	rust,
	typescript,
};
