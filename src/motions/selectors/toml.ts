import { Selector } from '../commands';

//still need to do this one
// was giving a lot of errors like resolved is not a function
export const TOML: Selector = {
	['outer.function']: [].join('\n'),
	['inner.function']: '',
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.array']: '(array) @array',
	['outer.class']: '',
	['inner.class']: '',
	['outer.conditional']: '',
	['inner.conditional']: '',
	['inner.loop']: '',
	['outer.loop']: '',
	['inner.string']: [`(string) @string`].join('\n'),
	['outer.string']: [`(string) @string`].join('\n'),
	['outer.object']: ['(table) @object', `(inline_table) @object`].join('\n'),
	['outer.variable']: ['(pair) @variable'].join('\n'),
	['outer.rhs']: [`(pair (bare_key) (_) @rhs)`].join('\n'),
	['inner.type']: '',
	['outer.comment']: '(comment)+ @comment',
	['outer.type']: '',
};
