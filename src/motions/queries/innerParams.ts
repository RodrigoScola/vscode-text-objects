import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: ['(parameter_list (_) @parameters) '].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (parameter_list (_) @params ) `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (parameter_list (_) @parameters) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [`(parameter_list (_) @parameters)`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [` (method_declaration parameters:(formal_parameters (_) @parameters) ) `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`(formal_parameters (_)* @parameter )`].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: ['(parameter_list (_) @params) '].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: ['(parameters (_) @parameters )'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		selector: ['(parameters) @parameters'].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
function typescriptreact(): QuerySelector {
	return {
		language: 'typescriptreact',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
function javascriptreact(): QuerySelector {
	return {
		language: 'javascriptreact',
		//todo revise the selectors
		selector: javascript().selector,
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
