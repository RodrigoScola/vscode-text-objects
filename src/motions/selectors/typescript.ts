import { JsQuery } from './javascript';

export const TsSelector = {
	['inner.type']: '',
	['outer.comment']: JsQuery['outer.comment'],
	['inner.comment']: JsQuery['inner.comment'],
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
	['inner.class']: JsQuery['inner.class'],
	['outer.object']: JsQuery['outer.object'],
	['outer.parameters']: JsQuery['outer.parameters'],
};
