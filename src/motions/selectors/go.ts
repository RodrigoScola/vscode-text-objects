import { Selector } from '../commands';

export const GoQuery: Selector = {
	comments() {
		return ['(comment)+ @comment'].join('\n');
	},
	type() {
		return [
			`(parameter_list
               (parameter_declaration)
               ) @types`,
			`(type_declaration) @types`,
		].join('\n');
	},
	//todo: complete this
	innerType() {
		return [
			`(struct_type
               (field_declaration_list
               (_)+ @types
          )
               )`,
			`
      (interface_type (method_declaration ) @types  ) 
               `,
		].join('\n');
	},
	innerCall() {
		return '';
	},
	innerParameters() {
		return [
			`(parameter_list
               (parameter_declaration)+ @parameters
               ) `,
		].join('\n');
	},
	call() {
		return '';
	},
	parameters() {
		return [`(parameter_list) @parameters`].join('\n');
	},
	function() {
		return [
			`(function_declaration
               name :(identifier)? @function.name
               body: (_)? @function.body
               ) @function`,
			`
                (func_literal
                body: (_) @function.body
                ) @function
                `,
		].join('\n');
	},
	array() {
		return [
			`
     (composite_literal
     
     type: (array_type)
     ) @array`,

			`
               (var_declaration
               (var_spec
               type : (array_type)
          )
               ) @array `,
		].join('\n');
	},
	class() {
		return '';
	},
	conditional() {
		return [
			`(if_statement
               consequence: (block
               (_)
               )
          ) @conditional
               `,
		].join('\n');
	},
	innerClass() {
		return '';
	},
	innerConditional() {
		return [
			`(if_statement
               consequence: (block
               (_) @conditional
               )
          )`,
		].join('\n');
	},
	innerFunction() {
		return [
			`
                (func_literal
                block (_) @function.body
                ) 
                `,
		].join('\n');
	},
	innerLoop() {
		return [
			`
               (for_statement
               body: (block
               (_) @loop
          )
          )
               `,
		].join('\n');
	},
	//golang doesnt have inner string?
	innerString() {
		return [
			`(raw_string_literal) @string`,
			`(interpreted_string_literal) @string`,
		].join('\n');
	},
	loop() {
		return [`(for_statement) @loop`].join('\n');
	},
	object() {
		return [
			`(type_declaration
               (type_spec
               type: (struct_type)
          )
          ) @struct`,
			`(composite_literal
               body: (literal_value
               (keyed_element)
               )
               ) @struct`,
		].join('\n');
	},
	rhs() {
		return [
			`
                    (var_spec
                    value: (_) @variable
                    )
               `,
			`
               (short_var_declaration
               right: (_) @variable
          )
               `,
		].join('\n');
	},
	string() {
		return [
			`(raw_string_literal) @string`,
			`(interpreted_string_literal) @string`,
		].join('\n');
	},
	variables() {
		return [
			`
               (short_var_declaration) @variable
               `,
			`
               (var_declaration) @variable
               `,
		].join('\n');
	},
};

