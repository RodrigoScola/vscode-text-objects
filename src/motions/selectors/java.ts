export const JAVA = {
	['outer.call']: ` (expression_statement
                        (method_invocation arguments:(argument_list ) @call)) `,
	['inner.call']: ` (expression_statement
 (method_invocation
 arguments:(argument_list (_) @call))) `,

	['outer.parameters']: ` (formal_parameters) @parameters `,
	['inner.parameters']: ` (method_declaration
 parameters:(formal_parameters (_) @parameters) ) `,
	['outer.array']: '(array_initializer) @array',
	['outer.object']: [
		'(class_declaration) @class',
		` (local_variable_declaration
 declarator:(variable_declarator
 value:(object_creation_expression))) @object `,
	].join('\n'),
	['outer.type']: [
		` (interface_declaration) @types `,
		` (method_declaration type:(void_type) @types) `,
		`(type_identifier) @types`,
		`(void_type) @types`,
		`(array_type) @types`,
		`(integral_type) @types`,
		`(catch_type) @types`,
	].join('\n'),
	['outer.comment']: [`(line_comment)+ @comment`, `(block_comment)+ @comment`].join('\n'),
	['inner.comment']: [`(line_comment) @comment`, `(block_comment) @comment`].join('\n'),
	['inner.type']: [`(interface_declaration body:(interface_body (_) @type))`].join('\n'),

	'inner.array': [`(array_initializer (_) @array )`].join('\n'),
	'inner.object': [
		'(class_declaration body: (class_body (_) @class) ) ',
		` (local_variable_declaration
 declarator:(variable_declarator
 value:(object_creation_expression) @object )) `,
	].join('\n'),
};
