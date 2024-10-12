import { Selector } from '../commands';
import { JsQuery } from './javascript';

export const TsSelector: Selector = {
	innerType() {
		return '';
	},
	comments() {
		return JsQuery.comments();
	},
	type() {
		return [
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
		].join('\n');
	},
	innerCall() {
		return JsQuery.innerCall();
	},
	innerParameters() {
		return JsQuery.innerParameters();
	},
	call() {
		return JsQuery.call();
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
		].join('\n');
	},
	array() {
		return JsQuery.array();
	},
	class() {
		return JsQuery.class();
	},
	innerClass() {
		return JsQuery.innerClass();
	},
	conditional() {
		return JsQuery.conditional();
	},
	innerConditional() {
		return JsQuery.innerConditional();
	},
	innerFunction() {
		return JsQuery.innerFunction();
	},
	innerLoop() {
		return JsQuery.innerLoop();
	},
	innerString() {
		return JsQuery.innerString();
	},
	loop() {
		return JsQuery.loop();
	},
	object() {
		return JsQuery.object();
	},
	parameters() {
		return JsQuery.parameters();
	},
	rhs() {
		return JsQuery.rhs();
	},
	string() {
		return JsQuery.string();
	},
	variables() {
		return JsQuery.variables();
	},
};
