export const CppQuery = {
	['inner.call']: `
        (call_expression
        arguments: (
        argument_list (_)+ @call))
        `,
	['outer.call']: [
		`
        (call_expression) @call
        `,
	].join('\n'),
	['outer.parameters']: ` (parameter_list) @params `,
	['inner.parameters']: ` (parameter_list (_) @params ) `,

	['outer.array']: '(initializer_list ) @array',
	['outer.class']: '(class_specifier) @class',
	//todo fix this
	['inner.class']: '(class_specifier body: ( field_declaration_list (_)+ @class ) )',
	['inner.string']: ` (string_content) @string `,
	['outer.string']: [`(string_literal) @string`, `(raw_string_literal) @string`].join('\n'),
	['outer.object']: [
		`(class_specifier) @object`,
		`(struct_specifier) @object`,
		`(declaration
 declarator:(init_declarator
 value:(initializer_list))) @object`,
		`(type_definition
type:(struct_specifier)
 ) @object`,
	].join('\n'),
	['outer.variable']: [` (declaration) @variable `, ` (field_declaration) @variable `].join('\n'),
	['inner.type']: ``,
	['outer.type']: [`(primitive_type) @type`].join('\n'),
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment) @comment',

	['inner.array']: '(initializer_list (_) @array ) ',
	'inner.object': [
		` (class_specifier body:(field_declaration_list (_) @class))`,
		`(struct_specifier body : (field_declaration_list (_)@object) ) `,
		`(declaration
		 declarator:(init_declarator
		 value:(initializer_list (_) @object))) `,
		`(type_definition type:(struct_specifier body:(field_declaration_list (_) @object ))) `,
	].join('\n'),
	'outer.lhs': [` (declaration   declarator:(init_declarator (_) @lhs) ) `].join('\n'),
	'inner.lhs': [` (declaration   declarator:(init_declarator (_ (_) @lhs) )) `].join('\n'),
};
