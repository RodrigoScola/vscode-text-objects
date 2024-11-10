export const Rust = {
	['outer.call']: [`(call_expression) @call`].join('\n'),
	['inner.call']: [`(call_expression arguments: (arguments ) @call)`].join('\n'),
	['outer.parameters']: '(parameters) @parameters',
	//todo check if we can make this better
	// now whenever i do (parameters (parameter) @parameters )
	//just selects the first one
	['inner.parameters']: '(parameters) @parameters',
	['outer.array']: [`(array_expression ) @array`].join('\n'),
	['outer.class']: [
		`(struct_item) @class`,
		`(impl_item) @class`,
		`(trait_item) @class`,
		`(enum_item) @class`,
	].join('\n'),
	['inner.class']: [
		`(struct_item body: (field_declaration_list (_)+ @class )) `,
		`(impl_item body: (declaration_list (_)+ @class )) `,
		`(trait_item body: (declaration_list (_)+ @class)) `,
		`(enum_item body: (enum_variant_list (_)+ @class )) `,
	].join('\n'),
	['inner.string']: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	['outer.string']: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	['outer.object']: [`(struct_item) @object`, `(struct_expression) @object`, `(enum_item) @object`].join('\n'),
	['outer.variable']: [
		`(let_declaration) @variable`,
		`(const_item) @variable`,
		`(static_item) @variable`,
	].join('\n'),
	['outer.rhs']: [`(let_declaration value: (_) @rhs)`].join('\n'),
	['outer.comment']: [` (line_comment)+ @comment `, ` (block_comment)+ @comment `].join('\n'),
	['inner.comment']: [` (line_comment) @comment `, ` (block_comment) @comment `].join('\n'),
	['outer.type']: [`(type_identifier) @type`, `(primitive_type) @type`, `(struct_item) @class`].join('\n'),
	['inner.type']: '(struct_item body: (field_declaration_list (_) @types ))',

	'inner.array': [`(array_expression (_) @array ) `].join('\n'),
	'inner.object': [
		`(struct_item body: (field_declaration_list (_) @object)) `,
		`(struct_expression body: (field_initializer_list (_) @object)) `,
		`(enum_item body: (enum_variant_list (_) @object)) `,
	].join('\n'),
};
