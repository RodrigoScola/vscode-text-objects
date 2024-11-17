function C(): QuerySelector {
	return {
		language: 'c',
		query: ['(parameter_list (_) @parameters) '].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [` (parameter_list (_) @params ) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [` (parameter_list (_) @parameters) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [`(parameter_list (_) @parameters)`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [` (method_declaration parameters:(formal_parameters (_) @parameters) ) `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [`(formal_parameters (_) @parameter )`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: ['(parameter_list (_) @params) '].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: ['(parameters (_) @parameters )'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: ['(parameters) @parameters'].join('\n'),
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
