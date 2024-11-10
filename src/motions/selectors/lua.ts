//still need to do this one
// was giving a lot of errors like resolved is not a function
export const LUA = {
	['outer.call']: '(call arguments: (argument_list) @call)',
	['inner.call']: '(call arguments: (argument_list (_)@call )) ',
	['outer.parameters']: '(parameter_list) @params',
	['inner.parameters']: '(parameter_list (_) @params) ',
	['outer.array']: ` (expression_list
value:(table (field_list)) @array)`,
	['outer.class']: '',
	['inner.class']: '',
	['inner.string']: '(string) @string',
	['outer.string']: '(string) @string',
	['outer.object']: '(table) @object',
	['outer.variable']: [`(variable_assignment) @variable`, `(local_variable_declaration) @variable`].join('\n'),
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment) @comment',
	['inner.type']: '',
	['outer.type']: '',

	'inner.array': [` (expression_list value:(table (field_list (_) @array )) )`].join('\n'),
	'inner.object': [`(table (field_list (_) @object )) `].join('\n'),
	'outer.lhs': [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
	'inner.lhs': [` (variable_list (variable name:(identifier) @val)) `].join('\n'),
};
