function C(): Selector {
	return {
		language: 'c',
		query: ['(call_expression) @call'].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (call_expression) @call `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (invocation_expression) @call`].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [` (call_expression) @call`].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [` (method_invocation ) @call  `].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [`(call_expression   ) @call  `].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',

		query: ['(call arguments: (argument_list) @call)'].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: ['(call) @call'].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: [`(call_expression) @call`].join('\n'),
	};
}

function toml(): Selector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) (_) @rhs)`].join('\n'),
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
		query: [` (alias) @call `].join('\n'),
	};
}

export default {
	C,
	cpp,
	csharp,
	yaml,
	go,
	java,
	javascript,
	toml,
	lua,
	python,
	rust,
	typescript,
	typescriptreact,
	javascriptreact,
};
