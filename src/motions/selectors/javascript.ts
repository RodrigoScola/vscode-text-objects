export const JsQuery = {
	['inner.type']: '',
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment) @comment',
	['outer.type']: '',
	['inner.parameters']: [`(formal_parameters (_)* @parameter )`].join('\n'),
	['outer.parameters']: [`(formal_parameters) @parameter`].join('\n'),

	'outer.variable': [
		//todo: go to a class with the public and check if node is good name
		//`( public_field_definition) @lexical_declaration`,

		` (export_statement (lexical_declaration (variable_declarator ) @variable_declarator)) @lexical_declaration `,
		` (lexical_declaration (variable_declarator ) @variable_declarator) @lexical_declaration `,
	].join('\n'),
	'outer.call': [`(call_expression   ) @call  `].join('\n'),
	'inner.call': [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),
	'outer.class': [
		` ( class_declaration ) @class `,
		` (export_statement declaration: ( class_declaration ) ) @export `,
	].join('\n'),
	'inner.class': [
		` (export_statement declaration: ( class_declaration body: (class_body (_)* @class.body) )) `,
	].join('\n'),

	'outer.array': ['(array) @array'].join('\n'),
	'inner.array': ['(array (_) @array) '].join('\n'),
	'outer.object': ['(object) @object'].join('\n'),
	'inner.object': ['(object (_) @object ) '].join('\n'),
	'inner.string': [`(string (_)* @string) `, `(template_string (_)* @string) `].join('\n'),
	'outer.string': [`( string ) @string`, `( template_string ) @string`].join('\n'),

	'outer.lhs': [` (variable_declarator name:(_) @lhs) `].join('\n'),
	'inner.lhs': [` (variable_declarator name:(_ (_) @lhs) ) `].join('\n'),
};
