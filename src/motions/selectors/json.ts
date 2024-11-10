import { JsQuery } from './javascript';

export const JsonSelector = {
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.type']: '',
	['inner.type']: '',
	['outer.comment']: JsQuery['outer.comment'],
	['inner.comment']: JsQuery['inner.comment'],
	['outer.array']: JsQuery['outer.array'],
	['outer.class']: '',
	['inner.class']: '',
	['inner.string']: `(string_content) @string`,
	['outer.string']: `(string) @string`,
	['outer.object']: JsQuery['outer.object'],
	['outer.variable']: `(pair) @variable`,
	'inner.array': JsQuery['inner.array'],
	'inner.object': JsQuery['inner.object'],
};
