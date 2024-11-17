function C(): QuerySelector {
	return {
		language: 'c',
		query: ['(call_expression) @call'].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [` (call_expression) @call `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [` (invocation_expression) @call`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [` (call_expression) @call`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [` (method_invocation ) @call  `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [`(call_expression   ) @call  `].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',

		query: ['(call arguments: (argument_list) @call)'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: ['(call) @call'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: [`(call_expression) @call`].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		query: [`(pair (bare_key) (_) @rhs)`].join('\n'),
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
