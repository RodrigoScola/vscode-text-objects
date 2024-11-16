import { QuerySelector } from '../commands';

function C(): QuerySelector {
	return {
		language: 'c',
		selector: ['(call_expression arguments: (argument_list (_) @call )) '].join('\n'),
	};
}

function cpp(): QuerySelector {
	return {
		language: 'cpp',
		selector: [
			`
        (call_expression
        arguments: (
        argument_list (_)+ @call))
        `,
		].join('\n'),
	};
}
function csharp(): QuerySelector {
	return {
		language: 'csharp',
		selector: [` (invocation_expression arguments:(argument_list (_) @call)) `].join('\n'),
	};
}
function go(): QuerySelector {
	return {
		language: 'go',
		selector: [` (call_expression arguments:(argument_list (_) @call )) `].join('\n'),
	};
}
function java(): QuerySelector {
	return {
		language: 'java',
		selector: [` (expression_statement (method_invocation arguments:(argument_list (_) @call))) `].join(
			'\n'
		),
	};
}
function javascript(): QuerySelector {
	return {
		language: 'javascript',
		selector: [`(call_expression arguments: (arguments (_) @call) )  `].join('\n'),
	};
}

function lua(): QuerySelector {
	return {
		language: 'lua',
		selector: ['(call arguments: (argument_list (_)@call )) '].join('\n'),
	};
}

function python(): QuerySelector {
	return {
		language: 'python',
		//todo: this cannot be the only way to define a function
		selector: ['(call arguments: (argument_list (_) @call)  )'].join('\n'),
	};
}
function rust(): QuerySelector {
	return {
		language: 'rust',
		//todo: come on mannnn
		selector: [`(call_expression arguments: (arguments ) @call)`].join('\n'),
	};
}

function typescript(): QuerySelector {
	return {
		language: 'typescript',
		//todo revise the selectors
		selector: javascript().selector,
	};
}
function yaml(): QuerySelector {
	return {
		language: 'yaml',
		selector: [` (alias (_) @call)  `].join('\n'),
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
	yaml,
};
