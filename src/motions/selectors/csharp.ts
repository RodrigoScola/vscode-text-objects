import { Selector } from '../commands';

export const Csharp: Selector = {
	['outer.function']: [].join('\n'),
	['inner.function']: '',
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.array']: '',
	['outer.class']: '',
	['inner.class']: '',
	['outer.conditional']: '',
	['inner.conditional']: '',
	['inner.loop']: '',
	['outer.loop']: '',
	['inner.string']: '',
	['outer.string']: '',
	['outer.object']: '',
	['outer.variable']: '',
	['outer.rhs']: '',
	['inner.type']: '',
	['outer.comment']: '',
	['outer.type']: '',
};