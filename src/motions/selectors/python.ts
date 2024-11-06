import { Selector } from '../commands';

export const PythonQuery: Selector = {
	['outer.function']: ` (function_definition) @function `,
	['inner.function']: '( right: (lambda) @function) ',
	['inner.call']: '(call arguments: (argument_list (_) @call)  )',
	['outer.call']: '(call) @call',
	['outer.parameters']: '(parameters)+ @parameters',
	['inner.parameters']: '(parameters (_) @parameters )',
	['outer.object']: '(dictionary) @object',
	['outer.array']: ' (list) @array',
	['outer.class']: ' (class_definition) @class ',
	['inner.class']: ' (class_definition body: (_) @class )',
	['outer.conditional']: ` (if_statement)  @conditional `,
	['inner.conditional']: ` (if_statement consequence: (_) @conditional)  `,
	['inner.loop']: ` (for_statement body: (block (_)+ @loop)) `,
	['outer.loop']: [` (for_statement) @loop `, `(while_statement) @loop`, `(list_comprehension) @loop`].join(
		'\n'
	),
	['inner.string']: `
    (string_content) @string
    `,
	['outer.string']: ` (string) @string `,
	['outer.variable']: ` (expression_statement) @variable `,
	['outer.rhs']: ` (assignment right: (_) @rhs) `,
	['outer.comment']: ` (comment)+ @comment `,
	['outer.type']: '',
	['inner.type']: '',

	'inner.array': [`(list (_) @array )`].join('\n'),
	'inner.object': ['(dictionary (_) @object) '].join('\n'),
	'outer.lhs': [` (assignment left: (_) @lhs) `].join('\n'),
	'inner.lhs': [`(assignment left:(_ attribute: (_)@lhs))`].join('\n'),
	'inner.rhs': [` (assignment right:(_ (_)@rhs)) `].join('\n'),
};
