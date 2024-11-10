export const GoQuery = {
	'outer.comment': ['(comment)+ @comment'].join('\n'),
	'inner.comment': ['(comment) @comment'].join('\n'),
	'outer.type': [
		`(parameter_list (parameter_declaration)) @types`,
		`(type_declaration) @types`,
		`(pointer_type) @types `,
		`(type_identifier) @types`,
		`(interface_type) @types `,
		`(qualified_type  ) @types `,
	].join('\n'),
	'inner.type':
		//todo: complete this
		[
			`(pointer_type (_) @types ) `,
			`(interface_type (_) @types)`,
			`(struct_type (field_declaration_list (_)+ @types))`,
			`(qualified_type (_) @types ) `,
		].join('\n'),
	'inner.call': ` (call_expression arguments:(argument_list (_) @call )) `,
	'inner.parameters': [
		`(parameter_list
    (_) @parameters
    )`,
	].join('\n'),
	'outer.call': `
    (call_expression) @call`,
	'outer.parameters': [`(parameter_list   )@parameters `].join('\n'),
	'outer.array': [
		` (composite_literal type: (array_type)) @array`,
		` (composite_literal type: (slice_type)) @array`,
		` (var_declaration (var_spec type : (array_type))) @array `,
		` (var_declaration (var_spec type : (slice_type))) @slice `,
	].join('\n'),
	//this would be a struct
	['outer.class']: '(type_declaration (type_spec type: (struct_type) )) @struct ',
	'inner.class': `
 (struct_type (field_declaration_list (_)+ @struct) )
    `,
	'inner.string': [`(raw_string_literal) @string`, `(interpreted_string_literal) @string`].join('\n'),
	'outer.object': [
		`(type_declaration (type_spec type: (struct_type))) @struct`,
		` (expression_list (composite_literal (_) ) ) @struct`,
	].join('\n'),
	'outer.string': [`(raw_string_literal) @string`, `(interpreted_string_literal) @string`].join('\n'),

	'outer.variable': [
		`
               (short_var_declaration) @variable
               `,
		` (var_declaration) @variable `,
		` (const_declaration) @variable `,
		` (const_spec) @variable `,
	].join('\n'),

	'inner.array': [
		` (composite_literal type: (array_type) body: (literal_value (_) @array)) `,
		` (composite_literal type: (slice_type) body: (literal_value (_) @array)) `,
		` (var_declaration (var_spec type : (array_type))) @array `,
	].join('\n'),
	'inner.object': [
		`(type_declaration (type_spec type: (struct_type))) @struct`,
		` (expression_list (composite_literal (_) ) ) @struct`,
	].join('\n'),
	'outer.lhs': [
		`
               (short_var_declaration left : (_) @variable ) 
               `,
		` (var_declaration (var_spec name:(identifier) @variable type:(_)* @variable ))  `,
		` (const_declaration (const_spec name:(identifier) @variable  type:(_)* @variable ))  `,
	].join('\n'),
	//TODO:make the golang inner lhs better
	'inner.lhs': [
		` (var_declaration (var_spec value:(expression_list (_) @variable )    ))  `,
		` (const_declaration (const_spec value:(expression_list (_) @variable )    ))  `,
		` (short_var_declaration left:(expression_list (_) @variable )) `,
	].join('\n'),
};
