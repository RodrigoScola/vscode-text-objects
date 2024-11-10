export const C = {
	['outer.call']: '(call_expression) @call',
	['inner.call']: '(call_expression arguments: (argument_list (_) @call )) ',
	['outer.parameters']: '(parameter_list ) @parameters ',
	['inner.parameters']: '(parameter_list (_) @parameters) ',
	['outer.array']: `(init_declarator
                        declarator:(array_declarator)
                        value:(_) @array)`,
	['outer.class']: `(struct_specifier) @class`,
	['inner.class']: `(struct_specifier body: (field_declaration_list (_)+ @class ))`,
	['outer.string']: ['(string_literal) @string', '(char_literal) @string'].join('\n'),
	['inner.string']: ['(string_content) @string', '(character) @string'].join('\n'),
	['outer.object']: [
		`(struct_specifier) @object `,
		`(enum_specifier   ) @object `,
		`(union_specifier ) @object `,
	].join('\n'),
	['outer.variable']: [`(declaration declarator: (init_declarator)) @variable`].join('\n'),
	['inner.type']: [
		`(struct_specifier body: (field_declaration_list (_)+ @types ))`,
		`(union_specifier body:(field_declaration_list (_)+ @object) )`,
	].join('\n'),

	['outer.type']: [
		`(declaration (type_qualifier) @types type: (primitive_type) @types ) `,
		`(declaration  type: (union_specifier) @types ) `,
		`(declaration (storage_class_specifier) @types type: (primitive_type) @types ) `,
		`(primitive_type) @types`,
		`(struct_specifier) @types`,

		`(union_specifier  ) @type`,
	].join('\n'),
	['outer.comment']: [`(comment)* @comment`].join('\n'),
	['inner.comment']: [`(comment) @comment`].join('\n'),

	['inner.array']: `(init_declarator
                        declarator:(array_declarator)
                        value:(initializer_list (_) @array ) )`,
	['inner.object']: [
		`(struct_specifier body: (field_declaration_list (_) @object) ) `,
		`(enum_specifier body: (enumerator_list (_) @object )) `,
		`
  (union_specifier body:(field_declaration_list (_)+ @object) )
        
        `,
	].join('\n'),
};
