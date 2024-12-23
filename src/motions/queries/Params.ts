function C(): Selector {
	return {
		language: 'c',
		query: ['(parameter_list (_) @params )  '].join('\n'),
	};
}

function cpp(): Selector {
	return {
		language: 'cpp',
		query: [` (parameter_list (_) @params) `].join('\n'),
	};
}
function csharp(): Selector {
	return {
		language: 'csharp',
		query: [`(parameter_list (_) @params )  `].join('\n'),
	};
}
function go(): Selector {
	return {
		language: 'go',
		query: [`(parameter_list  (_) @params ) `].join('\n'),
	};
}
function java(): Selector {
	return {
		language: 'java',
		query: [` (formal_parameters (_) @params )  `].join('\n'),
	};
}
function javascript(): Selector {
	return {
		language: 'javascript',
		query: [`(formal_parameters (_) @params ) `].join('\n'),
	};
}

function lua(): Selector {
	return {
		language: 'lua',
		query: ['(parameter_list (_) @params ) '].join('\n'),
	};
}

function python(): Selector {
	return {
		language: 'python',
		query: ['(parameters (_) @params ) '].join('\n'),
	};
}
function rust(): Selector {
	return {
		language: 'rust',
		query: ['(parameters (_) @params ) '].join('\n'),
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
export const select: Record<string, () => Selector> = {
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

function selectC(): Selector {
	return {
		language: 'c',
		query: ['(parameter_list   )@params  '].join('\n'),
	};
}

function selectCpp(): Selector {
	return {
		language: 'cpp',
		query: [` (parameter_list) @params `].join('\n'),
	};
}
function selectCsharp(): Selector {
	return {
		language: 'csharp',
		query: [`(parameter_list) @parameters `].join('\n'),
	};
}
function selectGo(): Selector {
	return {
		language: 'go',
		query: [`(parameter_list   )@parameters `].join('\n'),
	};
}
function selectJava(): Selector {
	return {
		language: 'java',
		query: [` (formal_parameters) @parameters `].join('\n'),
	};
}
function selectJavascript(): Selector {
	return {
		language: 'javascript',
		query: [`(formal_parameters) @parameter`].join('\n'),
	};
}

function selectLua(): Selector {
	return {
		language: 'lua',
		query: ['(parameter_list) @params'].join('\n'),
	};
}

function selectPython(): Selector {
	return {
		language: 'python',
		query: ['(parameters) @parameters'].join('\n'),
	};
}
function selectRust(): Selector {
	return {
		language: 'rust',
		query: ['(parameters) @parameters'].join('\n'),
	};
}

function selectTypescript(): Selector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function selectTypescriptReact(): Selector {
	return {
		language: 'typescriptreact',
		query: javascript().query,
	};
}
function selectjavascriptReact(): Selector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
	};
}

export const goTo: Record<string, () => Selector> = {
	C: selectC,
	cpp: selectCpp,
	csharp: selectCsharp,
	go: selectGo,
	java: selectJava,
	javascript: selectJavascript,
	lua: selectLua,
	python: selectPython,
	rust: selectRust,
	typescript: selectTypescript,
	typescriptreact: selectTypescriptReact,
	javascriptreact: selectjavascriptReact,
};
