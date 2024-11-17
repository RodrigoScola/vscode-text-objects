function C(): Selector {
	return {
		language: 'c',
		query: ['(call_expression arguments: (argument_list (_) @call )) '].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [
			`
        (call_expression
        arguments: (
        argument_list (_)+ @call))
        `,
		].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (invocation_expression arguments:(argument_list (_) @call)) `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [` (call_expression arguments:(argument_list (_) @call )) `].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [` (expression_statement (method_invocation arguments:(argument_list (_) @call))) `].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: ['(call arguments: (argument_list (_)@call )) '].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: ['(call arguments: (argument_list (_) @call)  )'].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(call_expression arguments: (arguments ) @call)`].join('\n'),
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
	return {
		language: 'yaml',
		query: [` (alias (_) @call)  `].join('\n'),
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
	yaml,
	typescriptreact,
	javascriptreact,
};
