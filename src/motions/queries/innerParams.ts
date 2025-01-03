function C(): Selector {
	return {
		language: 'c',
		query: ['(parameter_list (_) @parameters) '].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (parameter_list (_) @params ) `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [` (parameter_list (_) @parameters) `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [`(parameter_list (_) @parameters)`].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [` (method_declaration parameters:(formal_parameters (_) @parameters) ) `].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [`(formal_parameters (_) @parameter )`].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: ['(parameter_list (_) @params) '].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: ['(parameters (_) @parameters )'].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: ['(parameters) @parameters'].join('\n'),
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
