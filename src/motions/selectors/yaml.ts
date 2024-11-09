import { Selector } from '../commands';

//still need to do this one
// was giving a lot of errors like resolved is not a function
export const YAML: Selector = {
	['outer.function']: [].join('\n'),
	['inner.function']: '',
	['inner.call']: '',
	['outer.call']: '',
	['outer.parameters']: '',
	['inner.parameters']: '',
	['outer.array']: '(block_node (block_sequence (block_sequence_item)+ )) @array',
	['outer.class']: '',
	['inner.class']: '',
	['outer.conditional']: '',
	['inner.conditional']: '',
	['inner.loop']: '',
	['outer.loop']: '',
	['inner.string']: '',
	['outer.string']: [
		`(single_quote_scalar) @string`,
		`(double_quote_scalar) @string`,
		`(quote_scalar) @string`,
		`(block_scalar) @string`,
	].join('\n'),
	['outer.object']: '',
	['outer.variable']: '',
	['outer.rhs']: '',
	['inner.type']: '',
	['outer.comment']: '',
	['inner.comment']: '',
	['outer.type']: '',
	'inner.array': [].join('\n'),
	'inner.object': [].join('\n'),
	'outer.lhs': [].join('\n'),
	'inner.lhs': [].join('\n'),
	'inner.rhs': [].join('\n'),
};
