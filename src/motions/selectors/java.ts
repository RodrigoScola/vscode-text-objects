import { Selector } from '../commands';

export const JAVA: Selector = {
	['outer.function']: [
		`(method_declaration) @function`,
		`(local_variable_declaration
 declarator:(variable_declarator
 value:(lambda_expression))) @function`,
	].join('\n'),
	['inner.function']: [
		` (method_declaration body:(block (_)+ @function)) `,
		` (variable_declarator value:(lambda_expression body:(block (_)+ @function)))`,
	].join('\n'),
	['outer.call']: ` (expression_statement
                        (method_invocation arguments:(argument_list ) @call)) `,
	['inner.call']: ` (expression_statement
 (method_invocation
 arguments:(argument_list (_) @call))) `,

	['outer.parameters']: ` (formal_parameters) @parameters `,
	['inner.parameters']: ` (method_declaration
 parameters:(formal_parameters (_) @parameters) ) `,
	['outer.array']: '(array_initializer) @array',
	['outer.class']: '(class_declaration) @class',
	['inner.class']: '(class_declaration body: (class_body (_) @class))',
	['outer.conditional']: [
		`(if_statement) @conditional`,
		`(switch_expression) @conditional`,
		` (assignment_expression right:(ternary_expression)) @conditional `,
	].join('\n'),
	['inner.conditional']: [
		`(if_statement consequence: (block (_)+ @conditional )) `,
		`(switch_expression body: (switch_block (_)+ @conditional )) `,
		` (assignment_expression right:(ternary_expression consequence: (_) @conditional )) `,
	].join('\n'),
	['inner.loop']: [
		` (for_statement body:(block (_) @loop)) `,
		` (enhanced_for_statement body:(block (_) @loop)) `,
		` (while_statement body:(block (_) @loop)) `,
		` (do_statement body:(block (_) @loop)) `,
	].join('\n'),
	['outer.loop']: [
		`(for_statement) @loop`,
		`(enhanced_for_statement) @loop`,
		`(while_statement) @loop`,
		`(do_statement) @loop`,
	].join('\n'),
	['inner.string']: ['(string_fragment) @string', `(multiline_string_fragment) @string`].join('\n'),
	['outer.string']: [`(string_literal) @string`, `(character_literal) @string`].join('\n'),
	['outer.object']: [
		'(class_declaration) @class',
		` (local_variable_declaration
 declarator:(variable_declarator
 value:(object_creation_expression))) @object `,
	].join('\n'),
	['outer.variable']: [
		` (local_variable_declaration) @variable `,
		`(expression_statement (assignment_expression)) @variable`,
	].join('\n'),
	['outer.rhs']: [
		` (assignment_expression left:(identifier) right:(_) @rhs) `,
		` (local_variable_declaration
 declarator:(variable_declarator
 value:(_) @rhs)) `,
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
	'outer.lhs': [
		`
  (local_variable_declaration
type:(_) @lhs
 declarator:(variable_declarator name:(identifier) @lhs)) `,

		` (assignment_expression left:(_) @lhs ) `,
	].join('\n'),
	'inner.lhs': [
		`(local_variable_declaration
 declarator:(variable_declarator name:(identifier) @lhs))
        `,
	].join('\n'),
	'inner.rhs': [
		` (assignment_expression  right:(_ (_) @rhs)) `,
		` (local_variable_declaration
 declarator:(variable_declarator
 value:(_ (_) @rhs ))) `,
	].join('\n'),
};
