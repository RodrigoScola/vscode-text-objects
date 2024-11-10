export const PythonQuery = {
	['inner.call']: '(call arguments: (argument_list (_) @call)  )',
	['outer.call']: '(call) @call',
	['outer.parameters']: '(parameters) @parameters',
	['inner.parameters']: '(parameters (_) @parameters )',
	['outer.object']: '(dictionary) @object',
	['outer.array']: ' (list) @array',
	['outer.comment']: ` (comment)+ @comment `,
	['inner.comment']: ` (comment) @comment `,
	['outer.type']: '',
	['inner.type']: '',

	'inner.array': [`(list (_) @array )`].join('\n'),
	'inner.object': ['(dictionary (_) @object) '].join('\n'),
};
