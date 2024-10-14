import { Selector } from '../commands';

export const CppQuery: Selector = {
	['outer.function']: [
		`(function_definition) @function`,
		// 	`(declaration
		//     declarator: (abstract_function_declarator)
		// ) @function`,
		// 	`(declaration
		//     declarator: (function_declarator)
		// ) @function`,
		` (declaration
		    declarator: (function_definition)
		) @function `,
		` (function_definition) @function`,
		` (template_declaration (function_definition)) @function`,
	].join('\n'),
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

