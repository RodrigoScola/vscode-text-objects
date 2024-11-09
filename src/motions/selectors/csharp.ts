import { Selector } from '../commands';

export const Csharp: Selector = {
	['outer.function']: [
		`(local_function_statement) @function`,
		`(method_declaration) @function`,
		` (lambda_expression)  @function `,
	].join('\n'),
	['inner.function']: [
		` (method_declaration body:(block (_)+ @function )) `,
		` (local_function_statement body:(block (_)+ @function )) `,
		` (lambda_expression body:(_)+ @function )`,
	].join('\n'),
	['inner.call']: [` (invocation_expression arguments:(argument_list (_) @call)) `].join('\n'),
	['outer.call']: [` (invocation_expression) @call`].join('\n'),
	['outer.parameters']: [`(parameter_list) @parameters `].join('\n'),
	['inner.parameters']: ` ((parameter_list (_) @parameters) `,
	['outer.array']: [` (initializer_expression) @array `].join('\n'),
	['outer.class']: [`(class_declaration) @class`].join('\n'),
	['inner.class']: [` (class_declaration body: (declaration_list (_)+ @body)) `].join('\n'),
	['outer.conditional']: [` (if_statement) @conditional `, `(conditional_expression) @conditional`].join('\n'),
	['inner.conditional']: [
		` (if_statement consequence: (block (_)@conditional)) `,
		`(conditional_expression consequence: (_) @conditional )`,
	].join('\n'),
	['inner.loop']: [
		`(for_statement body: (block (_)+ @loop)) `,
		`(for_each_statement (block (_)+ @loop)) `,
		`(while_statement (block (_)+ @loop)) `,
		`(do_statement (block (_)+ @loop))`,
	].join('\n'),
	['outer.loop']: [
		`(for_statement) @loop`,
		`(for_each_statement) @loop`,
		`(while_statement) @loop`,
		`(do_statement) @loop`,
	].join('\n'),
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
	['outer.rhs']: [` (equals_value_clause (_) @rhs )`, ` (assignment_expression right:(_) @rhs )`].join('\n'),

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
	'outer.lhs': [` (variable_declaration  (variable_declarator (_) @lhs)) `].join('\n'),
	'inner.lhs': [` (variable_declaration  (variable_declarator (_ (_) @lhs) )) `].join('\n'),
	['inner.rhs']: [
		` (equals_value_clause (_ (_)@rhs)   )`,
		` (assignment_expression right:(_ (_) @rhs)   )`,
	].join('\n'),
};
