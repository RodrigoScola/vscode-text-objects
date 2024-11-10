export const JsQuery = {
	['inner.type']: '',
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment) @comment',
	['outer.type']: '',
	['inner.parameters']: [`(formal_parameters (_)* @parameter )`].join('\n'),
	['outer.parameters']: [`(formal_parameters) @parameter`].join('\n'),

	'outer.call': [`(call_expression   ) @call  `].join('\n'),
	'inner.call': [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),

	'outer.array': ['(array) @array'].join('\n'),
	'inner.array': ['(array (_) @array) '].join('\n'),
	'outer.object': ['(object) @object'].join('\n'),
	'inner.object': ['(object (_) @object ) '].join('\n'),
};
