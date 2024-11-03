import { NODES } from '../../constants';
import { Selector } from '../commands';

export const Rust: Selector = {
	['outer.function']: [
		`(let_declaration
        pattern: (identifier) 
        (_) 
        ) @anonymous_function`,
		`(function_item name: (identifier) @${NODES.FUNCTION_NAME}) @function.declaration `,
		`(function_item ) @function.declaration`,
		`(function_signature_item) @function.declaration`,
	].join('\n'),
	['inner.function']: [
		//todo do the let function declaration
	].join('\n'),
	['outer.call']: [`(call_expression) @call`].join('\n'),
	['inner.call']: [`(call_expression arguments: (arguments ) @call)`].join('\n'),
	['outer.parameters']: '(parameters) @parameters',
	//todo check if we can make this better
	// now whenever i do (parameters (parameter) @parameters )
	//just selects the first one
	['inner.parameters']: '(parameters) @parameters',
	['outer.array']: [
		`(struct_item body: (field_declaration_list (_) @class)) `,
		`(impl_item) @class`,
		`(trait_item) @class`,
		`(enum_item) @class`,
	].join('\n'),
	['outer.class']: [`(struct_item) @class`, `(impl_item) @class`, `(trait_item) @class`, `(enum_item) @class`].join('\n'),
	['inner.class']: [
		`(struct_item body: (field_declaration_list (_)+ @class )) `,
		`(impl_item body: (declaration_list (_)+ @class )) `,
		`(trait_item body: (declaration_list (_)+ @class)) `,
		`(enum_item body: (enum_variant_list (_)+ @class )) `,
	].join('\n'),
	['outer.conditional']: [
		`(if_expression) @conditional`,
		`(match_expression) @conditional`,
		`(let_declaration value: (if_expression)) @conditional`,
	].join('\n'),
	['inner.conditional']: [
		`(if_expression consequence: (block (_)+ @conditional )) `,
		`(match_expression body: (match_block (_)+ @conditional )) `,
		`(let_declaration value: (if_expression consequence: (block (_)+ @conditional))) `,
		//todo do the else ones
	].join('\n'),
	['inner.loop']: [
		`(loop_expression body: (block (_)+ @loop )) `,
		`(while_expression body: (block (_)+ @loop )) `,
		`(for_expression body: (block (_)+ @loop )) `,
	].join('\n'),
	['outer.loop']: [`(loop_expression) @loop`, `(while_expression) @loop`, `(for_expression) @loop`].join('\n'),
	// maybe? figure out a way that they can have inner string, because strings are only "
	['inner.string']: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	['outer.string']: [`(string_literal) @string`, `(char_literal) @string`].join('\n'),
	['outer.object']: [`(struct_item) @object`, `(struct_expression) @object`, `(enum_item) @object`].join('\n'),
	['outer.variable']: [`(let_declaration) @variable`, `(const_item) @variable`, `(static_item) @variable`].join('\n'),
	['outer.rhs']: [`(let_declaration value: (_) @rhs)`].join('\n'),
	['outer.comment']: [` (line_comment) @comment `, ` (block_comment) @comment `].join('\n'),
	['outer.type']: [`(type_identifier) @type`, `(primitive_type) @type`, `(struct_item) @class`].join('\n'),
	['inner.type']: '(struct_item body: (field_declaration_list (_) @types ))',

	'inner.array': [].join('\n'),
	'inner.object': [].join('\n'),
	'outer.lhs': [].join('\n'),
	'inner.lhs': [].join('\n'),
	'inner.rhs': [].join('\n'),
};
