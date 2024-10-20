import { Selector } from '../commands';

export const C: Selector = {
	['outer.function']: [
		`(function_definition) @function`,
		`(declaration declarator: (function_declarator)) @function`,
	].join('\n'),
	['inner.function']: [`(function_definition body: (compound_statement (_)+ @function)) `].join(
		'\n'
	),
	['outer.call']: '(call_expression) @call',
	['inner.call']: '(call_expression arguments: (argument_list (_)+ @call )) ',

	//(compound_statement (_)+ @function))) `,
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
