import { Selector } from '../commands';

export const C: Selector = {
	['outer.function']: [
		`(function_definition) @function`,
		`(declaration declarator: (function_declarator)) @function`,
	].join('\n'),
	['inner.function']: [`(function_definition body: (compound_statement (_)+ @function)) `].join(
		'\n'
	),
	['outer.call']: '(call_expression) @call',
	['inner.call']: '(call_expression arguments: (argument_list (_) @call )) ',
	['outer.parameters']: '(parameter_list) @parameters',
	['inner.parameters']: '(parameter_list (_) @parameters) ',
	['outer.array']: `(init_declarator
                        declarator:(array_declarator)
                        value:(_) @array)`,
	['outer.class']: `(struct_specifier) @class`,
	['inner.class']: `(struct_specifier body: (field_declaration_list (_)+ @class ))`,
	['outer.conditional']: [
		`(if_statement) @conditional`,
		` (conditional_expression) @conditional`,
	].join('\n'),
	['inner.conditional']: [
		`(if_statement consequence: (compound_statement (_)+ @conditional))`,
		` (conditional_expression consequence: (_) @conditional)`,
	].join('\n'),
	['outer.loop']: [
		`(for_statement) @loops`,
		`(while_statement) @loops`,
		`(do_statement) @loops`,
	].join('\n'),
	['inner.loop']: [
		`(for_statement body: (compound_statement (_)+ @loops)) `,
		`(while_statement body: (compound_statement (_)+ @loops)) `,
		`(do_statement body: (compound_statement (_)+ @loops)) `,
	].join('\n'),
	['outer.string']: ['(string_literal) @string', '(char_literal) @string'].join('\n'),
	['inner.string']: ['(string_content) @string', '(character) @string'].join('\n'),
	['outer.object']: `(struct_specifier) @class`,
	['outer.variable']: [`(declaration declarator: (init_declarator)) @variable`].join('\n'),
	['outer.rhs']: [`(init_declarator value: (_) @rhs ) `].join('\n'),
	['inner.type']: `(struct_specifier body: (field_declaration_list (_)+ @types ))`,
	['outer.type']: [
		`(declaration (type_qualifier) @types type: (primitive_type) @types ) `,
		`(declaration  type: (union_specifier) @types ) `,
		`(declaration (storage_class_specifier) @types type: (primitive_type) @types ) `,
		`(primitive_type) @types`,
		`(struct_specifier) @types`,
	].join('\n'),
	['outer.comment']: [`(comment) @comment`].join('\n'),
};
