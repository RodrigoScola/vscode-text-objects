function C(): Selector {
	const query = [
		'(call_expression arguments: (argument_list (_) @node  )) ',
		`(for_statement body: (compound_statement (_)+ @node)) `,
		`(while_statement body: (compound_statement (_)+ @node)) `,
		`(do_statement body: (compound_statement (_)+ @node )) `,
		`(function_definition body: (compound_statement (_)+ @node )) `,
		`(case_statement value:(_) (expression_statement (_)+ @node) (break_statement)* @node ) `,
		`(conditional_expression consequence:(_)+ @node) `,
		`(conditional_expression alternative:(_)+ @node) `,
		`(if_statement consequence:(compound_statement (_)+ @node )) `,
		`(else_clause (compound_statement (_)+ @node))`,
		`(else_clause (expression_statement (_)+ @node))`,
		`(if_statement consequence:(expression_statement (_)+ @node)) `,
	];

	return {
		language: 'c',
		query: query.join('\n'),
	};
}

function cpp(): Selector {
	const query = [
		`(case_statement value:(_) (expression_statement (_) @node ) (break_statement) @node) `,
		`(conditional_expression consequence:(_)+ @node) `,
		`(conditional_expression alternative:(_)+ @node) `,
		`(if_statement consequence:(compound_statement (_)+ @node)) `,
		`(else_clause (compound_statement (_)+ @node ))`,
		`(if_statement consequence:(expression_statement (_)+ @node )) `,
		`(function_definition body: ( (compound_statement (_)+ @node))) `,
		`(lambda_expression declarator: (abstract_function_declarator) body: (compound_statement (_)+ @node)) `,
		`(for_range_loop body: (compound_statement (_)+ @node) ) `,
		`(for_statement body: (compound_statement (_)+ @node)) `,
		`(call_expression arguments: ( argument_list (_)+ @node)) `,
	];

	return {
		language: 'cpp',
		query: query.join('\n'),
	};
}

function csharp(): Selector {
	const query = [
		`(conditional_expression consequence:(_)+ @node) `,
		`(conditional_expression alternative:(_)+ @node ) `,
		`(if_statement consequence:(block (_)+ @node)) `,
		`(switch_statement body: (switch_body (_) @node)) `,
		`(if_statement alternative: (block (_)+ @node))`,
		`(if_statement consequence:(expression_statement (_)+ @node )) `,
		`(method_declaration body:(block (_)+ @node )) `,
		`(local_function_statement body:(block (_)+ @node )) `,
		`(lambda_expression body:(_)+ @node )`,
		`(for_statement body: (block (_)+ @node)) `,
		`(for_each_statement (block (_)+ @node)) `,
		`(while_statement (block (_)+ @node)) `,
		`(do_statement (block (_)+ @node))`,
		`(invocation_expression arguments:(argument_list (_) @node)) `,
	];

	return {
		language: 'csharp',
		query: query.join('\n'),
	};
}

function go(): Selector {
	const query = [
		`(call_expression arguments:(argument_list (_) @call )) `,
		`(for_statement body: (block (_) @loop)*) `,
		`(function_declaration body:(block (_) @function )) `,
		`(method_declaration body:(block (_) @function )) `,
		`(for_statement) @node`,
		'(type_declaration (type_spec type: (struct_type) )) @node ',
		`(go_statement (_ (_ (func_literal)))) @node `,
		`(var_declaration (_ (_ (func_literal)))) @node `,
		`(function_declaration) @node'`,
		`(func_literal) @node' `,
		`(method_declaration) @node'`,
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
		`(expression_statement (method_invocation arguments:(argument_list (_) @node))) `,
		`(for_statement body:(block (_) @node)) `,
		`(enhanced_for_statement body:(block (_) @node)) `,
		`(while_statement body:(block (_) @node)) `,
		`(do_statement body:(block (_) @node)) `,
		`(method_declaration body:(block (_)+ @node)) `,
		`(variable_declarator value:(lambda_expression body:(block (_)+ @node)))`,
		`(if_statement consequence:(block (_)+ @node)) `,
		`(if_statement consequence:(expression_statement (_)+ @node)) `,
		`(if_statement alternative:(expression_statement (_)+ @node)) `,
		`(if_statement alternative:(block (_)+ @node )) `,
		`(ternary_expression consequence:(_) @node) `,
		`(ternary_expression alternative:(_) @node) `,
		`(switch_block_statement_group (switch_label)* (_)+ @node (break_statement)? @node ) `,
	].join('\n');

	return {
		language: 'java',
		query: query,
	};
}

function javascript(): Selector {
	const selector = [
		`(call_expression arguments: (arguments (_) @node) )  `,
		`(for_statement body: (statement_block (_)* @node)) (for_in_statement body: (statement_block (_)* @node)) `,
		`((function_declaration body: (statement_block (_)* @node)))`,
		`(function_expression body: (statement_block (_)* @node)) `,
		`(arrow_function body: (statement_block (_)* @node)) `,
		`(method_definition body: (statement_block (_)* @node)) `,
		// selects functions
		`(method_definition) @node`,
		`(export_statement (_ (_ (function_expression) @node ))) @export `,
		`(_ (_ (function_expression) @node )) @declaration `,
		`(method_definition) @node`,
		`(arguments (function_expression)  @node ) @arguments `,
		`(arrow_function ) @node `,
		`(export_statement (function_declaration) @node ) @export `,
		`(function_declaration) @node `,
		`(_ (_    (arrow_function) @node  )) @export `,
		`(export_statement (_ (_ value: (arrow_function) @node )) ) @export `,
		//--

		`(_ arguments:(_ (arrow_function) @node)) `,
		`(for_statement) @node (for_in_statement) @node `,
		`( class_declaration ) @node`,
		`(export_statement declaration: ( class_declaration ) @node ) @export `,
		`(if_statement) @node `,
		`(switch_case) @node`,
		`(export_statement (lexical_declaration) @node ) @export   `,
		`(lexical_declaration   ) @node`,
		`(try_statement) @node `,
		,
	].join('\n');

	return {
		language: 'javascript',
		query: selector,
	};
}

function python(): Selector {
	const query = [
		'(call arguments: (argument_list (_) @node)  )',
		`(for_statement body: (block (_)+ @node)) `,
		'( right: (lambda) @node) ',
		`(if_statement consequence: (_) @node)  `,
		`(elif_clause consequence:(block (_)+ @node)) `,
		`(else_clause body:(block (_)+ @node)) `,
		`(conditional_expression (_)+ @node ) `,
		`(conditional_expression (_) (comparison_operator (_) ) (_)+ @node) `,
	];

	return {
		language: 'python',
		query: query.join('\n'),
	};
}

function rust(): Selector {
	//forgot inner function
	const query = [
		`(call_expression arguments: (arguments ) @node)`,
		`(for_expression body: (block (_)+ @node)) `,
		`(if_expression consequence: (block (_)+ @node )) `,
		`(match_expression body: (match_block (_)+ @node )) `,
		`(let_declaration value: (if_expression consequence: (block (_)+ @node))) `,
		`(else_clause (block (_)+ @node )) `,
	];

	return {
		language: 'rust',
		query: query.join('\n'),
	};
}

function toml(): Selector {
	const query = ['(pair) @node'];

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

function yaml(): Selector {
	const query = [` (alias (_) @node)  `, ` (block_mapping_pair) @node`];

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
	rust,
	toml,
	javascriptreact,
	typescript,
	typescriptreact,
	yaml,
};
