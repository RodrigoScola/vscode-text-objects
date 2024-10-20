import { Selector } from '../commands';

//still need to do this one
// was giving a lot of errors like resolved is not a function
export const LUA: Selector = {
	['outer.function']: [
		` (function_definition_statement) @function `,
		` (local_function_definition_statement) @function `,
		` (local_variable_declaration
  (expression_list value:(function_definition))) @function `,
		`(variable_assignment
  (expression_list value:(function_definition))) @function `,
		`(field value:(function_definition)) @function`,
	].join('\n'),
	['inner.function']: [
		` (function_definition_statement body: (block (_)+ @function )) `,
		` (local_function_definition_statement body: (block (_)+ @function ))  `,
		` (local_variable_declaration
		  (expression_list value:(function_definition body: (block (_)+ @function )))) `,
		`(variable_assignment
		  (expression_list value:(function_definition body: (block (_)+ @function ))))  `,
		`(field value:(function_definition body: (block (_)+ @function))) `,
	].join('\n'),
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.array']: '(block_node (block_sequence (block_sequence_item)+ )) @array',
	['outer.class']: '',
	['inner.class']: '',
	['outer.conditional']: '',
	['inner.conditional']: '',
	['inner.loop']: '',
	['outer.loop']: '',
	['inner.string']: '',
	['outer.string']: [
		`(single_quote_scalar) @string`,
		`(double_quote_scalar) @string`,
		`(quote_scalar) @string`,
		`(block_scalar) @string`,
	].join('\n'),
	['outer.object']: '',
	['outer.variable']: '',
	['outer.rhs']: '',
	['inner.type']: '',
	['outer.comment']: '',
	['outer.type']: '',
};
