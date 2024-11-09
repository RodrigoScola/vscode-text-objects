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
	['outer.call']: '(call arguments: (argument_list) @call)',
	['inner.call']: '(call arguments: (argument_list (_)@call )) ',
	['outer.parameters']: '(parameter_list) @params',
	['inner.parameters']: '(parameter_list (_) @params) ',
	['outer.array']: ` (expression_list
value:(table (field_list)) @array)`,
	['outer.class']: '',
	['inner.class']: '',
	['outer.conditional']: '(if_statement) @conditional',
	//todo this doesnt select everyhing
	['inner.conditional']: [
		'(if_statement consequence: (_) @conditional )',
		'(if_statement consequence: (_) @conditional (comment) @comment )',
	].join('\n'),
	['outer.loop']: [
		`(while_statement) @loop`,
		`(repeat_statement) @loop`,
		`(for_numeric_statement) @loop`,
		`(for_generic_statement) @loop`,
	].join('\n'),

	['inner.loop']: [
		`(while_statement body: (block (_)+ @loop )) `,
		`(repeat_statement body: (block (_)+ @loop )) `,
		`(for_numeric_statement body: (block (_)+ @loop )) `,
		`(for_generic_statement body: (block (_)+ @loop )) `,
	].join('\n'),
	['inner.string']: '(string) @string',
	['outer.string']: '(string) @string',
	['outer.object']: '(table) @object',
	['outer.variable']: [`(variable_assignment) @variable`, `(local_variable_declaration) @variable`].join('\n'),
	['outer.rhs']: [
		` (local_variable_declaration
  (expression_list value:(_) @rhs))
        `,
		`
        (variable_assignment
 (variable_list)
  (expression_list value:(_) @rhs ))
        `,
	].join('\n'),
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment) @comment',
	['inner.type']: '',
	['outer.type']: '',

	'inner.array': [` (expression_list value:(table (field_list (_) @array )) )`].join('\n'),
	'inner.object': [`(table (field_list (_) @object )) `].join('\n'),
	'outer.lhs': [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
	'inner.lhs': [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
	'inner.rhs': [
		` (local_variable_declaration
  (expression_list value:(_ (_) @rhs ) ))
        `,
		`
        (variable_assignment
 (variable_list)
  (expression_list value:(_ (_) @rhs )  ))
        `,
	].join('\n'),
};
