import { Selector } from '../commands';

export const GoQuery: Selector = {
	'outer.comment': ['(comment)+ @comment'].join('\n'),
	'outer.type': [
		`(parameter_list
               (parameter_declaration)
               ) @types`,
		`(type_declaration) @types`,
	].join('\n'),
	'inner.type':
		//todo: complete this
		[
			`(struct_type
               (field_declaration_list
               (_)+ @types
          )
               )`,
			`
      (interface_type (method_declaration ) @types  ) 
               `,
		].join('\n'),
	'inner.call': '',
	'inner.parameters': '',
	'outer.call': '',
	'outer.parameters': [`(parameter_list) @parameters`].join('\n'),
	'outer.function': [
		`(function_declaration
               name :(identifier)? @function.name
               body: (_)? @function.body
               ) @function`,
		`
                (func_literal
                body: (_) @function.body
                ) @function
                `,
	].join('\n'),

	'outer.array': [
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
	].join('\n'),
	['outer.class']: '',
	'outer.conditional': [
		`(if_statement
               consequence: (block
               (_)
               )
          ) @conditional
               `,
	].join('\n'),
	'inner.class': '',
	'inner.conditional': [
		`(if_statement
               consequence: (block
               (_) @conditional
               )
          )`,
	].join('\n'),
	'inner.function': [
		`
                (func_literal
                block (_) @function.body
                ) 
                `,
	].join('\n'),
	'inner.loop': [
		`
               (for_statement
               body: (block
               (_) @loop
          )
          )
               `,
	].join('\n'),
	'inner.string':
		//golang doesnt have inner string?
		[
			`(raw_string_literal) @string`,
			`(interpreted_string_literal) @string`,
		].join('\n'),
	'outer.loop': '',
	'outer.object': [
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
	].join('\n'),
	'outer.rhs': '',
	'outer.string': [
		`(raw_string_literal) @string`,
		`(interpreted_string_literal) @string`,
	].join('\n'),
	'outer.variable': [
		`
               (short_var_declaration) @variable
               `,
		`
               (var_declaration) @variable
               `,
	].join('\n'),
};
