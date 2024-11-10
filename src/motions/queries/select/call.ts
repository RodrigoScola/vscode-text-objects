import { QuerySelector } from '../../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: ['(call_expression) @call'].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [` (call_expression) @call `].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (invocation_expression) @call`].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [` (call_expression) @call`].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [` (expression_statement (method_invocation arguments:(argument_list ) @call)) `].join('\n'),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`(call_expression   ) @call  `].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',

		selector: ['(call arguments: (argument_list) @call)'].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: ['(call) @call'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [`(call_expression) @call`].join('\n'),
	};
}

function toml(): QuerySelector {
	return {
		language: 'toml',
		selector: [`(pair (bare_key) (_) @rhs)`].join('\n'),
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
	toml,
	lua,
	python,
	rust,
	typescript,
};
