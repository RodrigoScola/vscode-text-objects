function C(): Selector {
	return {
		language: 'c',
		query: [`(function_definition body: (compound_statement (_)+ @function)) `].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			` (function_definition body: (
		(compound_statement (_)+ @function))) `,
			`
        (lambda_expression
        declarator: (abstract_function_declarator)
        body: (compound_statement (_)+ @function)) 
        `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [
			` (method_declaration body:(block (_)+ @function )) `,
			` (local_function_statement body:(block (_)+ @function )) `,
			` (lambda_expression body:(_)+ @function )`,
		].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [
			` (function_declaration body:(block (_) @function )) `,
			` (method_declaration body:(block (_) @function )) `,
		].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [
			` (method_declaration body:(block (_)+ @function)) `,
			` (variable_declarator value:(lambda_expression body:(block (_)+ @function)))`,
		].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [
			` ((function_declaration
            body: (statement_block
            (_)* @function_body)))`,
			` (function_expression body: (statement_block (_)* @function.body)) `,
			` (arrow_function body: (statement_block (_)* @function_body)) `,
			`(method_definition body: (statement_block (_)* @function.body)) `,
		].join('\n'),
	};
}
function lua(): Selector {
	return {
		language: 'lua',
		query: [
			` (function_definition_statement body: (block (_)+ @function )) `,
			` (local_function_definition_statement body: (block (_)+ @function ))  `,
			` (local_variable_declaration
		  (expression_list value:(function_definition body: (block (_)+ @function )))) `,
			`(variable_assignment
		  (expression_list value:(function_definition body: (block (_)+ @function ))))  `,
			`(field value:(function_definition body: (block (_)+ @function))) `,
		].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: ['( right: (lambda) @function) '].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [].join('\n'),
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
export default {
	C,
	cpp,
	csharp,
	go,
	java,
	javascript,
	lua,
	python,
	rust,
	typescript,
	typescriptreact,
	javascriptreact,
};
