import { Selector } from '../commands';
import { JsQuery } from './javascript';

export const TsSelector: Selector = {
	['inner.type']: '',
	['outer.comment']: JsQuery['outer.comment'],
	['outer.type']: [
		`
               (export_statement
               (type_alias_declaration)
               ) @type   
               `,

		`
               (type_alias_declaration) @type   
               `,

		`
               (export_statement
               (interface_declaration)
               ) @type
               `,

		`
               (interface_declaration) @type
               `,

		`(type_annotation (_) @type)`,
	].join('\n'),
	['inner.function']: JsQuery['inner.function'],
	['inner.call']: JsQuery['inner.call'],
	['outer.call']: JsQuery['outer.call'],
	['inner.parameters']: JsQuery['inner.parameters'],
	['outer.function']: [
		`(method_definition 
            name: (_) @function.name
            body: (_) @function.body
            ) @function`,
		`(function_expression
  (identifier)? @function_name
  (#not-eq? @function_name "identifier")) @anonymous_function`,
		`
               (arrow_function 
            parameters: (formal_parameters ) 
            body: (statement_block ) @function.body) @anonymous_function`,

		// 	`
		//      (arrow_function
		//   parameters: (formal_parameters
		//     (identifier))
		//   body: (statement_block ) @function.body) @anonymous_function`,

		`(export_statement
                    (function_declaration
                    name: (identifier) @function.name
                    body: (statement_block) @function.body
                    ) @exportedFunction
               ) @export`,
		`
			   (function_declaration
			     name: (identifier) @function.name
			     body: (statement_block) @function.body
			   ) @function
			                `,
		`
			   (lexical_declaration
			               (variable_declarator
			               name : (identifier) @function.name
			   value: (arrow_function) @function.body
			     )
			   ) @function
			                `,
		`
			     (export_statement
			     (lexical_declaration
			     (variable_declarator
			     name: (identifier) @function.name
			     value: (arrow_function) @function.body
			)
			)
			) @function
			      `,
		`
               (arrow_function
  (identifier)? @function_name
  (#not-eq? @function_name "identifier")) @anonymous_function
                `,
	].join('\n'),
	['outer.array']: JsQuery['outer.array'],
	['outer.class']: JsQuery['outer.class'],
	['inner.class']: JsQuery['inner.class'],
	['outer.conditional']: JsQuery['outer.conditional'],
	['inner.conditional']: JsQuery['inner.conditional'],
	['inner.loop']: JsQuery['inner.loop'],
	['outer.loop']: JsQuery['outer.loop'],
	['inner.string']: JsQuery['inner.string'],
	['outer.string']: JsQuery['outer.string'],
	['outer.object']: JsQuery['outer.object'],
	['outer.parameters']: JsQuery['outer.parameters'],
	['outer.rhs']: JsQuery['outer.rhs'].concat(
		`
               (type_alias_declaration
               value: (_) @type   ) 
               `
	),
	['outer.variable']: JsQuery['outer.variable'].concat(`(type_alias_declaration) @type`),
};
