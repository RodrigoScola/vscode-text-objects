//still need to do this one
// was giving a lot of errors like resolved is not a function
export const TOML = {
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.array']: '(array) @array',
	['outer.class']: '',
	['inner.class']: '',
	['inner.string']: [`(string) @string`].join('\n'),
	['outer.string']: [`(string) @string`].join('\n'),
	['outer.object']: ['(table) @object', `(inline_table) @object`].join('\n'),
	['outer.variable']: ['(pair) @variable'].join('\n'),
	['outer.rhs']: [`(pair (bare_key) (_) @rhs)`].join('\n'),
	['inner.type']: '',
	['outer.comment']: '(comment)+ @comment',
	['inner.comment']: '(comment)  @comment',
	['outer.type']: '',

	['inner.array']: '(array (_) @array ) ',
	['inner.object']: ['(table (_) @object ) ', `(inline_table (_) @object) `].join('\n'),
	'outer.lhs': [`(pair (bare_key) @lhs) `].join('\n'),
	'inner.lhs': [`(pair (bare_key) @lhs) `].join('\n'),
};
