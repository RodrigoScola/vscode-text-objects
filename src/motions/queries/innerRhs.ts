function C(): QuerySelector {
	return {
		language: 'c',
		selector: [
			`( field_expression field:(field_identifier) @rhs ) `,
			` (init_declarator value:(initializer_list (_) @rhs))`,
		].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			// lambda_expression
			`(init_declarator value:(_ body:(_ (_)+ @rhs ))) `,
			`(init_declarator value:(_ value: (_(_)@rhs ))) `,
			`(init_declarator value:(_ arguments:(argument_list (lambda_expression body:(_ (_) @rhs ))))) `,
			`(init_declarator value:(_  arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [
			` (equals_value_clause (_ (_)@rhs)   )`,
			` (assignment_expression right:(_ (_) @rhs)   )`,
		].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [
			` (expression_list (_ body:(_ (_) @rhs ))) `,
			` (expression_list (_ function:(_ body:(_ (_)+ @rhs )))) `,
			` (expression_list (_ arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [
			` (_ declarator:(_ value:(object_creation_expression (_ (_) @rhs )))) `,
			` (_ value:(array_initializer (_)@rhs)) `,
			` (_ declarator:(_ value:(_ arguments:(_ (_) @rhs)))) `,
		].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [
			` (variable_declarator value:(object (_) @rhs))`,
			` (assignment_expression right:(_ (_)@rhs )) `,
			` (variable_declarator value:(_ body:(_ (_)+ @rhs ))) `,
			` (variable_declarator value:(_ arguments:(_ (_) @rhs))) `,
		].join('\n'),
	};
}

function json(): QuerySelector {
	return {
		language: 'json',
		selector: ['(pair value : (_ (_) @rhs))'].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		// maybe do generic?
		// call doesnt work when just replacing things with just _
		selector: [
			` (local_variable_declaration (expression_list value:(call arguments:(_ (_) @rhs )))) `,
			` (local_variable_declaration (expression_list value:(table (field_list (_) @rhs )))) `,
			` (local_variable_declaration (expression_list value:(function_definition body:(block (_)+ @rhs )))) `,
		].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		selector: [
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
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: [
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

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(pair (bare_key) (_ (_) @rhs) )`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		selector: javascript().selector,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [
			`
 (block_mapping_pair
key:(flow_node
  (plain_scalar))
value:(block_node (_ (_) @rhs )))
			`,
		].join('\n'),
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		selector: javascript().selector,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		selector: javascript().selector,
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
	toml,
	lua,
	python,
	rust,
	typescript,
	yaml,
	typescriptreact,
	javascriptreact,
};
