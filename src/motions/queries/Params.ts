import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: ['(parameter_list (_) @params )  '].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (parameter_list (_) @params) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [`(parameter_list (_) @params )  `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [`(parameter_list  (_) @params ) `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [` (formal_parameters (_) @params )  `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`(formal_parameters (_) @params ) `].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: ['(parameter_list (_) @params ) '].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		selector: ['(parameters (_) @params ) '].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: ['(parameters (_) @params ) '].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
	};
}

export const select = {
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
};

function selectC(): QuerySelector {
	return {
		language: 'c',
		selector: ['(parameter_list   )@params  '].join('\n'),
	};
}

function selectCpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (parameter_list) @params `].join('\n'),
	};
}
function selectCsharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [`(parameter_list) @parameters `].join('\n'),
	};
}
function selectGo(): QuerySelector {
	return {
		language: 'go',
		selector: [`(parameter_list   )@parameters `].join('\n'),
	};
}
function selectJava(): QuerySelector {
	return {
		language: 'java',
		selector: [` (formal_parameters) @parameters `].join('\n'),
	};
}
function selectJavascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`(formal_parameters) @parameter`].join('\n'),
	};
}

function selectLua(): QuerySelector {
	return {
		language: 'lua',
		selector: ['(parameter_list) @params'].join('\n'),
	};
}

function selectPython(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: ['(parameters) @parameters'].join('\n'),
	};
}
function selectRust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: ['(parameters) @parameters'].join('\n'),
	};
}

function selectTypescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
	};
}

export const goTo = {
	C: selectC,
	cpp: selectCpp,
	csharp: selectCsharp,
	go: selectGo,
	java: selectJava,
	javascript: selectJavascript,
	lua: selectLua,
	python: selectPython,
	rust: selectRust,
	typescript,
};