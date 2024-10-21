import { Selector } from '../commands';
import { JsQuery } from './javascript';

export const JsonSelector: Selector = {
	['outer.function']: '',
	['inner.function']: '',
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.type']: '',
	['inner.type']: '',

	['outer.comment']: JsQuery['outer.comment'],
	['outer.array']: JsQuery['outer.array'],

	['outer.class']: '',
	['inner.class']: '',
	['outer.conditional']: '',
	['inner.conditional']: '',
	['inner.loop']: '',
	['outer.loop']: '',
	['inner.string']: JsQuery['inner.string'],
	['outer.string']: JsQuery['outer.string'],

	['outer.object']: JsQuery['outer.object'],
	['outer.variable']: '',
	['outer.rhs']: JsQuery['outer.rhs'],
};

//since the syntax is mostly the same, for now we can keep it the same

