import { QuerySelector } from '../../commands';

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
};
