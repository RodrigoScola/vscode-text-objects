export const Csharp = {
	['inner.call']: [` (invocation_expression arguments:(argument_list (_) @call)) `].join('\n'),
	['outer.call']: [` (invocation_expression) @call`].join('\n'),
	['outer.parameters']: [`(parameter_list) @parameters `].join('\n'),
	['inner.parameters']: ` ((parameter_list (_) @parameters) `,
	['outer.array']: [` (initializer_expression) @array `].join('\n'),
	['outer.class']: [`(class_declaration) @class`].join('\n'),
	['inner.class']: [` (class_declaration body: (declaration_list (_)+ @body)) `].join('\n'),
	['inner.string']: [
		` (string_literal) @string `,
		`(interpolated_string_expression) @string`,
		`(character_literal) @string`,
	].join('\n'),
	['outer.string']: [
		` (string_literal) @string `,
		`(interpolated_string_expression) @string`,
		`(character_literal) @string`,
	].join('\n'),
	// todo
	['outer.variable']: [`(variable_declaration) @variable`].join('\n'),

	['outer.comment']: [`(comment)+ @comment`].join('\n'),
	['inner.comment']: [`(comment) @comment`].join('\n'),
	['inner.type']: [
		// ` (variable_declaration type: (_) @type) `,
		`(type_argumented_list) @type`,
	].join('\n'),
	['outer.type']: [` (variable_declaration type: (_) @type) `, `(parameter type: (_) @type)`].join('\n'),

	['outer.object']: [
		` (class_declaration) @object `,
		` (enum_declaration) @object `,
		` (struct_declaration) @object `,
		` (record_declaration) @object `,
		`(anonymous_object_creation_expression) @object`,
		`(tuple_expression) @object`,
	].join('\n'),
	'inner.array': [` (initializer_expression (_) @array )  `].join('\n'),
	'inner.object': [
		[
			`(class_declaration body:(declaration_list (_)@object)) `,
			`(enum_declaration body:(enum_member_declaration_list (_)@object))  `,
			`(struct_declaration body:(declaration_list (_) @object))  `,
			`(record_declaration parameters: (parameter_list (_)@parameter)) @object `,
			`(anonymous_object_creation_expression (_) @object) `,
			`(tuple_expression (_) @object ) `,
		],
	].join('\n'),
};
