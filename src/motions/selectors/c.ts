import { Selector } from '../commands';

export const C: Selector = {
	['outer.function']: [
		`(function_definition) @function`,
		`(declaration declarator: (function_declarator)) @function`,
	].join('\n'),
	['inner.function']: [`(function_definition body: (compound_statement (_)+ @function)) `].join('\n'),
	['outer.call']: '(call_expression) @call',
	['inner.call']: '(call_expression arguments: (argument_list (_) @call )) ',
	['outer.parameters']: '(parameter_list ) @parameters ',
	['inner.parameters']: '(parameter_list (_) @parameters) ',
	['outer.array']: `(init_declarator
                        declarator:(array_declarator)
                        value:(_) @array)`,
	['outer.class']: `(struct_specifier) @class`,
	['inner.class']: `(struct_specifier body: (field_declaration_list (_)+ @class ))`,
	['outer.conditional']: [`(if_statement) @conditional`, ` (conditional_expression) @conditional`].join('\n'),
	['inner.conditional']: [
		`(if_statement consequence: (compound_statement (_)+ @conditional))`,
		`(if_statement alternative: (else_clause (_)+ @conditional))`,
		` (conditional_expression consequence: (_) @conditional)`,
		` (conditional_expression alternative: (_) @conditional)`,
	].join('\n'),
	['outer.loop']: [`(for_statement) @loops`, `(while_statement) @loops`, `(do_statement) @loops`].join('\n'),
	['inner.loop']: [
		`(for_statement body: (compound_statement (_)+ @loops)) `,
		`(while_statement body: (compound_statement (_)+ @loops)) `,
		`(do_statement body: (compound_statement (_)+ @loops)) `,
	].join('\n'),
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
	'outer.lhs': [
		`
 (assignment_expression left:(_) @lhs)
        `,
		`
  (declaration
 (storage_class_specifier) @lhs
type:(primitive_type) @lhs
 declarator:(init_declarator
 declarator:(identifier) @lhs))`,
	].join('\n'),
	'inner.lhs': [
		` (field_expression field:(field_identifier) @lhs ) `,
		`
 (init_declarator declarator:(identifier) @lhs)`,
	].join('\n'),
	'inner.rhs': [
		`( field_expression field:(field_identifier) @rhs ) `,
		`
 (init_declarator value:(initializer_list (_) @rhs))`,
	].join('\n'),
	['outer.rhs']: [`(init_declarator value: (_) @rhs ) `, `(assignment_expression right:(_) @lhs)`].join('\n'),
};
