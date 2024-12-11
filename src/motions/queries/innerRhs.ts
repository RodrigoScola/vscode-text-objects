function C(): Selector {
	return {
		language: 'c',
		query: [
			`( field_expression field:(field_identifier) @rhs ) `,
			` (init_declarator value:(initializer_list (_) @rhs))`,
		].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			// lambda_expression
			`(init_declarator value:(_ body:(_ (_)+ @rhs ))) `,
			`(init_declarator value:(_ value: (_(_)@rhs ))) `,
			`(init_declarator value:(_ arguments:(argument_list (lambda_expression body:(_ (_) @rhs ))))) `,
			`(init_declarator value:(_  arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (equals_value_clause (_ (_)@rhs)   )`, ` (assignment_expression right:(_ (_) @rhs)   )`].join(
			'\n'
		),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (expression_list (_ body:(_ (_) @rhs ))) `,
			` (expression_list (_ function:(_ body:(_ (_)+ @rhs )))) `,
			` (expression_list (_ arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (_ declarator:(_ value:(object_creation_expression (_ (_) @rhs )))) `,
			` (_ value:(array_initializer (_)@rhs)) `,
			` (_ declarator:(_ value:(_ arguments:(_ (_) @rhs)))) `,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			` (variable_declarator value:(object (_) @rhs))`,
			` (assignment_expression right:(_ (_)@rhs )) `,
			` (variable_declarator value:(_ body:(_ (_)+ @rhs ))) `,
			` (variable_declarator value:(_ arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}
function jsonc(): Selector {
	return {
		language: 'jsonc',
		query: ['(pair value : (_ (_) @rhs))'].join('\n'),
	};
}
function json(): Selector {
	return {
		language: 'json',
		query: ['(pair value : (_ (_) @rhs))'].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		// maybe do generic?
		// call doesnt work when just replacing things with just _
		query: [
			` (local_variable_declaration (expression_list value:(call arguments:(_ (_) @rhs )))) `,
			` (local_variable_declaration (expression_list value:(table (field_list (_) @rhs )))) `,
			` (local_variable_declaration (expression_list value:(function_definition body:(block (_)+ @rhs )))) `,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: [
			` (assignment right:(lambda body:(binary_operator (_) @rhs))) `,
			` (assignment right:(list (_) @rhs )) `,
			` (assignment right:(call arguments:(argument_list (lambda body:(_) @rhs )))) `,
			` (assignment right:(call arguments:(argument_list (_) @rhs ))) `,
			` (assignment right:(lambda body:(_) @rhs)) `,
			` (assignment right:(dictionary (_) @rhs )) `,
			` (assignment right:(list_comprehension (_) @rhs)) `,
		].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [
			//clojure
			` (let_declaration value:(closure_expression body:(_) @rhs)) `,
			` (static_item value:(closure_expression body:(_) @rhs)) `,
			` (const_item value:(closure_expression body:(_) @rhs)) `,

			//tuples
			` (let_declaration value:(tuple_expression (_) @rhs)) `,
			` (static_item value:(tuple_expression (_) @rhs)) `,
			` (const_item value:(tuple_expression (_) @rhs)) `,

			//arrays
			` (let_declaration value:(array_expression (_) @rhs)) `,
			` (static_item value:(array_expression (_) @rhs)) `,
			` (const_item value:(array_expression (_) @rhs)) `,

			//match
			` (let_declaration value:(match_expression body:(match_block (_) @rhs ))) `,
			` (static_item value:(match_expression body:(match_block (_) @rhs ))) `,
			` (const_item value:(match_expression body:(match_block (_) @rhs ))) `,

			//struct
			` (let_declaration value:(struct_expression body:( field_initializer_list (_) @rhs))) `,
			` (static_item value:(struct_expression body:( field_initializer_list (_) @rhs))) `,
			` (const_item value:(struct_expression body:( field_initializer_list (_) @rhs))) `,

			//variants?
			` (let_declaration value:(call_expression arguments:(arguments (_) @rhs ))) `,
			` (static_item value:(call_expression arguments:(arguments (_) @rhs ))) `,
			` (const_item value:(call_expression arguments:(arguments (_) @rhs ))) `,

			//macro
			` (let_declaration value:(macro_invocation (_ (_) @rhs ))) `,
			` (const_item value:(macro_invocation (_ (_) @rhs ))) `,
			` (static_item value:(macro_invocation (_ (_) @rhs ))) `,

			` (let_declaration value:(if_expression consequence:(block (_) @rhs ) alternative:(else_clause (_ (_) @rhs )))) `,
			` (static_item value:(if_expression consequence:(block (_) @rhs ) alternative:(else_clause (_ (_) @rhs )))) `,
			` (const_item value:(if_expression consequence:(block (_) @rhs ) alternative:(else_clause (_ (_) @rhs )))) `,
		].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) (_ (_) @rhs) )`].join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function yaml(): Selector {
	return {
		language: 'yaml',
		query: [
			`
 (block_mapping_pair
key:(flow_node
  (plain_scalar))
value:(block_node (_ (_) @rhs )))
			`,
		].join('\n'),
	};
}
function typescriptreact(): Selector {
	return {
		language: 'typescriptreact',
		query: javascript().query,
	};
}
function javascriptreact(): Selector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
	};
}

export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	json,
	jsonc,
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
