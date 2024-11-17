function C(): QuerySelector {
	return {
		language: 'c',
		query: ['(parameter_list (_) @params )  '].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [` (parameter_list (_) @params) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [`(parameter_list (_) @params )  `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		query: [`(parameter_list  (_) @params ) `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		query: [` (formal_parameters (_) @params )  `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [`(formal_parameters (_) @params ) `].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		query: ['(parameter_list (_) @params ) '].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		query: ['(parameters (_) @params ) '].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		query: ['(parameters (_) @params ) '].join('\n'),
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
		language: 'typescript',
		query: javascript().query,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
	};
}
export const select: Record<string, () => QuerySelector> = {
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

function selectC(): QuerySelector {
	return {
		language: 'c',
		query: ['(parameter_list   )@params  '].join('\n'),
	};
}

function selectCpp(): QuerySelector {
	return {
		language: 'cpp',
		query: [` (parameter_list) @params `].join('\n'),
	};
}
function selectCsharp(): QuerySelector {
	return {
		language: 'csharp',
		query: [`(parameter_list) @parameters `].join('\n'),
	};
}
function selectGo(): QuerySelector {
	return {
		language: 'go',
		query: [`(parameter_list   )@parameters `].join('\n'),
	};
}
function selectJava(): QuerySelector {
	return {
		language: 'java',
		query: [` (formal_parameters) @parameters `].join('\n'),
	};
}
function selectJavascript(): QuerySelector {
	return {
		language: 'javascript',
		query: [`(formal_parameters) @parameter`].join('\n'),
	};
}

function selectLua(): QuerySelector {
	return {
		language: 'lua',
		query: ['(parameter_list) @params'].join('\n'),
	};
}

function selectPython(): QuerySelector {
	return {
		language: 'python',
		query: ['(parameters) @parameters'].join('\n'),
	};
}
function selectRust(): QuerySelector {
	return {
		language: 'rust',
		query: ['(parameters) @parameters'].join('\n'),
	};
}

function selectTypescript(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function selectTypescriptReact(): QuerySelector {
	return {
		language: 'typescript',
		query: javascript().query,
	};
}
function selectjavascriptReact(): QuerySelector {
	return {
		language: 'javascriptreact',
		query: javascript().query,
	};
}

export const goTo: Record<string, () => QuerySelector> = {
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
