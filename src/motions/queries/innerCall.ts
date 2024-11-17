function C(): QuerySelector {
	return {
		language: 'c',
		query: ['(call_expression arguments: (argument_list (_) @call )) '].join('\n'),
	};
}

function cpp(): QuerySelector {
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
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [` (invocation_expression arguments:(argument_list (_) @call)) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [` (call_expression arguments:(argument_list (_) @call )) `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [` (expression_statement (method_invocation arguments:(argument_list (_) @call))) `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: ['(call arguments: (argument_list (_)@call )) '].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: ['(call arguments: (argument_list (_) @call)  )'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(call_expression arguments: (arguments ) @call)`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		query: javascript().query,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
	};
}
function yaml(): QuerySelector {
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
