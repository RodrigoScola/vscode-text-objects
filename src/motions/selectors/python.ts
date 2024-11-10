export const PythonQuery = {
	['inner.call']: '(call arguments: (argument_list (_) @call)  )',
	['outer.call']: '(call) @call',
	['outer.parameters']: '(parameters) @parameters',
	['inner.parameters']: '(parameters (_) @parameters )',
	['outer.object']: '(dictionary) @object',
	['outer.array']: ' (list) @array',
	['outer.class']: ' (class_definition) @class ',
	['inner.class']: ' (class_definition body: (_) @class )',
	['inner.string']: `
    (string_content) @string
    `,
	['outer.string']: ` (string) @string `,
	['outer.variable']: ` (expression_statement) @variable `,
	['outer.comment']: ` (comment)+ @comment `,
	['inner.comment']: ` (comment) @comment `,
	['outer.type']: '',
	['inner.type']: '',

	'inner.array': [`(list (_) @array )`].join('\n'),
	'inner.object': ['(dictionary (_) @object) '].join('\n'),
	'outer.lhs': [` (assignment left: (_) @lhs) `].join('\n'),
	'inner.lhs': [`(assignment left:(_ attribute: (_)@lhs))`].join('\n'),
};
