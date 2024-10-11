import { Selector } from '../commands';

export const JsQuery: Selector = {
	comments() {
		return '(comment)+ @comment';
	},

	//this is one kind of comment
	/** this is another kind of comment */
	type() {
		return '';
	},
	innerParameters() {
		return [`(formal_parameters (_) @parameter )`].join('\n');
	},
	parameters() {
		return [`(formal_parameters)+ @parameter`].join('\n');
	},
	function() {
		return [
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
		].join('\n');
	},

	innerFunction() {
		return [
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
		].join('\n');
	},

	loop() {
		return [
			` (for_statement) @loop
               (for_in_statement) @loop `,
		].join('\n');
	},

	innerLoop() {
		return [
			`     
     (for_statement
     body: (statement_block
     (_)* @loop_body))

     (for_in_statement
     body: (statement_block
     (_)* @loop_body))
     `,
		].join('\n');
	},

	conditional() {
		return [
			` (
          (if_statement) @if.statement
     ) `,
		].join('\n');
	},

	innerConditional() {
		return [
			` (if_statement
     consequence: (statement_block
     (_) @inner_statement))
     `,
		].join('\n');
	},

	rhs() {
		return [
			`(variable_declarator
     value: (_) @rhs)`,
			`( public_field_definition
               value: (_) @rhs
               )`,
		].join('\n');
	},

	variables() {
		return [
			`( public_field_definition) @lexical_declaration`,
			` (lexical_declaration

                    (variable_declarator 
                         name: (identifier  )
                         value: (_) 
                         ) @variable_declarator
                    ) @lexical_declaration `,
		].join('\n');
	},
	call() {
		return [`(call_expression ) @call `].join('\n');
	},
	innerCall() {
		return [`(call_expression (_) @call )  `].join('\n');
	},

	class() {
		return [
			`
                    (export_statement
                    declaration: (
                    class_declaration 
                    name: (identifier) @class.name
                    body: (class_body) @class.body
                    ) @class
                    ) @export
                    `,
		].join('\n');
	},

	innerClass() {
		return [
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
		].join('\n');
	},

	array() {
		return ['(array) @array'].join('\n');
	},

	object() {
		return ['(object) @object'].join('\n');
	},

	innerString() {
		return [
			`(string
                    (_)* @string
               ) `,

			`(template_string
                    (_)* @string
               ) `,
		].join('\n');
	},

	string() {
		return [`( string ) @string`, `( template_string ) @string`].join(
			'\n'
		);
	},
};
