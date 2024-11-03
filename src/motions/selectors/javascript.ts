import { Selector } from '../commands';

export const JsQuery: Selector = {
	['inner.type']: '',
	['outer.comment']: '(comment)+ @comment',
	['outer.type']: '',
	['inner.parameters']: [`(formal_parameters (_) @parameter )`].join('\n'),
	['outer.parameters']: [`(formal_parameters (_) @parameter )`].join('\n'),
	['outer.function']: [
		`(method_definition
		            name: (_) @function.name
		            body: (_) @function.body) @function`,

		`(export_statement
		                    (function_declaration
		                    name: (identifier) @function.name
		                    body: (statement_block) @function.body
		                    )) @function`,

		`
					   (function_declaration
					     name: (identifier) @function.name
					     body: (statement_block) @function.body) @function
					                `,
		`(function_expression
				  (identifier)? @function_name
				  (#not-eq? @function_name "identifier")) @anonymous_function`,

		`
				               (arrow_function
				            parameters: (formal_parameters
				              (identifier))
				            body: (statement_block ) @function.body) @anonymous_function`,

		`
							   (lexical_declaration
							               (variable_declarator
							               name : (identifier) @function.name
							   value: (arrow_function) @function.body)) @function
							                `,
		`
		        (export_statement
		        (lexical_declaration
		        (variable_declarator
		        (function_expression
				  name: (identifier)? @function_name)))) @function
					      `,
		`
					     (export_statement
					     (lexical_declaration
					     (variable_declarator
					     name: (identifier) @function.name
					     value: (arrow_function) @function.body))) @function
					      `,
		`
		               (arrow_function
		  (identifier)? @function_name
		  (#not-eq? @function_name "identifier")) @anonymous_function
		                `,
	].join('\n'),

	['inner.function']: [
		` ((function_declaration
            body: (statement_block
            (_)* @function_body)))`,
		` (function_expression
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

	'outer.lhs': [].join('\n'),
	'inner.lhs': [].join('\n'),
	'inner.rhs': [].join('\n'),

	'outer.rhs': [
		`(variable_declarator
     value: (_) @rhs)`,
		`(
     assignment_expression
     (_) @rhs
     )
     `,
		//todo: go to a class with the public and check if node is good name
		// `( public_field_definition
		// value: (_) @rhs
		// )`,
	].join('\n'),
	'outer.variable': [
		//todo: go to a class with the public and check if node is good name
		//`( public_field_definition) @lexical_declaration`,

		` (export_statement
         (lexical_declaration
                    (variable_declarator 
                         name: (identifier  )
                         value: (_) 
                         ) @variable_declarator
    )) @lexical_declaration `,
		` (lexical_declaration
                    (variable_declarator 
                         name: (identifier  )
                         value: (_) 
                         ) @variable_declarator
                    ) @lexical_declaration `,
	].join('\n'),
	'outer.call': [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),
	'inner.call': [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),
	'outer.class': [
		` ( class_declaration ) @class
                    `,
		`
                    (export_statement
                    declaration: (
                    class_declaration 
                    name: (type_identifier) @class.name
                    body: (class_body) @class.body
                    ) ) @export
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
	'inner.array': ['(array (_) @array) '].join('\n'),
	'outer.object': ['(object) @object'].join('\n'),
	'inner.object': ['(object (_) @object ) '].join('\n'),
	'inner.string': [
		`(string
	                (_)* @string
	           ) `,

		`(template_string
	                (_)* @string
	           ) `,
	].join('\n'),
	'outer.string': [`( string ) @string`, `( template_string ) @string`].join('\n'),
};
