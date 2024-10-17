import { NODES } from '../../constants';
import { Selector } from '../commands';

export const Rust: Selector = {
	['outer.function']: [
		`(let_declaration
        pattern: (identifier) 
        (_) 
        ) @anonymous_function`,
		`(function_item name: (identifier) @${NODES.FUNCTION_NAME}) @function.declaration `,
		`(function_item ) @function.declaration`,
		`(function_signature_item) @function.declaration`,
	].join('\n'),
	['inner.function']: [
		//todo do the let function declaration
	].join('\n'),
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
