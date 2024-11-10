//still need to do this one
// was giving a lot of errors like resolved is not a function
export const LUA = {
	['outer.call']: '(call arguments: (argument_list) @call)',
	['inner.call']: '(call arguments: (argument_list (_)@call )) ',
	['outer.parameters']: '(parameter_list) @params',
	['inner.parameters']: '(parameter_list (_) @params) ',
	['outer.array']: ` (expression_list
value:(table (field_list)) @array)`,
	['outer.object']: '(table) @object',
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment) @comment',
	['inner.type']: '',
	['outer.type']: '',

	'inner.array': [` (expression_list value:(table (field_list (_) @array )) )`].join('\n'),
	'inner.object': [`(table (field_list (_) @object )) `].join('\n'),
};
