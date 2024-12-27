function C(): Selector {
	const query = [
		`(for_statement) @node`,
		`(while_statement) @node`,
		`(do_statement) @node`,
		`(type_definition type:(struct_specifier) @node ) @outer `,
		`(struct_specifier) @node `,
		`(enum_specifier   ) @node `,
		`(union_specifier ) @node `,
		`(function_definition) @node`,
		`(declaration declarator: (function_declarator)) @node`,
		`(switch_statement) @node`,
		`(conditional_expression  )@node`,
		`(if_statement) @node`,
		`(declaration declarator: (init_declarator)) @node`,
	];

	return {
		language: 'c',
		query: query.join('\n'),
	};
}

function cpp(): Selector {
	const query = [
		`(for_range_loop) @node `,
		`(for_statement) @node `,
		'(class_specifier) @node',
		`(function_definition) @node `,
		`(template_declaration (function_definition)) @node`,
		`(declaration (init_declarator value: (lambda_expression declarator: (abstract_function_declarator)) )) @node `,
		`(lambda_expression declarator: (abstract_function_declarator)) @node `,
		`(if_statement) @node`,
		`(switch_statement ) @node `,
		`(conditional_expression) @node`,
		`(declaration) @node `,
		`(field_declaration) @node `,
	];

	return {
		language: 'cpp',
		query: query.join('\n'),
	};
}
function csharp(): Selector {
	const query = [
		`(for_statement body: (block (_)+ @node)) `,
		`(for_each_statement (block (_)+ @node)) `,
		`(while_statement (block (_)+ @node)) `,
		`(do_statement (block (_)+ @node))`,
		`(class_declaration) @node`,
		`(local_function_statement) @node`,
		`(method_declaration) @node`,
		`(lambda_expression)  @node `,
		`(conditional_expression  ) @node`,
		`(if_statement) @node `,
		`(switch_statement) @node `,
		`(variable_declaration) @node`,
	];

	return {
		language: 'csharp',
		query: query.join('\n'),
	};
}
function go(): Selector {
	const query = [
		`(for_statement) @node`,
		'(type_declaration (type_spec type: (struct_type) )) @node ',
		`(go_statement (_ (_ (func_literal)))) @node `,
		`(var_declaration (_ (_ (func_literal)))) @node `,
		`(function_declaration) @node`,
		`(func_literal) @node `,
		`(method_declaration) @node`,
		`(if_statement  ) @node `,
		`(expression_switch_statement) @node`,
		`(short_var_declaration) @node `,
		`(var_declaration) @node `,
		`(const_declaration) @node `,
		`(const_spec) @node `,
	].join('\n');

	return {
		language: 'go',
		query: query,
	};
}
function java(): Selector {
	const query = [
		`(for_statement body:(block (_) @node)) `,
		`(enhanced_for_statement body:(block (_) @node)) `,
		`(while_statement body:(block (_) @node)) `,
		`(do_statement body:(block (_) @node)) `,
		'(class_declaration) @node',
		`(method_declaration) @node`,
		`(local_variable_declaration declarator:(variable_declarator value:(lambda_expression))) @node`,
		`(local_variable_declaration) @node `,
		`(expression_statement (assignment_expression)) @node`,
		`(if_statement) @node `,
		`(ternary_expression  ) @node`,
		`(ternary_expression ) @node`,
		`(switch_block_statement_group) @node `,
	].join('\n');

	return {
		language: 'java',
		query: query,
	};
}

function javascript(): Selector {
	const selector = [
		// selects functions
		`(method_definition) @node`,
		`(export_statement (_ (_ (function_expression) @function ))) @export `,
		`(_ (_ (function_expression) @function )) @declaration `,
		`(method_definition) @function`,
		`(arguments (function_expression)  @function ) @arguments `,
		`(arrow_function ) @function `,
		`(export_statement (function_declaration) @function ) @export `,
		`(function_declaration) @function `,
		`(_ (_    (arrow_function) @function  )) @export `,
		`(export_statement (_ (_ value: (arrow_function) @function )) ) @export `,
		//--

		`(_ arguments:(_ (arrow_function) @function )) `,
		`(for_statement) @node (for_in_statement) @node `,
		`( class_declaration ) @node`,
		`(export_statement declaration: ( class_declaration ) @node ) @export `,
		`(if_statement) @node `,
		`(switch_case) @node`,
		`(export_statement (lexical_declaration) @node ) @export   `,
		`(lexical_declaration   ) @node`,
		`(try_statement) @node `,
	].join('\n');

	return {
		language: 'javascript',
		query: selector,
	};
}

function python(): Selector {
	const query = [
		`(expression_statement) @node`,
		`(if_statement) @node  `,
		`(conditional_expression) @node `,
		`(function_definition) @node `,
		'(class_definition) @node ',
		`(for_statement) @node `,
		`(while_statement) @node`,
		`(list_comprehension) @node`,
	];

	return {
		language: 'python',
		query: query.join('\n'),
	};
}

function rust(): Selector {
	const query = [
		`(struct_item) @node`,
		`(impl_item) @node`,
		`(trait_item) @node`,
		`(enum_item) @node`,
		`(loop_expression) @node`,
		`(while_expression) @node`,
		`(for_expression) @node`,
		`(let_declaration pattern: (identifier) (_) ) @node`,
		`(function_item ) @node`,
		`(function_signature_item) @node`,
		`(if_expression) @node `,
		`(match_expression body: (match_block) @node) `,
		`(let_declaration value: (if_expression) @node) `,
		`(let_declaration) @node`,
		`(const_item) @node`,
		`(static_item) @node`,
	];

	return {
		language: 'rust',
		query: query.join('\n'),
	};
}

function toml(): Selector {
	const query = ['(pair)*  @node'];

	return {
		language: 'toml',
		query: query.join('\n'),
	};
}

function typescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
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

function lua(): Selector {
	const query = [
		`(field_list) @node`,

		`(while_statement) @node`,
		`(repeat_statement) @node`,
		`(for_numeric_statement) @node`,
		`(for_generic_statement) @node`,
		'(table) @node',
		`(variable_assignment) @node`,
		`(local_variable_declaration) @node`,
		` (function_definition_statement) @node `,
		` (local_function_definition_statement) @node `,
		` (local_variable_declaration
  (expression_list value:(function_definition))) @node `,
		`(variable_assignment
  (expression_list value:(function_definition))) @node `,
		`(field value:(function_definition)) @node`,
		'(if_statement) @node',
		'(call arguments: (argument_list) @node)',
	];

	return {
		language: 'lua',
		query: query.join('\n'),
	};
}
function yaml(): Selector {
	const query = [` (block_mapping_pair) @node`];

	return {
		language: 'yaml',
		query: query.join('\n'),
	};
}

export default {
	C,
	cpp,
	java,
	csharp,
	go,
	javascript,
	python,
	lua,
	rust,
	toml,
	javascriptreact,
	typescript,
	yaml,
	typescriptreact,
};
