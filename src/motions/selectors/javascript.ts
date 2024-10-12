import { Selector } from '../commands';

export const JsQuery: Selector = {
	['inner.type']: '',
	['outer.comment']: '(comment)+ @comment',
	['outer.type']: '',
	['inner.parameters']: [`(formal_parameters (_) @parameter )`].join('\n'),
	['outer.parameters']: [`(formal_parameters)+ @parameter`].join('\n'),
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
            parameters: (formal_parameters 
              (identifier)) 
            body: (statement_block ) @function.body) @anonymous_function`,

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

	['inner.function']: [
		`
                         (
                              (function_declaration
                              body: (statement_block
                                   (_)* @function_body
                              )
                         )
                    )
                         `,
		`

                    (function_expression
                    body: (statement_block
                    (_)* @function.body
                    )

               )
                    `,
		`
                              (arrow_function
                              body: (statement_block
                         (_)* @function_body
                         )
                         )
                              `,
		`(method_definition
                              body: (statement_block
                         (_)* @function.body
                              )

                              )
                              `,
	].join('\n'),
	['outer.loop']: [
		` (for_statement) @loop
               (for_in_statement) @loop `,
	].join('\n'),

	['inner.loop']: [
		`     
     (for_statement
     body: (statement_block
     (_)* @loop_body))

     (for_in_statement
     body: (statement_block
     (_)* @loop_body))
     `,
	].join('\n'),
	['outer.conditional']: [
		` (
          (if_statement) @if.statement
     ) `,
	].join('\n'),
	['inner.conditional']: [
		` (if_statement
     consequence: (statement_block
     (_) @inner_statement))
     `,
	].join('\n'),
	'outer.rhs': [
		`(variable_declarator
     value: (_) @rhs)`,
		//todo: go to a class with the public and check if node is good name
		// `( public_field_definition
		// value: (_) @rhs
		// )`,
	].join('\n'),
	'outer.variable': [
		//todo: go to a class with the public and check if node is good name
		//`( public_field_definition) @lexical_declaration`,
		` (lexical_declaration

                    (variable_declarator 
                         name: (identifier  )
                         value: (_) 
                         ) @variable_declarator
                    ) @lexical_declaration `,
	].join('\n'),
	'outer.call': [`(call_expression ) @call `].join('\n'),
	'inner.call': [`(call_expression (_) @call )  `].join('\n'),
	'outer.class': [
		`
                    (export_statement
                    declaration: (
                    class_declaration 
                    name: (identifier) @class.name
                    body: (class_body) @class.body
                    ) @class
                    ) @export
                    `,
	].join('\n'),
	'inner.class': [
		`
                    (export_statement
                    declaration: (
                    class_declaration 
                    body: (class_body
               (_)* @class.body
                    ) 
                    )
                    )
                    `,
	].join('\n'),

	'outer.array': ['(array) @array'].join('\n'),
	'outer.object': ['(object) @object'].join('\n'),
	'inner.string': [
		`(string
                    (_)* @string
               ) `,

		`(template_string
                    (_)* @string
               ) `,
	].join('\n'),
	'outer.string': [`( string ) @string`, `( template_string ) @string`].join(
		'\n'
	),
};
